import "./App.css";
import "./responsive.css";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRouter from "./PrivateRouter";
import SingleProduct from "./screens/SingleProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<SingleProduct />} />

      {/* <Route path="/search/:keyword" element={HomeScreen} /> */}
      {/* <Route path="/page/:pagenumber" element={HomeScreen} /> */}
      {/* <Route path="/search/:keyword/page/:pageNumber" element={HomeScreen} /> */}
      <Route element={<PrivateRouter />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
