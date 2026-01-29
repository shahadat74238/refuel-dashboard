
import { 
  LuFileDown, 
  LuFileCheck, 
  LuFileX 
} from "react-icons/lu";
import DashboardCharts from "../../Components/ui/chart/DashboardChart";
import { FiUser, FiUsers } from "react-icons/fi";

function DashboardHome() {
  const cardData = [
    { title: "Total Users", value: "1.5k", icon: <FiUser size={24} /> },
    { title: "Total Supplier", value: "31", icon: <FiUsers size={24} /> },
    { title: "Total Order", value: "746", icon: <LuFileDown size={24} /> },
    { title: "Total Delivery", value: "631", icon: <LuFileCheck size={24} /> },
    { title: "Total Cancelled", value: "238", icon: <LuFileX size={24} /> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      {/* Top 5 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-50"
          >
            <div className="mb-4 !text-foreground">{card.icon}</div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{card.value}</h1>
            <p className="text-sm font-bold !text-muted">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <DashboardCharts />
    </div>
  );
}

export default DashboardHome;