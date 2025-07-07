import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaCheck, FaTimes, FaUsers, FaSearch } from "react-icons/fa";
import { useListUsersQuery } from "../../redux/userApiSlice";
import EditUserClearance from "./EditUsersClearance";

const ListUser = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useListUsersQuery();


  const { userInfo } = useSelector((state) => state.auth);
  
useEffect(() => {
  if (userInfo && !userInfo?.isAdmin) {
    navigate("/dashboard");
  }
}, [userInfo, navigate]);


  const openModalHandler = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };

  const closeModalHandler = () => {
    setEditModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const filteredUsers = data?.users?.filter((user) =>
    [user.name, user.email, user.dept]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {editModal && (
        <EditUserClearance user={selectedUser} onClose={closeModalHandler} />
      )}

      <div className="max-w-7xl mx-auto py-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl text-blue-700 font-bold flex items-center justify-center gap-3">
            <FaUsers size={36} /> User Management Dashboard
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="relative w-full sm:w-1/3">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or department"
              className="w-full pl-10 pr-4 py-2 border border-slate-400 rounded-lg shadow-md  text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <h3 className="text-center text-red-500">
            {error?.data?.message || "Something went wrong!"}
          </h3>
        ) : filteredUsers?.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full text-sm sm:text-md text-left text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Admin</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-all">
                    <td className="py-3 px-4">{user._id}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.dept}</td>
                    <td className="py-3 px-4">
                      {user.isAdmin ? (
                        <FaCheck size={20} className="text-green-600" />
                      ) : (
                        <FaTimes size={20} className="text-red-600" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openModalHandler(user)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-orange-500 transition"
                      >
                        <FaUserEdit />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-center text-gray-500 mt-10">No users found.</h3>
        )}
      </div>
    </div>
  );
};

export default ListUser;