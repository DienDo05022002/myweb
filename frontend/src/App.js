import { BrowserRouter, Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomeScreen from './screens/home/HomeScreen';
import ProductScreen from './screens/product/ProductScreen';
import NavBar from './layout/NavBar';
import Search from './layout/Search';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './screens/client/auth/Login';
import Register from './screens/client/auth/Register';
import CartScreen from './screens/cart/CartScreen';
import ShipScreen from './screens/pay/ShipScreen';
import PaymentScreen from './screens/pay/PaymentScreen';
import PlaceOrderScreen from './screens/pay/PlaceOrderScreen';
import Footer from './layout/Footer';
import SlideShow from './layout/SlideShow';
import HistoryOrders from './screens/client/ordersUser/HistoryOrders';
import AdminLogin from './screens/admin/AdminLogin';
import DashBoard from './screens/admin/DashBoard';
import Thankyou from './screens/Thankyou';
import OrderScreen from './screens/client/ordersUser/OrderScreen';
import ProfileUser from './screens/client/ProfileUser';
import AdminPageProducts from './screens/admin/productsAM/AdminPageProducts.js';
import Create from './screens/admin/productsAM/Create';
import AdminPageUsers from './screens/admin/usersAM/AdminPageUsers';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <NavBar />
        {/* <div>
          <SlideShow/>
        </div> */}
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/product/:slug" element={<ProductScreen />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cart" element={<CartScreen />}></Route>
          <Route path="/ship-address" element={<ShipScreen />}></Route>
          <Route path="/payment" element={<PaymentScreen />}></Route>
          <Route path="/place-order" element={<PlaceOrderScreen />}></Route>
          <Route path="/history-order" element={<HistoryOrders />}></Route>
          <Route path="/order/:id" element={<OrderScreen />}></Route>
          <Route path="/profile" element={<ProfileUser />}></Route>
          <Route path="/thankyou" element={<Thankyou />}></Route>
          <Route path="/search" element={<Search />}></Route>

          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route path="/dash-board" element={<DashBoard />}></Route>
          <Route path="/admin-page/products" element={<AdminPageProducts />}></Route>
          <Route path="/admin-page/users" element={<AdminPageUsers />}></Route>
          <Route path="/admin-page/create" element={<Create />}></Route>
          
        </Routes>
        <footer>
          <Footer/>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
