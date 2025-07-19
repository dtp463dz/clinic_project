import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Hệ thống Y tế</h3>
                    <p>Cung cấp thông tin y tế đáng tin cậy và hỗ trợ sức khỏe cộng đồng.</p>
                    <p>Email: support@healthsystem.com</p>
                    <p>Điện thoại: 1800-123-456</p>
                </div>
                <div className="footer-section">
                    <h3>Liên kết nhanh</h3>
                    <ul>
                        <li><a href="/symptoms">Triệu chứng</a></li>
                        <li><a href="/drugs">Thuốc</a></li>
                        <li><a href="/herbs">Dược liệu</a></li>
                        <li><a href="/bodyParts">Bộ phận cơ thể</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Theo dõi chúng tôi</h3>
                    <div className="social-links">
                        <a href="https://facebook.com/healthsystem" target="_blank" rel="noopener noreferrer">
                            <span>Facebook</span>
                        </a>
                        <a href="https://twitter.com/healthsystem" target="_blank" rel="noopener noreferrer">
                            <span>Twitter</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Hệ thống Đặt lịch Khám Bệnh. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;