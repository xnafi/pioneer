import DashboardNav from "@/components/shared/DashboardNav";
import Sidebar from "@/components/shared/Sidebar"; // Import the new Sidebar component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <DashboardNav />
            <main className="flex-1 p-7 overflow-y-auto ">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
