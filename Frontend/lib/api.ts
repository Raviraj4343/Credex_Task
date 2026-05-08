import { AuditFormValues, AuditReport, LeadCaptureValues } from "@/types/audit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

type ApiResponse<T> = {
  data: T;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed");
  }

  return (payload as ApiResponse<T>).data;
}

export const api = {
  createAudit: (values: AuditFormValues) =>
    request<AuditReport>("/audit", {
      method: "POST",
      body: JSON.stringify({
        teamSize: values.teamSize,
        teamName: values.teamName,
        tools: values.tools.map((tool) => ({
          ...tool,
          teamSize: values.teamSize
        }))
      })
    }),
  createLead: (values: LeadCaptureValues) =>
    request("/lead", {
      method: "POST",
      body: JSON.stringify(values)
    }),
  getPublicAudit: (slug: string) => request<AuditReport>(`/audit/public/${slug}`)
};
