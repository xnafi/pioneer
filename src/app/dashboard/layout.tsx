import Image from "next/image";
import profile from "../../assets/profile.svg";
import dashboardIcon from "../../assets/dashboard-icon.png";
import todoIcon from "../../assets/todo-icon.png";
import userIcon from "../../assets/user-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import Link from "next/link";
import DashboardNav from "@/components/shared/DashboardNav";


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
          <aside className="w-[340px] dark-bg text-white flex flex-col">
            <div className="p-4">
              <div className="flex flex-col items-center mb-4 justify-center text-center mt-14">
                <Image
                  src={profile}
                  width={86}
                  height={86}
                  alt="User Avatar"
                  className="rounded-full "
                />
                <div>
                  <h2 className="text-lg font-semibold">amanuel</h2>
                  <p className="text-sm">amanuel@gmail.com</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 rounded-md hover:bg-blue-800"
              >
                <Image
                  src={dashboardIcon}
                  width={24}
                  height={24}
                  alt="Dashboard-icon"
                  className="mr-3"
                />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center px-4 py-2 rounded-md hover:bg-blue-800"
              >
                <Image
                  src={todoIcon}
                  width={24}
                  height={24}
                  alt="Todo-icon"
                  className="mr-3"
                />
                Todos
              </Link>
              <Link
                href="#"
                className="flex items-center px-4 py-2 rounded-md bg-blue-800"
              >
                <Image
                  src={userIcon}
                  width={24}
                  height={24}
                  alt="User-icon"
                  className="mr-3"
                />
                Account Information
              </Link>
            </nav>
            <div className="p-4 border-t border-blue-800">
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded-md hover:bg-blue-800"
              >
                <Image
                  src={logoutIcon}
                  width={24}
                  height={24}
                  alt="Logout-icon"
                  className="mr-3"
                />
                Logout
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation */}
            <DashboardNav />

            {/* Page Content */}
            <main className="flex-1 p-7 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
