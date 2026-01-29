import { PageContent, PageLayout } from "../../Layout/PageLayOut";

// 1. Dummy data based on the image content
const notifications = [
  {
    id: 1,
    name: "Tiago Felipe",
    message: "10 Litter Fuel Order Successfully Delivery To Lagos Island, Lagos",
    time: "1 Hour Ago",
  },
  {
    id: 2,
    name: "Tiago Felipe",
    message: "10 Litter Fuel Order Request To Lagos Island, Lagos",
    time: "2 Hours Ago",
  },
  {
    id: 3,
    name: "Tiago Felipe",
    message: "10 Litter Fuel Order Canceled To Lagos Island, Lagos",
    time: "2 Hours Ago",
  },
];

const Notification = () => {
  return (
    <PageLayout title="Notification">
      <PageContent>
        {/* Container with spacing between notification cards */}
        <div className="flex flex-col gap-4 ">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center bg-white p-6 md:px-10 rounded-[10px]  border-gray-50 transition-all "
            >
              {/* Left Side: Name (Tiago Felipe) */}
              <div className="col-span-3 md:col-span-2">
                <p className="font-bold text-foreground text-base truncate">
                  {item.name}
                </p>
              </div>

              {/* Center: The Notification Message */}
              <div className="col-span-6 md:col-span-8 px-4">
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  {item.message}
                </p>
              </div>

              {/* Right Side: Timestamp (1 Hour Ago) */}
              <div className="col-span-3 md:col-span-2 text-right">
                <p className="font-medium text-foreground text-sm whitespace-nowrap">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Notification;