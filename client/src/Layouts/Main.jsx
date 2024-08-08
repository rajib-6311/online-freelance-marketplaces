import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer/Footer";


const Main = () => {
    return (
        <div>
           <NavBar></NavBar>

           <div className="">
           <Outlet></Outlet>
           </div>

           <Footer></Footer>
        </div>
    );
};

export default Main;