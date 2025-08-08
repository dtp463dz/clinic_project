import Footer from "./Footer"
import HeaderNews from "./HeaderNews/HeaderNews"
import MedicalDictionary from "./MedicalDictionary/MedicalDictionary"
import NewsBody from "./NewsContent/NewsBody"

const HomeNews = () => {
    return (
        <>
            <HeaderNews />
            <NewsBody />
            <MedicalDictionary />
            <Footer />

        </>
    )
}

export default HomeNews