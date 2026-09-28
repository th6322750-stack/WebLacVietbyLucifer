import type { Metadata } from "next";
import { listProjects } from "@/lib/db/repositories/projects";
import { ProjectManager } from "./ProjectManager";
import { AdminDataUnavailable } from "@/components/admin/AdminDataUnavailable";

export const metadata: Metadata = { title: "Dự án" };
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
 /* includeUnpublished: the admin must see drafts; the public site never asks for them. */
 try {
  return <ProjectManager initial={await listProjects({ includeUnpublished: true })} />;
 } catch {
  return <AdminDataUnavailable title="Chưa thể tải danh sách dự án" />;
 }
}
