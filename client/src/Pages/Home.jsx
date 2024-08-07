// import { useLoaderData } from "react-router-dom";
import Carusol from "../components/Carusol";
// import Slider from "../components/Slider";
import TabCatagories from "../components/TabCatagories";


const Home = () => {
    // const jobs = useLoaderData()
    // console.log(jobs)
    return (
        <div className="mb-12">
           {/* <Slider></Slider> */}
           <Carusol></Carusol>
           <TabCatagories></TabCatagories>
        </div>
    );
};

export default Home;