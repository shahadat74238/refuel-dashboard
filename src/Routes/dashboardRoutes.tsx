// import PrivateRoute from "./PrivetRoute";
import Dashboard from "../Layout/Dashboard";
import OrderRequest from "../pages/Dashboard/OrderRequest";
import PageNotFound from "../pages/PageNotFound";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";
import TermsAndConditions from "../pages/Dashboard/TermsAndConditions";
import PrivacyPolicy from "../pages/Dashboard/PrivacyPolicy";
import DriverManagement from "../pages/Dashboard/DriverManagement";
import DriverDetails from "../pages/Dashboard/specific/DriverDetails";
import ParcelManagement from "../pages/Dashboard/ParcelManagement";
import SupportChat from "../pages/Dashboard/SupportChat";
import RefundManagement from "../pages/Dashboard/RefundManagement";
import Notification from "../pages/Dashboard/Notification";

export const dashboardRoutes = {
  path: "/",
  errorElement: <PageNotFound />,
  element: (
    // <PrivateRoute>
    <Dashboard />
    // </PrivateRoute>
  ),
  children: [
    { path: "/", element: <DashboardHome /> },
    { path: "/order-request", element: <OrderRequest /> },
    { path: "/commuter-driver", element: <DriverManagement /> },
    { path: "/commuter-driver/:id", element: <DriverDetails /> },
    { path: "/parcel-management", element: <ParcelManagement /> },
    { path: "/refund-request", element: <RefundManagement /> },
    { path: "/support-chat", element: <SupportChat /> },
    { path: "/notification", element: <Notification /> },
    { path: "/profile", element: <Profile /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-conditions", element: <TermsAndConditions /> },
  ],
};
