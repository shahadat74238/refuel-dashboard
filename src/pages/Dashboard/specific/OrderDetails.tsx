/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut";
import { Image } from "antd";

// DUMMY DATA based on your image
const dummyOrder = {
  _id: "1",
  customer_name: "Tiago Felipe",
  customer_email: "tiagofelipe@email.com",
  customer_image: "https://randomuser.me/api/portraits/men/1.jpg",
  phone_number: "+234 54564 5565",
  order_date: "8 Nov 2025",
  supplier_name: "Elect Energy Nigeria Limited",
  supplier_email: "electenergynigerialtd@gmail.com",
  bank_name: "First Bank Of Nigeria",
  account_number: "#2000306565",
  delivery_address: "Lagos Island, Lagos",
  item_quantity: "10 Litter Fuel",
  rate: "1,499.30",
  total_cost: "14,990.30",
  status: "Order Request",
};

const OrderDetails = () => {
  const { id } = useParams();

  console.log(id, "order details id");

  // In a real app, you'd fetch using 'id'
  const order = dummyOrder;

  return (
    <PageLayout title="Order Details">
      <PageContent>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-50 min-h-[60vh]">
          {/* TOP SECTION: IMAGE & DATE */}
          <div className="flex justify-between items-start mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src={order.customer_image}
                alt="profile"
                width="100%"
                height="100%"
                className="object-cover"
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">
                Order Date :{" "}
                <span className="font-normal text-gray-600">
                  {order.order_date}
                </span>
              </p>
            </div>
          </div>

          {/* MIDDLE SECTION: CUSTOMER & SUPPLIER INFO */}
          <div className="flex justify-between items-start mb-16">
            {/* Customer Info */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {order.customer_name}
              </h2>
              <p className="text-gray-500 font-medium">
                {order.customer_email}
              </p>
              <div className="flex gap-8 pt-4">
                <span className="font-bold text-gray-800">Phone Number</span>
                <span className="text-gray-600 font-medium">
                  {order.phone_number}
                </span>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="text-right space-y-1">
              <h3 className="font-bold text-gray-800 text-lg">Supplier</h3>
              <p className="text-muted font-medium">{order.supplier_name}</p>
              <p className="text-gray-500">{order.supplier_email}</p>
            </div>
          </div>

          {/* BOTTOM SECTION: DATA ROW */}
          <div className="grid grid-cols-7 gap-4 pt-10">
            <InfoBlock label="Bank Name" value={order.bank_name} />

            <div>
              <p className="text-sm font-bold text-gray-800 mb-3">
                Account Number
              </p>
              <span className="bg-gray-100 px-4 py-1.5 rounded-full text-gray-700 font-bold text-sm">
                {order.account_number}
              </span>
            </div>

            <InfoBlock
              label="Delivery Address"
              value={order.delivery_address}
            />
            <InfoBlock label="Item/Quantity" value={order.item_quantity} />
            <InfoBlock label="Rate" value={order.rate} />
            <InfoBlock label="Total Cost" value={order.total_cost} />
            <InfoBlock label="Status" value={order.status} />
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
};

/**
 * Shared component for the bottom data row items
 */
const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-3">
    <p className="text-sm font-bold text-gray-800 whitespace-nowrap">{label}</p>
    <p className="text-sm text-gray-600 font-medium leading-relaxed">{value}</p>
  </div>
);

export default OrderDetails;
