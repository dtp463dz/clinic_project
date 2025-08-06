import axios from "../utils/axios.jsx";

const getMessages = async (fromUserId, toUserId, accessToken) => {
    return axios.get(`/api/messages?to=${toUserId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

const sendMessage = async (fromUserId, toUserId, content, accessToken) => {
    return axios.post(
        `/api/messages`,
        { to: toUserId, content },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

// danh sách tin nhắn
const getConversations = async (accessToken, doctorId) => {
    try {
        const response = await axios.get(`/api/conversations?doctorId=${doctorId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response;
    } catch (error) {
        console.error('chatService: getConversations error:', error);
        throw error;
    }
};
export {
    getMessages, sendMessage, getConversations
}