import Carusol from "../components/Carusol";
import FreelanceService from "../components/FreelanceService";
import ServicesSlider from "../components/ServicesSlider/ServicesSlider";
import TabCatagories from "../components/TabCatagories";

const Home = () => {
    return (
        <div className="mb-12">
           {/* <Slider></Slider> */}
           <Carusol></Carusol>
           <TabCatagories></TabCatagories>
           <ServicesSlider></ServicesSlider>
           <FreelanceService></FreelanceService>
        </div>
    );
};

export default Home;