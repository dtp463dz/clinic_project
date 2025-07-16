import SearchBar from './SearchBar';
import './SearchHero.scss';
const SearchHero = () => {
    return (
        <section className="search-hero">
            <div className="search-hero__content">
                <div className="search-hero__text">
                    <h1>Ứng dụng đặt khám</h1>
                    <p>
                        Đặt khám với hơn 100 bác sĩ, 20 bệnh viện, 50 phòng khám trên Booking Health<br />
                        để có số thứ tự và khung giờ khám trước.
                    </p>
                </div>

                <div className="search-hero__search">
                    <SearchBar />
                </div>
            </div>
        </section>
    );
};

export default SearchHero;
