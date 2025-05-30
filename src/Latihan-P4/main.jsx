import { createRoot } from "react-dom/client";
import "./tailwind.css";
import ListProduct from "./ListProducts";

createRoot(document.getElementById("root")).render(
  <div>
    <ListProduct/>
  </div>
);