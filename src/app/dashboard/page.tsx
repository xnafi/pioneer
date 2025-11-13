"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      router.push("/sign-in");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, [router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Checking Authentication... login to continue.
      </div>
    );

  return <div className="p-10 text-3xl font-bold">Welcome to Dashboard 🎉</div>;
}
