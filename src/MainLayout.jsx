import { Outlet } from 'react-router-dom';
import Header from './pages/Hearder/Header';
import Slogan from './components/HomePage/Slogan';
import Footer from './components/HomePage/News/Footer';

const MainLayout = () => {
    return (
        <>
            <Slogan />
            <Header />
            <main >
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
