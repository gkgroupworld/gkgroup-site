"use client";

import { useEffect, useRef } from "react";

export function GkgmChallenge({ sitekey, onToken, onFailure, locale }) {
  const container = useRef(null);
  useEffect(() => {
    let widget; let stopped = false;
    const render = () => {
      if (stopped || !window.turnstile || !container.current) return;
      try { widget = window.turnstile.render(container.current, {
        sitekey, action: "gkgm_project", language: locale, size: "flexible",
        callback: token => { onToken(token); onFailure(false); },
        "expired-callback": () => onToken(""),
        "timeout-callback": () => { onToken(""); onFailure(true); },
        "error-callback": () => { onToken(""); onFailure(true); },
      }); } catch { onToken(""); onFailure(true); }
    };
    let script = document.getElementById("gkgm-turnstile-script");
    if (script?.dataset.failed === "true") { script.remove(); script = null; }
    if (!script) {
      script = document.createElement("script");
      script.id = "gkgm-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      document.head.appendChild(script);
    }
    const failed = () => { script.dataset.failed = "true"; if (!stopped) { onToken(""); onFailure(true); } };
    if (window.turnstile) render();
    else script.addEventListener("load", render);
    script.addEventListener("error", failed);
    return () => {
      stopped = true;
      script.removeEventListener("load", render);
      script.removeEventListener("error", failed);
      if (widget !== undefined && window.turnstile) window.turnstile.remove(widget);
    };
  }, [sitekey, locale, onToken, onFailure]);
  return <div ref={container} className="mt-6 min-h-20 max-w-full" aria-label={locale === "fr" ? "Vérification antispam" : "Spam protection check"} />;
}
