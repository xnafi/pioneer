import Image from "next/image";
import logo from "../../assets/nav-logo.svg";
import bell from "../../assets/bell-icon.svg";
import cal from "../../assets/Cal-icon.svg";

export default function DashboardNav() {
  // Generate dynamic date
  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedDate = today.toLocaleDateString("en-GB"); 

  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 h-[88px] px-7">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="Dreamy Software Logo"
          width={105}
          height={32}
          className="mr-2"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full">
          <Image src={bell} width={34} height={34} alt="bell-icon" />
        </button>

        <button className="p-2 rounded-full">
          <Image src={cal} width={34} height={34} alt="cal-icon" />
        </button>

        <div className="flex flex-col text-gray">
          <span className="text-sm font-medium">{dayName}</span>
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
      </div>
    </nav>
  );
}
