import { React, ReactDOM } from "./whichReact";
import "./index.css";
import jsx from "./pages/ExamplePage";

ReactDOM.render(jsx, document.getElementById("root"));
// ReactDOM.createRoot(document.getElementById("root")).render(<SetStatePage />);

console.log("React", React.version); //sy-log
