import HRDesktop from "@/components/HRDesktop";
import ProfileSchema from "@/components/ProfileSchema";
import { pageMetadata, siteDescription, siteTitle } from "@/lib/metadata";

export const metadata = { ...pageMetadata(siteTitle, siteDescription, "/"), title: { absolute: siteTitle } };

export default function HomePage() {
  return <><ProfileSchema /><HRDesktop /></>;
}

