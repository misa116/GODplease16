import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
  }, []);

  const filteredProducts = products?.filter((product) =>
    [product.name, product.category, product.price, product.stock, product.supplier, product.moduleNo, product.manufacturer, product.uom]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Inventory List</h1>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white py-2 px-6 rounded shadow hover:bg-blue-700 transition duration-200">
          Create Asset
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, category, supplier, etc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border border-gray-300 text-slate-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-lg font-medium">{message || "Loading..."}</p>
      ) : (
        <div className="overflow-x-auto max-h-[70vh] bg-white rounded shadow-md">
  <table className="min-w-full text-left">

            <thead className="bg-blue-200 text-gray-700  sticky top-0 z-10 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Category</th>
                <th className="py-3 px-4 border">Supplier</th>
                <th className="py-3 px-4 border">Stock</th>
                <th className="py-3 px-4 border">Model No</th>
                <th className="py-3 px-4 border">Manufacturer</th>
                <th className="py-3 px-4 border">UOM</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 text-slate-700 border">{product.name}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.category}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.supplier}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.stock}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.modelNo || "N/A"}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.manufacturer}</td>
                    <td className="py-2 px-4 text-slate-700 border border">{product.uom || "PCS"}</td>
                    <td className="py-2 px-4 text-slate-700 border  border">
                      ${product?.price ? product?.price?.toFixed(2) : "0.00"}
                    </td>
                    <td className="py-2 px-4 border text-blue-600 hover:underline">
                      <Link to={`/product/${product._id}`}>View</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No products found.
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

export default Warehouse;