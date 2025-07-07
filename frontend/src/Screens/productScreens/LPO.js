 import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useGetOrdersQuery, useDeleteOrderMutation} from "../../redux/orderSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";



const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  
const [deleteOrder] = useDeleteOrderMutation();

const deleteOrderHandler = async (orderId) => {
  try {
    await deleteOrder(orderId).unwrap();
    toast.success("Order Deleted")
    refetch();
  } catch (err) {
    toast.error("ERROR acured while Deleting Order");

  }
};


  const filteredOrders = 
  data?.orders &&
   data?.orders?.filter((order) => order.user.dept === "Company");

  return (
    <div className="w-full">
      <div>
        <h1>LOCAL PURCHASE ORDERS</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div className="">
            <div className="">
              <table
                className="w-full text-sm text-left rtl:text-right
             text-blue-100 dark:text-blue-100 border-collapse  "
              >
                <thead
                  className="text-xs
                 text-white uppercase bg-blue-600 
                 border-b border-blue-400 dark:text-white "
                >
                  <tr>
                    <th>S/N</th>
                    <th className="px-6 py-3">Product name</th>
                    <th className="px-6 py-3">QTY</th>
                    <th className="px-6 py-3">USER</th>

                    <th className="px-6 py-3">ORDER DATE</th>
                    <th className="px-6 py-3">DELIVER DATE</th>
                    <th className="px-6 py-3">RECIEVED DATE</th>
                    <th></th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order, index) => (
                        <tr
                          key={order._id}
                          className="bg-gray-700 border-b border-gray-600"
                        >
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">
                            {order.orderItems[0]?.name}
                          </td>
                          <td className="px-6 py-3">
                            {order.orderItems[0]?.qty}
                          </td>
                          <td className="px-6 py-3">{order.user?.name}</td>
                          <td className="px-6 py-3">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-3">
                            {order.isDelivered 
                            ? (
                              order.deliveredAt
                            ) : (
                              <b className="flex items-center ">
                                <FaTimes
                                  style={{ color: "red" }}
                                  className="mr-2"
                                />{" "}
                                Pending
                              </b>
                            )}
                          </td>
                          <td className="px-6 py-3">
                            {order.isRecieved ? (
                              order.recievedAt.substring(0, 10)
                            ) : (
                              <b className="flex items-center ">
                                <FaTimes
                                  style={{ color: "red" }}
                                  className="mr-2"
                                />{" "}
                                processing
                              </b>
                            )}
                          </td>


                          <td className="px-6 py-3">
                            <Link to={`/orderdetail/${order._id}`}>
                              <button className="font-medium text-white hover:underline uppercase">
                                Details
                              </button>
                            </Link>
                          </td>
                        <th className="hover:text-red-900">
                          <button onClick={deleteOrderHandler} 
                          className="p-2 bg-red-600 px-2 rounded-full m-3">
                       <AiOutlineDelete size={28} />
                          </button>
                        </th>
                        
                        
                        </tr>


                      ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LPO;