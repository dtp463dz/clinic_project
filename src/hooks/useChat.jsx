import { useEffect, useState, useRef } from "react";
import { getMessages, sendMessage } from "../services/chatService";
import { toast } from "react-toastify";

const useChat = ({ fromUserId, toUserId, accessToken, isAuthenticated }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    // Lấy tin nhắn và polling chỉ khi toUserId hợp lệ
    useEffect(() => {
        let intervalId;
        if (isAuthenticated && fromUserId && toUserId && accessToken) {
            const fetchMessagesData = async () => {
                try {
                    const response = await getMessages(fromUserId, toUserId, accessToken);
                    if (response.errCode === 0) {
                        setMessages(response.data || []);
                    } else {
                        toast.error(response.errMessage || 'Lỗi khi lấy tin nhắn');
                    }
                } catch (error) {
                    console.error('getMessages error:', error);
                    toast.error('Không thể lấy tin nhắn');
                }
            };
            fetchMessagesData();
            intervalId = setInterval(fetchMessagesData, 5000);
        } else {
            console.log('useChat: Skipping fetch messages, missing params', { isAuthenticated, fromUserId, toUserId, accessToken });
        }
        return () => clearInterval(intervalId);
    }, [isAuthenticated, fromUserId, toUserId, accessToken]);
    // Tự động cuộn xuống tin nhắn mới
    useEffect(() => {
        if (messages.length > 0) {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Gửi tin nhắn
    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            toast.error('Vui lòng nhập nội dung tin nhắn');
            return;
        }
        if (!fromUserId || !toUserId || !isAuthenticated || !accessToken) {
            toast.error('Không thể gửi tin nhắn: Thiếu thông tin');
            return;
        }

        try {
            const response = await sendMessage(fromUserId, toUserId, newMessage, accessToken);
            if (response.errCode === 0) {
                setMessages([...messages, response.data]);
                setNewMessage('');
            } else {
                toast.error(response.errMessage || 'Lỗi khi gửi tin nhắn');
            }
        } catch (error) {
            console.error('sendMessage error:', error);
            toast.error('Không thể gửi tin nhắn');
        }
    };

    // Xử lý nhấn Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return {
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        handleKeyPress,
        messageEndRef
    };
};

export default useChat;