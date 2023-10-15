import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Root.jsx';
import UpdateUser from './components/UpdateUser.jsx';
import AddUser from './components/AddUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
        loader: () => fetch('http://localhost:5000/users')
      },
      {
        path: "/add-user",
        element: <AddUser />
      },
      {
        path: "/update-user/:id",
        element: <UpdateUser />,
        loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>,
)
