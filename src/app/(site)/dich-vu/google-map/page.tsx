import { redirect } from "next/navigation";

/** Legacy Maxweb-compatible path; the compliant equivalent is the owned Google Business Profile
 * workflow, so old links land on the canonical service instead of a dead page. */
export default function LegacyGoogleMapPage() {
  redirect("/dich-vu/google-business-profile");
}
