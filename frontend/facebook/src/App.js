import logo from "./logo.svg";
import Authentication from "./components/Authentication";
import Home from "./components/Home";

import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";

function App() {
  return (
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/about">About</Link>
    //         </li>
    //         <li>
    //           <Link to="/users">Users</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     {/* A <Switch> looks through its children <Route>s and
    //       renders the first one that matches the current URL. */}
    //     <Navigate>
    //       <Route path="/">
    //         <Authentication />
    //       </Route>
    //     </Navigate>
    //   </div>
    // </Router>
    //<Authentication dummy={Math.random()}></Authentication>
    <Authentication></Authentication>
  );
}

export default App;
