import { Route, Routes } from 'react-router-dom'
//components
import Navbar from "./components/Navbar";
//sass files
import "./index.scss";
import "./App.scss";
//pages
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from './pages/ProductDetails';
import Orders from "./pages/Orders";
import { AuthProvider } from "./context/AuthContext";
import NotFound from './pages/NotFound';
import OrderDetails from './pages/OrderDetails';

const App = () => {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route index element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/orders/:id" element={<OrderDetails/>}/>
                        <Route path="/products/:id" element={<ProductDetails/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </div>
            </AuthProvider>
        </>
    );
};

export default App;