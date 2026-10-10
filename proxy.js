import { NextResponse } from "next/server";
import { getLocale } from "./lib/locale";

export function proxy(request) {
  const requestHeaders = new Headers(request.headers);
  // Overwrite any client-supplied value: the URL is the language authority.
  requestHeaders.set("x-gk-locale", getLocale({
    lang: request.nextUrl.searchParams.getAll("lang").length === 1
      ? request.nextUrl.searchParams.get("lang") : undefined,
  }));
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Keep static assets (including the Netlify Forms endpoint) outside Proxy.
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\.).*)"],
};
