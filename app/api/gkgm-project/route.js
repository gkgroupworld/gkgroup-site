// Legacy application ingress stays closed; native Forms is pending migration.
export async function POST() {
  return Response.json({ ok: false, code: "collector_not_configured" }, { status: 503, headers: { "Cache-Control": "no-store" } });
}
