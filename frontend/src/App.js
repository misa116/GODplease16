import "./App.css";
import Landing from "./components/Landing";
import './/styles/products.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import Layout from "./layout/Layout";
import RegisterScreen from "./Screens/userScreens/RegisterScreen";
import LoginScreen from "./Screens/userScreens/LoginScreen";
import Warehouse from "./Screens/productScreens/Warehouse";
import AuthUser from "./components/AuthUser";
import ProductDetails from "./Screens/productScreens/ProductDetails";
import CartScreen from "./Screens/CartScreen";
import RequisitionType from "./Screens/productScreens/RequisitionType"
import PurchaseRequisition from "./Screens/productScreens/PurchaseRequisition";
import PlaceOrder from "./Screens/productScreens/PlaceOrder";
import MyOrders from "./Screens/userScreens/MyOrders";
import OrderDetails from "./Screens/productScreens/orderDetails";
import ConfirmRequisition from "./Screens/productScreens/ConfirmRequisition";
import LPO from "./Screens/productScreens/LPO";
import LocalPurchaseOrders from "./Screens/procurementScreens/PurchaseLocalOrders";
import PendingRequsitions from "./Screens/procurementScreens/PendingRequisition";
import OrderDetailsProcur from "./Screens/procurementScreens/OrderDetailProcur";
import ListUsers from "./Screens/userScreens/ListUsers";
import EditProduct from "./Screens/productScreens/EditProduct";
import GRN from "./Screens/productScreens/GRN";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/*" element={<Navigate to="/" />} />


        <Route path="/login" exact element={<LoginScreen />} />
        <Route path="/register" exact element={<RegisterScreen />} />

     <Route
          path="/dashboard"
          exact
          element={
            <AuthUser>
              <Layout>
                <Dashboard />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/warehouse"
          exact
          element={
            <AuthUser>
              <Layout>
                <Warehouse />
              </Layout>
            </AuthUser>
          }
        />

       <Route
          path="/product/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <ProductDetails />
              </Layout>
            </AuthUser>
          }
        />

          <Route
          path="/store-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <CartScreen />
              </Layout>
            </AuthUser>
          }
        />

         <Route
          path="/requisition-type"
          exact
          element={
            <AuthUser>
              <Layout>
                <RequisitionType />
              </Layout>
            </AuthUser>
          }
        />

   <Route
          path="/purchase-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <PurchaseRequisition />
              </Layout>
            </AuthUser>
          }
        />

         <Route
          path="/placeorder"
          exact
          element={
            <AuthUser>
              <Layout>
                <PlaceOrder />
              </Layout>
            </AuthUser>
          }
        />

         <Route
          path="/my-orders-list"
          exact
          element={
            <AuthUser>
              <Layout>
                <MyOrders />
              </Layout>
            </AuthUser>
          }
        />

 <Route
          path="/orderdetail/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <OrderDetails />
              </Layout>
            </AuthUser>
          }
        />

         <Route
          path="/confirm-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <ConfirmRequisition />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/LPO-factory"
          exact
          element={
            <AuthUser>
              <Layout>
                <LPO />
              </Layout>
            </AuthUser>
          }
        />

  <Route
          path="/LPO-procurement"
          exact
          element={
            <AuthUser>
              <Layout>
                <LocalPurchaseOrders />
              </Layout>
            </AuthUser>
          }
        />

 <Route
          path="/pending-requisitions"
          exact
          element={
            <AuthUser>
              <Layout>
                <PendingRequsitions />
              </Layout>
            </AuthUser>
          }
        />

 <Route
          path="/procurement/order/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <OrderDetailsProcur />
              </Layout>
            </AuthUser>
          }
        />

 <Route
          path="/listUsers"
          exact
          element={
            <AuthUser>
              <Layout>
                <ListUsers />
              </Layout>
            </AuthUser>
          }
        />


<Route
          path="/edit/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <EditProduct />
              </Layout>
            </AuthUser>
          }
        />

<Route
          path="/goods-receive-note"
          exact
          element={
            <AuthUser>
              <Layout>
                <GRN />
              </Layout>
            </AuthUser>
          }
        />


         </Routes>
    </BrowserRouter>
  )

}

export default App;
