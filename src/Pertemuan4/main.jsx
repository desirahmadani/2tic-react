import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter.jsx";
import ResponsiveDesign from "./ResponsiveDesign.jsx";

createRoot(document.getElementById("root")).render(
  <div>
    {/* <FrameworkList /> */}
    {/* <FrameworkListSearchFilter /> */}
    <ResponsiveDesign/>
  </div>
);