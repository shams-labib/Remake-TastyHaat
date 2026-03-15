import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/Errorpage/Errorpage";
import Dashboard from "../DashboardLayout/Dashboard/Dashboard";
import Profile from "../DashboardLayout/UserDashboard/Profile";
import MyOrders from "../DashboardLayout/UserDashboard/MyOrders";

import ContactUs from "../Pages/ContactUs/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AllMenu from "../Pages/AllMenu/AllMenu";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import PrivateRoute from "./PrivateRoute";
import MenuDetails from "../Pages/MenuDetails/MenuDetails";
import AdminDashboard from "../Pages/Dashboard/Admin/Admin";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AddMenu from "../Pages/Dashboard/AddMenu/AddMenu";
import PostedMenus from "../Pages/Dashboard/PostedMenus/PostedMenus";
import DashboradLanding from "../Pages/Dashboard/DashboradLanding/DashboradLanding";
import PaymentsSuccess from "../Pages/Stripe/PaymentsSuccess";
import PaymentsCancel from "../Pages/Stripe/PaymentsCancel";
import RefundPolicy from "./../Pages/Legal/RefundPolicy";
import PrivacyPolicy from "./../Pages/Legal/PrivacyPolicy";
import TermsConditions from "./../Pages/Legal/TermsConditions";
import ManageOrders from "../Pages/Dashboard/Manage Order/ManageOrder";
import OrderHistory from "../Pages/Dashboard/OrderHistory/PaymentHistory";
import PaymentHistory from "../Pages/Dashboard/OrderHistory/PaymentHistory";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";
import NotSellerAdminRoute from "./NotSellerAdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-menu",
        Component: AllMenu,
      },
      {
        path: "/all-menu/:id",
        element: (
          <PrivateRoute>
            <MenuDetails></MenuDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/payments-success",
        Component: PaymentsSuccess,
      },
      {
        path: "/payments-cancel",
        Component: PaymentsCancel,
      },
      {
        path: "/refund-policy",
        Component: RefundPolicy,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms-conditions",
        Component: TermsConditions,
      },
    ],
  },
  // Dashboard Layout

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboradLanding,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "add-menu",
        element: (
          <SellerRoute>
            <AddMenu></AddMenu>
          </SellerRoute>
        ),
      },
      {
        path: "my-menus",
        element: (
          <SellerRoute>
            <PostedMenus></PostedMenus>
          </SellerRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <NotSellerAdminRoute>
            <MyOrders></MyOrders>
          </NotSellerAdminRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders></ManageOrders>
          </AdminRoute>
        ),
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
    ],
  },
]);
