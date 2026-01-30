import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiChevronDown } from "react-icons/fi";
import { Dropdown } from "antd";

// --- Dummy Data ---
const salesData = [
  { name: "JAN", fuel: 4000, diesel: 6000 },
  { name: "FEB", fuel: 6500, diesel: 8000 },
  { name: "MAR", fuel: 10000, diesel: 7000 },
  { name: "APR", fuel: 8000, diesel: 4000 },
  { name: "MAY", fuel: 4500, diesel: 5000 },
  { name: "JUN", fuel: 5500, diesel: 8000 },
  { name: "JUL", fuel: 4000, diesel: 9500 }, // Peak Diesel
  { name: "AUG", fuel: 7000, diesel: 4000 },
  { name: "SEP", fuel: 5000, diesel: 3000 },
  { name: "OCT", fuel: 4000, diesel: 6000 },
  { name: "NOV", fuel: 4500, diesel: 8500 },
  { name: "DEC", fuel: 3000, diesel: 6000 },
];

const statusData = [
  { name: "Request", value: 400, color: "#E5E7EB" },
  { name: "Delivery", value: 300, color: "#ABE7B2" },
  { name: "Canceled", value: 100, color: "#4B5563" },
];

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Sales Activity Line Chart (Spans 2 columns) */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-50">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Sales Activity</h3>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#23B133]"></span> Fuel
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#1B1B1B]"></span>{" "}
                Diesel
              </span>
            </div>
          </div>
          <Dropdown menu={{ items: [{ key: "2024", label: "2024" }] }}>
            <div className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm cursor-pointer">
              Year <FiChevronDown />
            </div>
          </Dropdown>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#23B133" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#23B133" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#999" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#999" }}
                tickFormatter={(val) => `${val / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="fuel"
                stroke="#23B133"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorFuel)"
              />
              <Area
                type="monotone"
                dataKey="diesel"
                stroke="#1B1B1B"
                strokeWidth={4}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right Column Stack */}
      <div className="flex flex-col gap-6">
        {/* 2. Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50">
          <p className="text-sm font-bold text-foreground">Revenue</p>
          <p className="text-xs text-gray-500 mb-2">This Year</p>
          <h2 className="text-3xl font-bold text-foreground">₦12,897,20</h2>
        </div>

        {/* 3. Status Donut Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Status</h3>
            <Dropdown menu={{ items: [{ key: "Jan", label: "Jan" }] }}>
              <div className="flex items-center gap-1 border px-2 py-0.5 rounded text-xs cursor-pointer">
                Month <FiChevronDown />
              </div>
            </Dropdown>
          </div>

          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs font-bold">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
