import { Spinner } from 'react-bootstrap';

const FullScreenSpinner = ({ message = "Đang tải dữ liệu..." }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050
        }}>
            <Spinner animation="border" variant="primary" />
            <div style={{ marginTop: 10, color: '#333', fontSize: 16 }}>{message}</div>
        </div>
    );
};

export default FullScreenSpinner;
