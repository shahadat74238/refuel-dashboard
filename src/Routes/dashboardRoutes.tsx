// import PrivateRoute from "./PrivetRoute";
import Dashboard from "../Layout/Dashboard";
import OrderRequest from "../pages/Dashboard/OrderRequest";
import PageNotFound from "../pages/PageNotFound";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";
import TermsAndConditions from "../pages/Dashboard/TermsAndConditions";
import PrivacyPolicy from "../pages/Dashboard/PrivacyPolicy";
import OrderDetails from "../pages/Dashboard/specific/OrderDetails";
import Notification from "../pages/Dashboard/Notification";
import CompletedOrder from "../pages/Dashboard/CompletedOrder";
import CanceledOrder from "../pages/Dashboard/CanceledOrder";
import UserManagement from "../pages/Dashboard/UserManagement";
import NewSupplierRequest from "../pages/Dashboard/NewSupplierRequest";
import SupplierManagement from "../pages/Dashboard/SupplierManagement";
import AdminManagement from "../pages/Dashboard/AdminManagement";
import HelpSupport from "../pages/Dashboard/HelpSupport";
import PrivateRoute from "./PrivetRoute";

export const DashboardRoutes = {
  path: "/",
  errorElement: <PageNotFound />,
  element: (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  ),
  children: [
    { path: "/", element: <DashboardHome /> },
    { path: "/order-request", element: <OrderRequest /> },
    { path: "/order-request/:id", element: <OrderDetails /> },
    { path: "/completed-order", element: <CompletedOrder /> },
    { path: "/complect-order/:id", element: <OrderDetails /> },
    { path: "/canceled-order", element: <CanceledOrder /> },
    { path: "/canceled-order/:id", element: <OrderDetails /> },
    { path: "/user-management", element: <UserManagement /> },
    { path: "/new-supplier-request", element: <NewSupplierRequest /> },
    { path: "/supplier-management", element: <SupplierManagement /> },
    { path: "/admin-management", element: <AdminManagement /> },
    { path: "/notification", element: <Notification /> },
    { path: "/profile-setting", element: <Profile /> },
    { path: "/support-help", element: <HelpSupport /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-conditions", element: <TermsAndConditions /> },
  ],
};
