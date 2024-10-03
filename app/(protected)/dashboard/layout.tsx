import Link from "next/link";

import "./Layout.scss";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="admin-header">
        <Link href="/dashboard/frontpage/">Frontpage</Link>
        <Link href="/dashboard/products/">Products</Link>
        <Link href="/dashboard/users/">Users</Link>
        <Link href="/dashboard/orders/">Orders</Link>
        <Link href="/dashboard/categories/">Categories</Link>
        <Link href="/dashboard/reviews/">Reviews</Link>
      </nav>
      {children}
    </>
  );
}
