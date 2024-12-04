export type Title = {
  title: string,
  subtitle: string
}

export const titles: Record<string, Title> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "View your tracked courses and stay updated."
  },
  "/search": {
    title: "Search",
    subtitle: "Search for specific classes, professors, and more."
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your account settings and preferences."
  },
  "/about": {
    title: "About",
    subtitle: "Learn more about AggieSeek and our team."
  },
  "/contact": {
    title: "Contact",
    subtitle: "Get in touch with the AggieSeek team."
  },
  "/feedback": {
    title: "Feedback",
    subtitle: "Share your thoughts to help us improve AggieSeek."
  },
  "/onboarding": {
    title: "",
    subtitle: ""
  }
};