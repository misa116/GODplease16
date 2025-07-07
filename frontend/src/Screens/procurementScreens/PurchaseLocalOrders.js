import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/orderSlice";




const LocalPurchaseOrders = () => {
  const navigate = useNavigate();

  // Access user info from redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Redirect users who are not from the Procurement department
  useEffect(() => {
    if (userInfo && userInfo.dept !== "Procurement") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // Fetch all orders
  const { data, isLoading, error } = useGetOrdersQuery();

  // Filter for Warehouse department orders only
  const filteredOrders = data?.orders?.filter(
    (order) => order?.user?.dept === "Warehouse"
  );

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-center text-orange-600 mb-6">
        LOCAL PURCHASE ORDERS
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 text-center font-semibold">
          Error: {error?.message || "Something went wrong."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-blue-100 border-collapse">
            <thead className="text-xs uppercase bg-orange-600 text-white">
              <tr>
                <th className="px-4 py-3">S/N</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Order Date</th>
                <th className="px-6 py-3">Deliver Date</th>
                <th className="px-6 py-3">Received Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order, index) => (
                <tr
                  key={order._id}
                  className={`border-b border-gray-600 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition-all duration-200`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{order.orderItems[0]?.name}</td>
                  <td className="px-6 py-3">{order.orderItems[0]?.qty}</td>
                  <td className="px-6 py-3">{order.user?.name}</td>
                  <td className="px-6 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {order.isDelivered ? (
                      new Date(order.deliveredAt).toLocaleDateString()
                    ) : (
                      <span className="flex items-center text-red-500 font-semibold">
                        <FaTimes className="mr-2" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {order.isRecieved ? (
                      new Date(order.recievedAt).toLocaleDateString()
                    ) : (
                      <span className="flex items-center text-yellow-400 font-semibold">
                        <FaTimes className="mr-2 text-red-500" />
                        Processing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <Link to={`/procurement/order/${order._id}`}>
                      <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredOrders?.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-300">
                    No orders found for Warehouse department.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LocalPurchaseOrders;
