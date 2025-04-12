type DashboardType = "OPERATIONAL" | "CORPORATE" | "FINANCIAL" | "GENERAL" 
type CategoryType = "MOSQUES" | "ORPHANS" 
interface AuthVariables  {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null
}

export type StatusResponse<T> = {
    status: "success" | "error" | "warning";
    message?: string;
    data?: T | T[];
  };