export type DashboardTitle = {
  title: string,
  subtitle: string,
  term?: string
}

export const titles: Record<string, DashboardTitle> = {
  "/dashboard/home": {
    title: "Dashboard",
    subtitle: "View your tracked courses and stay updated."
  },
  "/dashboard/search": {
    title: "Search",
    subtitle: "Search for specific classes, professors, and more."
  },
  "/dashboard/settings": {
    title: "Settings",
    subtitle: "Manage your account settings and preferences."
  },
  "/dashboard/about": {
    title: "About",
    subtitle: "Learn more about AggieSeek and our team."
  },
  "/dashboard/contact": {
    title: "Contact",
    subtitle: "Get in touch with the AggieSeek team."
  },
  "/dashboard/feedback": {
    title: "Feedback",
    subtitle: "Share your thoughts to help us improve AggieSeek."
  },
  "/dashboard/onboarding": {
    title: "",
    subtitle: ""
  }
};