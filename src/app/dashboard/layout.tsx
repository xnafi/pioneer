"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import profileFallback from "../../assets/profile.svg";
import dashboardIcon from "../../assets/dashboard-icon.png";
import todoIcon from "../../assets/todo-icon.png";
import userIcon from "../../assets/user-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import Link from "next/link";
import DashboardNav from "@/components/shared/DashboardNav";

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    // Redirect if no token found
    if (!token) {
      window.location.href = "/sign-in";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://todo-app.pioneeralpha.com/api/users/me/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("User data:", data);

        // Invalid token or unauthorized
        if (!res.ok) {
          localStorage.removeItem("auth_token");
          window.location.href = "/sign-in ";
          return;
        }

        setUser(data);
      } catch (error) {
        console.error("User fetch error:", error);
        localStorage.removeItem("auth_token");
        window.location.href = "/sign-in";
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/sign-in";
  };

  const userName = user ? `${user.first_name} ${user.last_name}` : "Loading...";
  const userEmail = user?.email || "Loading...";

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-[340px] dark-bg text-white flex flex-col">
            <div className="p-4">
              <div className="flex flex-col items-center mb-4 justify-center text-center mt-14">
                <Image
                  src={user?.profile_image || profileFallback}
                  width={86}
                  height={86}
                  alt="User Avatar"
                  className="rounded-full"
                />

                <div>
                  <h2 className="text-lg font-semibold">{userName}</h2>
                  <p className="text-sm">{userEmail}</p>
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
                href="/dashboard/todos"
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
                href="/dashboard/account"
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
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-md hover:bg-blue-800 w-full text-left"
              >
                <Image
                  src={logoutIcon}
                  width={24}
                  height={24}
                  alt="Logout-icon"
                  className="mr-3"
                />
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <DashboardNav />

            <main className="flex-1 p-7 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
