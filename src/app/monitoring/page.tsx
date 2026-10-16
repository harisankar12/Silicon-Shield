import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { ROUTES } from "@/lib/constants";

const page = ROUTES.monitoring;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <PagePlaceholder page={page} />;
}
