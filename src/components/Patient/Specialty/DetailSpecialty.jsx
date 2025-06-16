import { useParams } from "react-router-dom";
import Slogan from "../../HomePage/Slogan";
import HomeHeader from "../../HomePage/HomeHeader";

const DetailSpecialty = () => {
    const { id } = useParams(); // Lấy id từ URL
    console.log('check id', id)
    return (
        <>
            <Slogan />
            <HomeHeader />
            <div>this is detai {id}</div>

        </>
    )
}

export default DetailSpecialty;