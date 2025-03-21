export type DashboardTitle = {
  title: string,
  subtitle?: string,
}

export const titles: Record<string, DashboardTitle> = {
  "/dashboard": {
    title: "Dashboard",
  },
  "/dashboard/search": {
    title: "Search",
  },
  "/dashboard/settings": {
    title: "Settings",
  },
  "/dashboard/about": {
    title: "About",
  },
  "/dashboard/contact": {
    title: "Contact",
  },
  "/dashboard/feedback": {
    title: "Feedback",
  },
  "/dashboard/onboarding": {
    title: "",
  }
};