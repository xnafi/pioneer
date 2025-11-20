import DashboardNav from "@/components/shared/DashboardNav";
import Sidebar from "@/components/shared/Sidebar"; 

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
            <main className="flex-1 p-7 overflow-y-auto bg-[#edf7ff]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
