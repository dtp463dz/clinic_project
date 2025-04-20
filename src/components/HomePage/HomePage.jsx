import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Slogan from "./Slogan";

const HomePage = () => {
    return (
        <div>
            <Slogan />
            <HomeHeader />
            <Specialty />

            <div style={{ height: '300px' }}></div>
        </div>
    )
}

// truyen redux

export default HomePage;