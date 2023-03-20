import { ProductList } from "./components/products/productList";
import { ProductDetails } from "./components/products/productDetails";
import { MyCart } from "./components/products/myCart";

export const Routes = () => [
    { path: '', element: <ProductList /> },
    { path: 'products/:productId', element: <ProductDetails /> },
    { path: 'cart', element: <MyCart /> }
];