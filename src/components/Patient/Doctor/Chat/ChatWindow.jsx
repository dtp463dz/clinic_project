import { useSelector } from "react-redux";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import useChat from "../../../../hooks/useChat";
import './ChatWindow.scss';
import { toast } from 'react-toastify';

const ChatWindow = ({ doctorId, doctorName, onClose }) => {
    const { account, isAuthenticated } = useSelector((state) => state.user);

    // Sử dụng custom hook
    const { messages, newMessage, setNewMessage, handleSendMessage, handleKeyPress, messageEndRef } = useChat({
        fromUserId: account.id,
        toUserId: doctorId,
        accessToken: account.accessToken,
        isAuthenticated
    });
    // Kiểm tra doctorId và accessToken
    if (!doctorId) {
        toast.error('Không tìm thấy ID bác sĩ');
        return null;
    }
    if (!account.accessToken) {
        toast.error('Không tìm thấy token xác thực');
        return null;
    }
    if (!isAuthenticated) {
        toast.error('Vui lòng đăng nhập để sử dụng chức năng chat');
        return (
            <div className="chat-window">
                <div className="chat-header">
                    <h3>Chat với {doctorName}</h3>
                    <FaTimes className="close-icon" onClick={onClose} />
                </div>
                <div className="chat-body">
                    <p>Vui lòng đăng nhập để sử dụng chức năng chat.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>Chat với {doctorName}</h3>
                <FaTimes className="close-icon" onClick={onClose} />
            </div>
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.senderId === account.id ? 'sent' : 'received'}`}
                    >
                        <p>{msg.content}</p>
                        <span className="timestamp">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={handleSendMessage}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    )
}

export default ChatWindow