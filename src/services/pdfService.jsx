import axios from "../utils/pdfAxios.jsx";

// gui pdf
const getPatientPdf = async (bookingId) => {
    // return axios.get(`/api/generate-patient-pdf?bookingId=${bookingId}`);
    try {
        if (!bookingId) {
            throw new Error('bookingId không hợp lệ');
        }
        console.log('Gửi yêu cầu API PDF với bookingId:', bookingId); // Debug bookingId
        const response = await axios.get(`/api/generate-patient-pdf?bookingId=${bookingId}`, {
            responseType: 'blob'
        });
        const contentType = response.headers['content-type'] || 'unknown';
        console.log('Phản hồi API PDF:', {
            status: response.status,
            headers: response.headers,
            contentType: contentType,
            dataSize: response.data ? `Blob size: ${response.data.size} bytes` : 'response.data is undefined'
        }); // Debug response
        if (!response.data) {
            throw new Error('Phản hồi API không chứa dữ liệu');
        }
        // Kiểm tra nếu phản hồi là JSON
        if (contentType.includes('application/json')) {
            const text = await response.data.text();
            console.log('Nội dung JSON lỗi:', text); // Log nội dung JSON
            throw new Error(`Phản hồi là JSON thay vì PDF: ${text}`);
        }
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API PDF:', error);
        throw error;
    }
}
export {
    getPatientPdf
} 