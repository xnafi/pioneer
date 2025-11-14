import Image from "next/image";
import profile from "../../assets/profile.svg";
import dashboardIcon from "../../assets/dashboard-icon.png";
import todoIcon from "../../assets/todo-icon.png";
import userIcon from "../../assets/user-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import Link from "next/link";

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
            <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <div className="flex items-center">
                <Image
                  src={profile}
                  alt="Dreamy Software Logo"
                  className="h-8 mr-2"
                />
                <span className="text-xl font-semibold text-blue-900">
                  DREAMY SOFTWARE
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <span className="text-gray-700">Friday, 07/11/2025</span>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
