import { FaHistory, FaTimes } from "react-icons/fa";
import "./ChatHistory.scss";

const ChatHistory = ({ data, onClose, onSelectConversation }) => {
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
                    data.map((conv) => (
                        <div
                            key={conv.id}
                            className="history-item"
                            onClick={() => onSelectConversation(conv.id)}
                        >
                            <div className="history-title">{conv.title || `Cuộc trò chuyện #${conv.id}`}</div>
                            <div className="history-time">
                                {new Date(conv.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatHistory;
