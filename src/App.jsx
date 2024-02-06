import "./App.css";
import "./responsive.css";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search/:keyword" component={HomeScreen} />
      <Route path="/page/:pagenumber" component={HomeScreen} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        component={HomeScreen}
        exact
      />
    </Routes>
  );
}

export default App;
