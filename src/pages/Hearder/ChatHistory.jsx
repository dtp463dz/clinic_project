import { FaHistory, FaTimes, FaUser, FaRobot } from "react-icons/fa";
import "./ChatHistory.scss";

const ChatHistory = ({ data, onClose, onSelectHistory }) => {
    return (
        <div className="history-panel">
            <div className="history-header">
                <h3><FaHistory /> Lịch sử trò chuyện</h3>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
            </div>
            <div className="history-content">
                {data.length === 0 ? (
                    <p className="empty-history">Chưa có lịch sử chat</p>
                ) : (
                    data.map((chat, idx) => (
                        <div
                            key={idx}
                            className="history-item"
                            onClick={() => onSelectHistory(chat.question)} // click để tiếp tục
                        >
                            <div className="history-question">
                                <FaUser /> {chat.question}
                            </div>
                            <div className="history-answer">
                                <FaRobot /> {chat.answer}
                            </div>
                            <div className="history-time">
                                {new Date(chat.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatHistory;
