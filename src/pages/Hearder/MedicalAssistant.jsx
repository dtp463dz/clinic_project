import ChatHistory from "./ChatHistory";
import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaHistory } from "react-icons/fa";
import "./MedicalAssistant.scss";
import { getChatHistory, sendQuestion } from "../../services/chatBotService";

const MedicalAssistant = () => {
    const [chatHistory, setChatHistory] = useState([
        { role: "model", text: "Xin chào! Tôi là Trợ lý Y khoa. Bạn có thể hỏi tôi về bệnh, thuốc hoặc dịch vụ y tế." }
    ]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const chatEndRef = useRef(null);
    const token = localStorage.getItem("accessToken");

    const fetchHistory = async () => {
        try {
            const res = await getChatHistory(token);
            if (res.errCode === 0) {
                const chats = res.data.map(item => ({
                    question: item.question,
                    answer: item.answer,
                    timestamp: item.timestamp
                }));
                setHistoryData(chats);
            }
        } catch (error) {
            console.error("Lỗi lấy lịch sử chat:", error);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleSend = async () => {
        if (!message.trim()) return;
        const userMsg = { role: "user", text: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage("");
        setIsLoading(true);

        try {
            const res = await sendQuestion(message, token);
            if (res.errCode === 0) {
                const botMsg = { role: "model", text: res.data.answer };
                setChatHistory(prev => [...prev, botMsg]);
            } else {
                setChatHistory(prev => [...prev, { role: "model", text: "Lỗi xử lý yêu cầu", isError: true }]);
            }
        } catch (error) {
            console.error("Lỗi gửi câu hỏi:", error);
            setChatHistory(prev => [...prev, { role: "model", text: "Không thể kết nối đến chatbot", isError: true }]);
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

    // Hàm này sẽ được gọi khi click lịch sử
    const handleSelectHistory = (question) => {
        setMessage(question);
        setShowHistory(false); // đóng panel
    };

    return (
        <div className="medical-assistant-container">
            <button
                className="history-toggle-btn"
                onClick={() => {
                    if (!showHistory) fetchHistory();
                    setShowHistory(!showHistory);
                }}
            >
                <FaHistory /> Lịch sử
            </button>

            {showHistory && (
                <ChatHistory
                    data={historyData}
                    onClose={() => setShowHistory(false)}
                    onSelectHistory={handleSelectHistory} // truyền callback
                />
            )}

            <div className="chat-box">
                <div className="chat-header">
                    <FaRobot className="bot-icon" />
                    <h2>Trợ lý Y khoa</h2>
                </div>

                <div className="chat-body">
                    {chatHistory.map((chat, idx) => (
                        <div key={idx} className={`chat-message ${chat.role}`}>
                            <div className="chat-avatar">
                                {chat.role === "user" ? <FaUser /> : <FaRobot />}
                            </div>
                            <div className={`chat-text ${chat.isError ? "error" : ""}`}>{chat.text}</div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-message model">
                            <div className="chat-avatar"><FaRobot /></div>
                            <div className="chat-text">Đang xử lý...</div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

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
    );
};

export default MedicalAssistant;
