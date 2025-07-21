import './HomeFooter.scss';
import { FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { SiZalo } from "react-icons/si";

const HomeFooter = () => {
    return (
        <footer className="home-footer">
            <div className="footer-top">
                <div className="footer-col">
                    <h4>CÔNG TY TNHH BOOKING HEALTH VIỆT NAM</h4>
                    <p><strong>VPĐD:</strong> Đại Học Phenikaa</p>
                    <p><strong>Hotline:</strong> 123456 (8:00 - 17:30 từ T2 đến T7)</p>
                    <p>Chịu trách nhiệm nội dung: Hệ Thống Booking Health</p>
                    <div className="social-icons">
                        <FaFacebookF />
                        <FaYoutube />
                        <FaLinkedinIn />
                        <SiZalo />
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Về Booking Health</h4>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Ban điều hành</li>
                        <li>Tuyển dụng</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Dịch vụ</h4>
                    <ul>
                        <li>Đặt khám Bác sĩ</li>
                        <li>Đặt khám Bệnh viện</li>
                        <li>Đặt khám Phòng Khám</li>
                        <li>Booking Health 360</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Hỗ trợ</h4>
                    <ul>
                        <li>Điều khoản sử dụng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách khiếu nại</li>
                        <li>Hỗ trợ: cskh@bookinghealth.vn</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    Các thông tin trên Booking Health chỉ dành cho mục đích tham khảo, không thay thế chẩn đoán hoặc điều trị y khoa.
                    Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.
                </p>
                <p>Copyright © 2025 Booking Health </p>
            </div>
        </footer>
    );
};

export default HomeFooter;
