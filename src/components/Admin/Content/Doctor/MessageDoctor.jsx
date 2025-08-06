import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getConversations } from "../../../../services/chatService";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import useChat from "../../../../hooks/useChat";
import './MessageDoctor.scss';

const MessageDoctor = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { account, isAuthenticated } = useSelector((state) => state.user);

    // Memoize useChat hook để tránh tạo lại object mới
    const chatProps = useMemo(() => ({
        fromUserId: account.id,
        toUserId: selectedPatient?.id,
        accessToken: account.accessToken,
        isAuthenticated
    }), [account.id, selectedPatient?.id, account.accessToken, isAuthenticated]);
    const { messages, newMessage, setNewMessage, handleSendMessage, handleKeyPress, messageEndRef } = useChat(chatProps);

    // Lấy danh sách cuộc hội thoại
    useEffect(() => {
        if (!isAuthenticated || !account.accessToken || !account.id) {
            if (!account.accessToken) {
                toast.error('Không tìm thấy token xác thực');
            }
            if (!account.id) {
                toast.error('Không tìm thấy ID bác sĩ');
            }
            return;
        }
        let isMounted = true;
        const fetchConversationsData = async () => {
            try {
                const response = await getConversations(account.accessToken, account.id);
                if (isMounted && response.errCode === 0) {
                    const conversationsData = response.data || [];
                    setConversations(conversationsData);
                } else if (isMounted) {
                    toast.error(response.errMessage || 'Lỗi khi lấy danh sách cuộc hội thoại');
                }
            } catch (error) {
                if (isMounted) {
                    console.error('getConversations error:', error);
                    toast.error('Không thể lấy danh sách cuộc hội thoại');
                }
            }
        };
        fetchConversationsData();
        return () => {
            isMounted = false; // Cleanup khi component unmount
        };
    }, [isAuthenticated, account.accessToken, account.id]);

    // Cập nhật danh sách hội thoại sau khi gửi tin nhắn
    useEffect(() => {
        if (!isAuthenticated || !account.accessToken || !account.id || messages.length === 0) return;

        let isMounted = true;
        const fetchConversationsData = async () => {
            try {
                const response = await getConversations(account.accessToken, account.id);
                if (isMounted && response.errCode === 0) {
                    const conversationsData = response.data || [];
                    setConversations(conversationsData);
                } else if (isMounted) {
                    toast.error(response.errMessage || 'Lỗi khi lấy danh sách cuộc hội thoại');
                }
            } catch (error) {
                if (isMounted) {
                    console.error('getConversations error:', error);
                    toast.error('Không thể lấy danh sách cuộc hội thoại');
                }
            }
        };
        fetchConversationsData();

        return () => {
            isMounted = false;
        };
    }, [messages, isAuthenticated, account.accessToken, account.id]);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    return (
        <div className="message-doctor-container">
            <div className="patient-list">
                <h3>Danh sách bệnh nhân</h3>
                {conversations.length > 0 ? (
                    <ul>
                        {conversations.map((patient) => (
                            <li
                                key={patient.id}
                                className={`patient-item ${selectedPatient?.id === patient.id ? 'active' : ''}`}
                                onClick={() => handleSelectPatient(patient)}
                            >
                                <span>{patient.firstName} {patient.lastName || ''}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Chưa có cuộc hội thoại nào.</p>
                )}
            </div>
            <div className="chat-section">
                {selectedPatient ? (
                    <>
                        <div className="chat-header">
                            <h3>Chat với {`${selectedPatient.firstName} ${selectedPatient.lastName || ''}`}</h3>
                            <FaTimes className="close-icon" onClick={() => setSelectedPatient(null)} />
                        </div>
                        <div className="chat-body">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`message ${msg.senderId === account.id ? 'sent' : 'received'}`}
                                    >
                                        <p>{msg.content}</p>
                                        <span className="timestamp">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                                    </div>
                                ))
                            ) : (
                                <p>Chưa có tin nhắn nào.</p>
                            )}
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
                    </>
                ) : (
                    <div className="no-chat">
                        <p>Vui lòng chọn một bệnh nhân để bắt đầu nhắn tin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageDoctor;