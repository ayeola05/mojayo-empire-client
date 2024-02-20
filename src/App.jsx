import "./App.css";
import "./responsive.css";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRouter from "./PrivateRouter";
import SingleProduct from "./screens/SingleProduct";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/cart/:id?" element={<CartScreen />} />

      {/* <Route path="/search/:keyword" element={HomeScreen} /> */}
      {/* <Route path="/page/:pagenumber" element={HomeScreen} /> */}
      {/* <Route path="/search/:keyword/page/:pageNumber" element={HomeScreen} /> */}
      <Route element={<PrivateRouter />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
