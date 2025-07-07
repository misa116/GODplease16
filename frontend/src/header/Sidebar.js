import React, { useState, useEffect, useRef } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import {
  BsCart4,
  BsCheck2Square,
  BsFillGrid3X3GapFill,
  BsGrid1X2Fill,
} from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const sidebarRef = useRef(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(true);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleProcurement = () => setIsProcurementOpen(!isProcurementOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openSidebarToggle &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        openSidebar(); // Close sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebarToggle, openSidebar]);

  return (
 <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive p-4" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand  flex items-center space-x-2 text-slate-300 ">
          <BiTime size={26} className="icon_head mr-2" /> {currentTime}
        </div>
        <span className="icon close_icon " onClick={openSidebar}>
          <IoIosClose size={32} className="text-slate-100 ml-4" />
        </span>
      </div>

      {/* Sidebar Menu */}
      <ul className="space-y-4 text-sm">
        {/* Dashboard */}
        <li>
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <BsGrid1X2Fill size={30} />
            <span className="text-xl">Dashboard</span>
          </Link>
        </li>

        {/* Inventory Section */}
        <li>
          <div
            onClick={toggleInventory}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >

            <div className="flex items-center text-xl space-x-3">
              <BsFillGrid3X3GapFill size={30} />
              <span>Inventory</span>
            </div>

            <IoIosArrowUp
              size={18}
              className={`transition-transform ${isInventoryOpen ? "rotate-180" : ""}`}
            />
          </div>




          {isInventoryOpen && (
            <ul className="ml-6 mt-2 space-y-3 text-gray-300">
              <li>
                <Link to="/warehouse" className="hover:text-white flex items-center space-x-2">
                  <FaToolbox />
                  <span>Warehouse</span>
                </Link>
              </li>
              <li>
                <Link to="/store-requisition" className="hover:text-white flex items-center space-x-2 relative">
                  <BsCart4 />
                  <span>Cart</span>
                  {totalQty > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {totalQty}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/my-orders-list" className="hover:text-white flex items-center space-x-2">
                  <BiSolidUserPin />
                  <span>My Requisitions</span>
                </Link>
              </li>
              <li>
                <Link to="/LPO-factory" className="hover:text-white flex items-center space-x-2">
                  <FaJediOrder />
                  <span>LP Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/goods-receive-note" className="hover:text-white flex items-center space-x-2">
                  <FaTools />
                  <span>GRN</span>
                </Link>
              </li>
              {userInfo?.isAdmin && (
                <li>
                  <Link to="/listUsers" className="hover:text-white flex items-center space-x-2">
                    <FaUsers />
                    <span>HR</span>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>

        {/* Procurement Section */}
        <li>
          <div
            onClick={toggleProcurement}
            className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <div className="flex items-center text-xl space-x-3">
              <BsCheck2Square size={30} />
              <span>Procurement</span>
            </div>
            <IoIosArrowUp
              size={18}
              className={`transition-transform ${isProcurementOpen ? "rotate-180" : ""}`}
            />
          </div>
          {isProcurementOpen && (
            <ul className="ml-6 mt-2 space-y-3 text-gray-300">
              <li>
                <Link to="/LPO-procurement" className="hover:text-white">
                  Local Purchase Orders
                </Link>
              </li>
              <li>
                <Link to="/pending-requisitions" className="hover:text-white">
                  Pending Requisitions
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
