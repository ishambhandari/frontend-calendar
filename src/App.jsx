import { useState } from "react";
import Calendar from "./Components/fullcalendar";
import Authentication from "./Components/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventCRUD from "./Components/Events.jsx";

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
    {
      path: "/events",
      element: <EventCRUD />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
