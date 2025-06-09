import React from 'react';

export default function ChatList({
                                     conversations,
                                     activeConv,
                                     onNew,
                                     onSelect,
                                     onRename,
                                     onDelete
                                 }) {
    return (
        <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '1rem' }}>
            <button onClick={onNew}>+ New Chat</button>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                {conversations.map(conv => (
                    <li
                        key={conv.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            backgroundColor: activeConv?.id === conv.id ? '#eef' : 'transparent'
                        }}
                    >
                        {/* clicking title switches chat */}
                        <div onClick={() => onSelect(conv)} style={{ flex: 1 }}>
                            {conv.title} <br/>
                            <small>{new Date(conv.created_at).toLocaleString()}</small>
                        </div>

                        {/* rename button */}
                        <button
                            style={{ marginLeft: '0.5rem' }}
                            onClick={(e) => {
                                e.stopPropagation();                       // prevent onSelect
                                const newTitle = prompt('New chat title:', conv.title);
                                if (newTitle) onRename(conv.id, newTitle);
                            }}
                            title="Rename chat"
                        >
                            ✏️
                        </button>

                        {/* delete button */}
                        <button
                            style={{ marginLeft: '0.25rem' }}
                            onClick={(e) => {
                                e.stopPropagation();                       // prevent onSelect
                                if (window.confirm('Delete this chat?')) {
                                    onDelete(conv.id);
                                }
                            }}
                            title="Delete chat"
                        >
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}