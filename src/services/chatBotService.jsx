import axios from "../utils/axios.jsx";

// Gửi câu hỏi lên chatbot
const sendQuestion = async (question, accessToken) => {
    return axios.post(
        `/api/chatbot`,
        { question },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

// Lấy lịch sử trò chuyện với chatbot
const getChatHistory = async (accessToken) => {
    try {
        const response = await axios.get(`/api/chatbot/history`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    } catch (error) {
        console.error('chatBotService: getChatHistory error:', error);
        throw error;
    }
};

export {
    sendQuestion,
    getChatHistory
};
