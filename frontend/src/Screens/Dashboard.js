 import { getProducts, deleteProduct } from "../redux/productSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CategoryModel from "../components/CategoryModel";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getUoms } from "../redux/categorySlice";
import ReactPaginate from "react-paginate";

import UomModel from "../components/unitofmModel";
import CreateProduct from "./productScreens/CreateProduct";


const Dashboard = () => {
  

  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products);

      const { categories, Uom } = useSelector((state) => state.category);
const [search, setSearch] = useState("");
      const [categoryModal, setOpenCategoryModal] = useState(false);
      const [uomModal, setOpenUomModal] = useState(false);
      const [productModal, setOpenProductModal] = useState(false);
      const { userInfo } = useSelector((state) => state.auth);

      const [currentPage, setCurrentPage] = useState(0); 
      const [productsPerPage] = useState(8); 



      const dispatch = useDispatch();

      const openCategoryModal = () => {    setOpenCategoryModal(true)};
      const closeCategoryModal = () => { setOpenCategoryModal(false)};
  const openUomModal = () => {  setOpenUomModal(true)};
  const closeUomModal = () => {setOpenUomModal(false)};
  const openProductModalHandler = () => {setOpenProductModal(true);
    };
 const closeProductModal = () => {
    setOpenProductModal(false);
    };
         const navigate = useNavigate();


 useEffect(() => {
    dispatch(getCategories());
  }, []);


  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getProducts());
   
  }, [dispatch, userInfo, navigate]);


useEffect(() => {
    dispatch(getUoms());
   
  }, []);


   const deleteProductHandler = async(id) => {
     try {
       await dispatch(deleteProduct(id)).unwrap() ;
    dispatch(getProducts());
   } catch (err) {
 toast.error(err?.data?.message)
   }
  };



const filteredProducts = products?.filter(
  (product) =>
     product.name.toLowerCase().includes(search.toLowerCase()) ||
       product.modelNo?.toLowerCase().includes(search.toLowerCase()) ||
            product.oum?.toLowerCase().includes(search.toLowerCase()) ||
            product.category?.toLowerCase().includes(search.toLowerCase()) 
);


//paginate logic
const offset = currentPage * productsPerPage;
const currentProducts = filteredProducts?.slice(
  offset,
  offset + productsPerPage
);
const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);

const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};




  return (
<div className="w-full mt-8 px-4">
   {categoryModal && <CategoryModel onClose={closeCategoryModal} />}
   {productModal && <CreateProduct onClose={closeProductModal}/>}
   {uomModal && <UomModel onClose={closeUomModal}/>}


        <div>
        <div className="flex items-center space-x-3">
          <button
           onClick={openCategoryModal}
         disabled={userInfo && !userInfo.isAdmin}

            className="px-5 bg-orange-600 p-2 font-bold rounded-3xl flex  flex-col hover:bg-orange-500 hover:text-black hover:font-bold hover:underline"
          >
           +  Add Category
           <span className="m-auto text-2xl font-bold">
            {categories && categories?.length}</span>
          </button>
       

        <button
         onClick={openProductModalHandler}
         disabled={userInfo && !userInfo.isAdmin}
          className="bg-blue-700 text-white p-2 px-5 font-bold flex flex-col rounded-3xl hover:bg-blue-500 hover:text-black hover:underline"
        >
          + Add Product 
          <span className="m-auto text-2xl font-bold ">
            {products && products?.length}</span>
        </button>


        <button
         onClick={openUomModal}
         disabled={userInfo && !userInfo.isAdmin}
          className="bg-green-600 text-white p-2 px-5 font-bold flex flex-col rounded-3xl hover:bg-green-500 hover:text-black hover:underline"
        >
          + Add UOM 
          <span className="m-auto text-2xl font-bold ">
            {Uom && Uom?.length}</span>
        </button>



        </div>
      </div>



<div className="flex items-center  m-4">
   <input
   type="text"
   placeholder="Search Name, ModelNo, Category or UOM"
   value={search}
   onChange={(e) => setSearch(e.target.value)}
   className="px-4 py-2 border rounded-md w-full text-slate-800 "
   />
   
</div>
       

        {isLoading ? (
          <div className="flex justify-center item-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
          </div>
        ) : isError ? (
            <p>{message}</p>
        ) : (
         <>
   <div className="overflow-x-auto">
        <table className="w-full bg-slate-200 text-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-3 border">NAME</th>
              <th className="py-2 px-3 border">CATEGORY</th>
              <th className="py-2 px-3 border">SUPPLIER</th>
             <th className="py-2 px-3 border">STOCK</th>

              <th className="py-2 px-3 border">MODEL NO</th>
              <th className="py-2 px-3 border">MANUFACTURER</th>
              <th className="py-2 px-3 border">UOM</th>


            </tr>
          </thead>
          <tbody>
            {currentProducts?.map((product)=> (
            <tr className="hover:underline hover:bg-blue-300 " key={product._id}>
              <td className="py-2 px-4 border">{product?.name}</td>
              <td className="py-2 px-4 border">{product?.category}</td>
              <td className="py-2 px-4 border">{product?.supplier}</td>
             
             <td className="py-2 px-4 border">{product?.stock}</td>

             <td className="py-2 px-4 border">
                {product?.modalNo ? product.modalNo : "N/A"}
                </td>
              <td className="py-2 px-4 border">{product?.manufacturer}</td>
              <td className="py-2 px-4 border">{product?.uom ? product.uom : "PCS"}</td>

 <td>
                      <button className="px-4 p-2 border bg-blue-600 text-white mr-4 rounded-2xl hover:bg-blue-400">
                        <Link to={`/edit/${product._id}`}>Edit</Link>
                      </button>
                    </td>
    
    
     <td>
                      <button onClick={() => deleteProductHandler(product._id)} className="px-4 p-2 border bg-red-600 text-white mr-4 rounded-2xl hover:bg-red-400">
                       <AiOutlineDelete size={28} />

                      </button>
                    </td>
    
    
    
    </tr>
          ))}
          </tbody>
        </table>
       </div>
          
          <ReactPaginate
             previousLabel={"Back"}
             breakLabel={"..."}
             pageCount={pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={handlePageClick}
             containerClassName={"flex justify-center mt-4 space-x-2"}
             pageClassName={"px-3 py-1 border rounded"}
             previousClassName={"px-3 py-1 border rounded"}
             nextClassName={"px-3 py-1 border rounded"}
             activeClassName={"bg-gray-200"}
          />
          
          </>
          
          
          )}
    </div>
  );
};
 
export default Dashboard;