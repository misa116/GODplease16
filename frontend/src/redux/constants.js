 //export const BASE_URL = "";

//export const USERS_URL = "/api/users";
//export const PRODUCTS_URL = "/api/products";
//export const ORDERS_URL = "/api/orders";
//export const CATEGORY_URL = "/api/category";
//export const UOM_URL = "/api/uom";





//export const BASE_URL = import.meta.env.VITE_API_URL || "";

//export const USERS_URL = `${BASE_URL}/api/users`;
//export const PRODUCTS_URL = `${BASE_URL}/api/products`;
//export const ORDERS_URL = `${BASE_URL}/api/orders`;
//export const CATEGORY_URL = `${BASE_URL}/api/category`;
//export const UOM_URL = `${BASE_URL}/api/uom`;


//export const BASE_URL = import.meta.env.VITE_API_URL || "";

//console.log("✅ BASE_URL:", BASE_URL); // <--- ADD THIS




export const BASE_URL = process.env.REACT_APP_API_URL || "";
console.log("✅ BASE_URL:", BASE_URL);

export const USERS_URL = `${BASE_URL}/api/users`;
export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const UOM_URL = `${BASE_URL}/api/uom`; // ✅ Add this if missing

/*/
export const BASE_URL = "";

export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const ORDERS_URL = "/api/orders";
export const CATEGORY_URL = "/api/category";/*/