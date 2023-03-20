import { CartContextProvider } from "./context/cartContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Routes as AuthorizedRoutes } from "./routes";

export const App = () =>   
    <CartContextProvider>
        <BrowserRouter>
            <Link to="/" className="text-decoration-none">
                <div className="container">
                    <header className="row text-white bg-dark fs-5 p-2 py-3">Store</header>
                </div>
            </Link>
            <Routes>
                <Route>
                {
                    AuthorizedRoutes().map((route, index) => <Route key={index} {...route} />)
                }
                </Route>
            </Routes>
        </BrowserRouter>
    </CartContextProvider>;