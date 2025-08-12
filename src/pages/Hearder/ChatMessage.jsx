// src/components/ChatMessage.jsx
import { FaRobot, FaUser } from "react-icons/fa";

// Hàm convert markdown cơ bản sang HTML
const simpleMarkdownToHtml = (text) => {
    if (!text) return "";

    // Escape HTML để tránh XSS
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Danh sách số (1. 2. ...)
    html = html.replace(/^\d+\.\s+(.*)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gs, "<ol>$1</ol>");

    // Danh sách bullet (- hoặc *)
    html = html.replace(/^[-*]\s+(.*)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

    // Xuống dòng
    html = html.replace(/\n/g, "<br>");

    return html;
};

const ChatMessage = ({ role, text, isError }) => {
    return (
        <div className={`chat-message ${role}`}>
            <div className="chat-avatar">
                {role === "user" ? <FaUser /> : <FaRobot />}
            </div>
            {role === "model" ? (
                <div
                    className={`chat-text ${isError ? "error" : ""}`}
                    dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(text) }}
                />
            ) : (
                <div className={`chat-text ${isError ? "error" : ""}`}>{text}</div>
            )}
        </div>
    );
};

export default ChatMessage;
