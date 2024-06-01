import { useState } from "react";
import Calendar from "./Components/fullcalendar";
import SignupPage from "./Components/signup.jsx";
import Authentication from "./Components/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Calendar />,
    },
    {
      path: "/login",
      element: <Authentication pageType="login" />,
    },
    {
      path: "/signup",
      element: <Authentication pageType="signup" />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
