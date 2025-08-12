import axios from "../utils/axios.jsx";

// Lấy danh sách các cuộc trò chuyện
const getConversations = async (accessToken) => {
    return axios.get(`/api/chatbot/conversations`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
};

// Lấy tin nhắn của một cuộc trò chuyện cụ thể
const getMessagesByConversationId = async (conversationId, accessToken) => {
    return axios.get(`/api/chatbot/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
};

// Gửi câu hỏi vào chatbot (có thể kèm conversationId)
const sendQuestion = async (question, conversationId, accessToken) => {
    return axios.post(
        `/api/chatbot`,
        { question, conversationId },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export {
    getConversations,
    getMessagesByConversationId,
    sendQuestion
};
