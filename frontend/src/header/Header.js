import React, { useEffect } from "react";
import { BsJustify } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/authSlice";
const Header = ({ openSidebar }) => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutHandler());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="meu-icon" onClick={openSidebar}>
        <BsJustify size={24} />
      </div>

      <div className="header-left">
        <h3 className="text-lg sm:ml-3 md:text-3xl text-slate-200">
          Inventory SYS
        </h3>
      </div>
      <div className="header-right flex items-center text-1xl space-x-2">
        <p>{userInfo && userInfo?.name}</p>
        <button className="flex items-center  space-x-1" onClick={logout}>
          <BiLogOut size={28} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;