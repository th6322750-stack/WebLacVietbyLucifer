import type { Metadata } from "next"; /** Outermost admin layout: metadata only, NO auth guard. * * The guard lives one level down in (protected)/layout.tsx. Putting it here instead sent the * login page — which is also under /admin — into a redirect loop against itself. The route * group keeps the URLs unchanged: (protected)/page.tsx is still /admin. */
export const metadata: Metadata = { title: { default: "Quản trị", template: "%s — Quản trị Lạc Việt" }, robots: { index: false, follow: false },
}; export default function AdminRootLayout({ children }: { children: React.ReactNode }) { return children;
}
