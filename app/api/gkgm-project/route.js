import { handleProjectRequest, projectDeliveryConfig } from "@/lib/gkgm-project-server";

export async function POST(request) {
  return handleProjectRequest(request, projectDeliveryConfig(process.env));
}
