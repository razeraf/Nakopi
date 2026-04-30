export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Kamu bisa tambah Sidebar di sini nanti */}
      {children}
    </section>
  );
}