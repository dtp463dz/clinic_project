import HomeHeader from "./HomeHeader";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";
import Slogan from "./Slogan";
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
const HomePage = () => {

    // setting slider
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // hien thi options
        slidesToScroll: 1, // số lần next 
    };
    return (
        <div>
            <Slogan />
            <HomeHeader />
            <Specialty settings={settings} />
            <MedicalFacility settings={settings} />
            <OutStandingDoctor settings={settings} />
            <HandBook />
            <About />
            <HomeFooter />
            <div style={{ height: '300px' }}></div>
        </div>
    )
}

// truyen redux

export default HomePage;