import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ChatWindow({ conversation }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef();

    useEffect(() => {
        fetchMessages();
    }, [conversation]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(
                `/api/conversations/${conversation.id}/messages`
            );
            setMessages(res.data.data || []);
            scrollToBottom();
        } catch (err) {
            console.error('Error fetching messages', err);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        try {
            const userRes = await axios.post(
                `/api/conversations/${conversation.id}/messages`,
                { sender: 'user', content: input }
            );
            setMessages(prev => [...prev, userRes.data.data]);
            scrollToBottom();

            const botReply = `Echo: ${input}`;
            const botRes = await axios.post(
                `/api/conversations/${conversation.id}/messages`,
                { sender: 'bot', content: botReply }
            );
            setMessages(prev => [...prev, botRes.data.data]);
            scrollToBottom();
        } catch (err) {
            console.error('Error sending message', err);
        } finally {
            setInput('');
        }
    };

    const giveFeedback = async (msgId, feedback) => {
        try {
            const res = await axios.patch(
                `/api/conversations/${conversation.id}/messages/${msgId}/feedback`,
                { feedback }
            );
            setMessages(prev =>
                prev.map(m =>
                    m.id === msgId ? { ...m, feedback: res.data.data.feedback } : m
                )
            );
        } catch (err) {
            console.error('Error giving feedback', err);
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <h2>{conversation.title}</h2>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{ margin: '0.5rem 0' }}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}

                        {msg.sender === 'bot' && (
                            <span style={{ marginLeft: '1rem' }}>
                                <button
                                    onClick={() => giveFeedback(msg.id, 'like')}
                                    title="Like"
                                    style={{
                                        fontWeight: msg.feedback === 'like' ? 'bold' : 'normal',
                                        backgroundColor: msg.feedback === 'like' ? '#d4edda' : 'transparent',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '2px 6px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    👍
                                </button>
                                <button
                                    onClick={() => giveFeedback(msg.id, 'dislike')}
                                    title="Dislike"
                                    style={{
                                        fontWeight: msg.feedback === 'dislike' ? 'bold' : 'normal',
                                        backgroundColor: msg.feedback === 'dislike' ? '#f8d7da' : 'transparent',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '2px 6px',
                                        marginLeft: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    👎
                                </button>
                            </span>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div style={{ display: 'flex' }}>
                <input
                    style={{ flex: 1 }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}