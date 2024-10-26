import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import JobDetails from "../Pages/JobDetails";
import AddJob from "../Pages/AddJob";
import ErrorPage from "../Pages/ErrorPage";
import MyPostedJobs from "../Pages/MyPostedJobs";
import MyUpdateJob from "../Pages/MyUpdateJob";
import PrivetRoute from "./PrivetRoute";
import MyBids from "../Pages/MyBids";
import BidRequests from "../Pages/BidRequests";
import AllJobs from "../Pages/AllJobs";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>    
        },
        {
          path: '/registration',
          element: <Register></Register>  
        },
        {
          path: '/job/:id',
          element: <PrivetRoute><JobDetails></JobDetails></PrivetRoute>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        },
        {
          path: '/add-job',
          element: <PrivetRoute><AddJob></AddJob></PrivetRoute>
        },
        {
          path: '/my-posted-job',
          element: <PrivetRoute><MyPostedJobs></MyPostedJobs></PrivetRoute>
        },
        {
          path: '/update/:id',
          element: <PrivetRoute><MyUpdateJob></MyUpdateJob></PrivetRoute>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        },
        {
          path: '/my-bids',
          element: <PrivetRoute><MyBids></MyBids></PrivetRoute>
        },
        {
          path: '/bid-requests',
          element: <PrivetRoute><BidRequests></BidRequests></PrivetRoute>
        },
        {
          path: '/jobs',
          element: <AllJobs></AllJobs>
        }
      ]
    },
  ]);

  export default router;