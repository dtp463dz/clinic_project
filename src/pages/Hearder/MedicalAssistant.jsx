import ChatHistory from "./ChatHistory";
import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaHistory } from "react-icons/fa";
import "./MedicalAssistant.scss";
import {
    getConversations,
    getMessagesByConversationId,
    sendQuestion
} from "../../services/chatBotService";
import Header from "./Header";
import ChatMessage from "./ChatMessage";

const MedicalAssistant = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);

    const chatEndRef = useRef(null);
    const token = localStorage.getItem("accessToken");

    // Tự động cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    // Lấy danh sách các conversation
    const fetchConversations = async () => {
        try {
            const res = await getConversations(token);
            if (res.errCode === 0) {
                setConversations(res.data);
            }
        } catch (error) {
            console.error("Lỗi lấy danh sách cuộc trò chuyện:", error);
        }
    };

    // Load tin nhắn từ một conversation
    const loadConversationMessages = async (conversationId) => {
        try {
            const res = await getMessagesByConversationId(conversationId, token);
            if (res.errCode === 0) {
                // Map dữ liệu DB => format FE cần
                const formatted = res.data.flatMap(msg => [
                    { role: "user", text: msg.question },
                    { role: "model", text: msg.answer }
                ]);
                setChatHistory(formatted);
                setCurrentConversationId(conversationId);
                setShowHistory(false);
            }
        } catch (error) {
            console.error("Lỗi lấy tin nhắn:", error);
        }
    };

    // Gửi câu hỏi
    const handleSend = async () => {
        if (!message.trim()) return;

        // Thêm tin nhắn user ngay lập tức
        const userMsg = { role: "user", text: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage("");
        setIsLoading(true);

        try {
            const res = await sendQuestion(message, currentConversationId, token);
            if (res.errCode === 0) {
                const botMsg = { role: "model", text: res.data.answer };
                setChatHistory(prev => [...prev, botMsg]);

                // Nếu đây là tin đầu tiên → lưu conversationId mới
                if (!currentConversationId && res.data.conversationId) {
                    setCurrentConversationId(res.data.conversationId);
                }
            } else {
                setChatHistory(prev => [
                    ...prev,
                    { role: "model", text: "Lỗi xử lý yêu cầu", isError: true }
                ]);
            }
        } catch (error) {
            console.error("Lỗi gửi câu hỏi:", error);
            setChatHistory(prev => [
                ...prev,
                { role: "model", text: "Không thể kết nối đến chatbot", isError: true }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <Header />
            <div className="medical-assistant-container">
                {/* Nút mở lịch sử */}
                <button
                    className="history-toggle-btn"
                    onClick={() => {
                        if (!showHistory) fetchConversations();
                        setShowHistory(!showHistory);
                    }}
                >
                    <FaHistory /> Lịch sử
                </button>

                {/* Panel lịch sử */}
                {showHistory && (
                    <ChatHistory
                        data={conversations}
                        onClose={() => setShowHistory(false)}
                        onSelectConversation={loadConversationMessages}
                    />
                )}

                {/* Khung chat */}
                <div className="chat-box">
                    <div className="chat-header">
                        <FaRobot className="bot-icon" />
                        <h2>Trợ lý Y khoa</h2>
                    </div>

                    <div className="chat-body">
                        {/* Lời chào mặc định */}
                        {chatHistory.length === 0 && (
                            <div className="chat-message model">
                                <div className="chat-avatar"><FaRobot /></div>
                                <div className="chat-text">
                                    Xin chào! Bạn có thể hỏi tôi về bệnh, thuốc hoặc dịch vụ y tế.
                                </div>
                            </div>
                        )}

                        {/* Render lịch sử */}
                        {chatHistory.map((chat, idx) => (
                            <ChatMessage
                                key={idx}
                                role={chat.role}
                                text={chat.text}
                                isError={chat.isError}
                            />
                        ))}


                        {/* Loading */}
                        {isLoading && (
                            <div className="chat-message model">
                                <div className="chat-avatar"><FaRobot /></div>
                                <div className="chat-text">Đang xử lý...</div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Nhập tin nhắn */}
                    <div className="chat-footer">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Nhập câu hỏi hoặc yêu cầu..."
                        />
                        <button onClick={handleSend} disabled={isLoading}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MedicalAssistant;
