/** Illustrative frontend data. These values do not represent live monitoring. */
export type AlertSeverity = "High" | "Medium";

export type DashboardAlert = {
  id: string;
  title: string;
  severity: AlertSeverity;
  kind: "login" | "requests" | "traffic";
  timestamp: string;
};

export const securityOverview = {
  score: 82,
  maximumScore: 100,
  status: "Good",
  weeklyChange: 6,
  comparisonLabel: "from last week",
  explanation: "Your organisation's security overview",
  summary: "A little progress, every day.",
} as const;

export const dashboardAlerts: readonly DashboardAlert[] = [
  {
    id: "example-login-attempts",
    title: "Repeated failed login attempts",
    severity: "High",
    kind: "login",
    timestamp: "12 min ago",
  },
  {
    id: "example-request-spike",
    title: "Suspicious request spike",
    severity: "Medium",
    kind: "requests",
    timestamp: "38 min ago",
  },
  {
    id: "example-traffic-pattern",
    title: "Unusual traffic pattern",
    severity: "Medium",
    kind: "traffic",
    timestamp: "1 hour ago",
  },
];
