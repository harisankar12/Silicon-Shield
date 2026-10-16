import type { NavigationItem } from "@/types";

export const APP_NAME = "Silicon Shield";
export const APP_DESCRIPTION =
  "An open-source cybersecurity monitoring platform by The Silicon Engine.";

export const ROUTES = {
  dashboard: {
    href: "/dashboard",
    title: "Dashboard",
    description: "The future overview of cybersecurity monitoring activity.",
  },
  monitoring: {
    href: "/monitoring",
    title: "Monitoring",
    description: "A future workspace for monitoring security activity.",
  },
  alerts: {
    href: "/alerts",
    title: "Alerts",
    description: "A future workspace for reviewing security alerts.",
  },
  assets: {
    href: "/assets",
    title: "Assets",
    description: "A future workspace for exploring monitored assets.",
  },
  reports: {
    href: "/reports",
    title: "Reports",
    description: "A future workspace for security reporting.",
  },
  securityHealth: {
    href: "/security-health",
    title: "Security health",
    description: "A future overview of security posture and health.",
  },
  vulnerabilities: {
    href: "/vulnerabilities",
    title: "Vulnerabilities",
    description: "A future workspace for reviewing vulnerabilities.",
  },
  recommendations: {
    href: "/recommendations",
    title: "Recommendations",
    description: "A future workspace for security improvement recommendations.",
  },
  settings: {
    href: "/settings",
    title: "Settings",
    description: "A future workspace for platform preferences.",
  },
} as const satisfies Record<string, NavigationItem>;
