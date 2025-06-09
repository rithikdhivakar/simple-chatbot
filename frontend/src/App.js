import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);

  // Load conversations
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const res = await axios.get('/api/conversations');
    setConversations(res.data);
    if (!activeConv && res.data.length) {
      setActiveConv(res.data[0]);
    }
  };

  const createConversation = async () => {
    const res = await axios.post('/api/conversations');
    setConversations([res.data, ...conversations]);
    setActiveConv(res.data);
  };

  // Rename a conversation
  const renameConversation = async (id, newTitle) => {
    await axios.put(`/api/conversations/${id}`, { title: newTitle });
    setConversations(convos =>
        convos.map(c => c.id === id ? { ...c, title: newTitle } : c)
    );
    if (activeConv.id === id) {
      setActiveConv(c => ({ ...c, title: newTitle }));
    }
  };

// Delete a conversation
  const deleteConversation = async (id) => {
    await axios.delete(`/api/conversations/${id}`);
    setConversations(convos => convos.filter(c => c.id !== id));
    if (activeConv.id === id) {
      // switch to the first remaining or null
      const remaining = conversations.filter(c => c.id !== id);
      setActiveConv(remaining[0] || null);
    }
  };

  // Give feedback on a message
  const giveFeedback = async (msgId, feedback) => {
    const res = await axios.patch(
        `/api/conversations/${activeConv.id}/messages/${msgId}/feedback`,
        { feedback }
    );
    // update local messages
    setMessages(msgs =>
        msgs.map(m => m.id === msgId ? { ...m, feedback } : m)
    );
  };

  return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <ChatList
            conversations={conversations}
            activeConv={activeConv}
            onNew={createConversation}
            onSelect={setActiveConv}
            onRename={renameConversation}
            onDelete={deleteConversation}
        />
        {activeConv && (
            <ChatWindow
                conversation={activeConv}
                giveFeedback={giveFeedback}
            />
        )}
      </div>
  );
}

export default App;