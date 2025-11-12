


import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, BackArrowIcon } from '../components/Icons';

// --- DUMMY DATA GENERATION ---
const firstNames = ["Aulia", "Budi", "Citra", "Dewi", "Eka", "Fajar", "Gita", "Hadi", "Indah", "Joko", "Kartika", "Lia", "Mega", "Nanda", "Oscar"];
const lastNames = ["Putri", "Santoso", "Wijaya", "Lestari", "Kusuma", "Pratama", "Wahyuni", "Hakim", "Susanti", "Nugroho", "Firmansyah"];
const sampleMessages = [
    "Oke, nanti aku kabari lagi ya.",
    "Bisa tolong kirim file yang kemarin?",
    "Jangan lupa rapat jam 2 siang.",
    "Terima kasih banyak bantuannya!",
    "Lagi di mana? Aku udah di lokasi.",
    "Haha, bisa aja kamu.",
    "Nanti kita bahas lebih lanjut ya.",
    "Sip, sudah aku terima filenya.",
];

const generateRandomName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
const generateRandomMessage = () => sampleMessages[Math.floor(Math.random() * sampleMessages.length)];

const generateChats = () => {
    const chats = [];
    // Generate PPTI students
    for (let i = 1; i <= 23; i++) {
        const name = generateRandomName();
        chats.push({
            id: `ppti-${i}`,
            name,
            class: `PPTI ${i}`,
            avatar: `https://i.pravatar.cc/40?u=${name}`,
            messages: [
                { sender: 'them', text: `Halo! Ini ${name} dari PPTI ${i}.`, time: '10:30' },
                { sender: 'me', text: 'Oh halo! Salam kenal ya.', time: '10:31' },
                { sender: 'them', text: generateRandomMessage(), time: '10:32' },
            ],
        });
    }
    // Generate PPBP students
    for (let i = 1; i <= 9; i++) {
        const name = generateRandomName();
        chats.push({
            id: `ppbp-${i}`,
            name,
            class: `PPBP ${i}`,
            avatar: `https://i.pravatar.cc/40?u=${name}`,
            messages: [
                { sender: 'them', text: `Pagi, saya ${name} dari kelas PPBP ${i}.`, time: '09:15' },
                { sender: 'me', text: 'Pagi juga, ada yang bisa dibantu?', time: '09:16' },
                { sender: 'them', text: generateRandomMessage(), time: '09:18' },
            ],
        });
    }
    return chats.sort((a, b) => a.name.localeCompare(b.name));
};


// --- CHAT COMPONENTS ---

// FIX: Use React.FC with explicit prop types to resolve the 'key' prop error in lists.
const ConversationItem: React.FC<{
    chat: {
        id: string;
        name: string;
        avatar: string;
        messages: { time: string; text: string }[];
    };
    isActive: boolean;
    onSelect: (id: string) => void;
}> = ({ chat, isActive, onSelect }) => (
    <div
        onClick={() => onSelect(chat.id)}
        className={`flex items-start p-3 gap-3 cursor-pointer rounded-lg transition-colors ${
            isActive ? 'bg-purple-100' : 'hover:bg-gray-100'
        }`}
    >
        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-grow overflow-hidden">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800 truncate">{chat.name}</p>
                <p className="text-xs text-gray-400 flex-shrink-0">{chat.messages[chat.messages.length - 1].time}</p>
            </div>
            <p className="text-sm text-gray-500 truncate">{chat.messages[chat.messages.length - 1].text}</p>
        </div>
    </div>
);

// FIX: Use React.FC with explicit prop types to resolve the 'key' prop error in lists.
const MessageBubble: React.FC<{ message: { sender: string; text: string; time: string } }> = ({ message }) => {
    const isMe = message.sender === 'me';
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                    isMe ? 'bg-purple-500 text-white rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-lg'
                }`}
            >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${isMe ? 'text-purple-200' : 'text-gray-500'} text-right`}>{message.time}</p>
            </div>
        </div>
    );
};


const ChatPage = ({ onNavigate }) => {
    const [chats, setChats] = useState(generateChats());
    const [activeChatId, setActiveChatId] = useState(chats[0]?.id || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const activeChat = chats.find(c => c.id === activeChatId);

    const filteredChats = chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.class.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [activeChat?.messages]);
    
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChatId) return;

        const now = new Date();
        const newMsg = {
            sender: 'me',
            text: newMessage,
            time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
        };
        
        setChats(prevChats => prevChats.map(chat => {
            if (chat.id === activeChatId) {
                return { ...chat, messages: [...chat.messages, newMsg] };
            }
            return chat;
        }));
        
        setNewMessage('');
    };

    return (
        <div className="h-screen w-screen flex bg-gray-50" style={{background: 'linear-gradient(to bottom right, #fce7f3, #f3e8ff, #faf5ff)'}}>
            {/* Sidebar */}
            <aside className="w-full max-w-sm flex flex-col bg-white/80 backdrop-blur-sm border-r border-gray-200/50">
                <div className="p-4 border-b border-gray-200/80">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Pesan</h1>
                        <button 
                            onClick={() => onNavigate('dashboard')}
                            className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100"
                        >
                            <BackArrowIcon className="w-4 h-4" />
                            Kembali
                        </button>
                    </div>
                    <div className="relative mt-4">
                        <input
                            type="text"
                            placeholder="Cari nama atau kelas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto p-2 space-y-1">
                    {filteredChats.map(chat => (
                        <ConversationItem
                            key={chat.id}
                            chat={chat}
                            isActive={chat.id === activeChatId}
                            onSelect={setActiveChatId}
                        />
                    ))}
                </div>
            </aside>

            {/* Main Chat Window */}
            <main className="flex-1 flex flex-col">
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <header className="flex items-center p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/80">
                            <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
                            <div className="ml-4">
                                <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
                                <p className="text-sm text-gray-500">{activeChat.class}</p>
                            </div>
                        </header>

                        {/* Messages Area */}
                        <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4">
                            {activeChat.messages.map((msg, index) => (
                                <MessageBubble key={index} message={msg} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <footer className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200/80">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Ketik pesan..."
                                    className="flex-grow py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-gray-800 placeholder-gray-500"
                                />
                                <button type="submit" className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors disabled:bg-purple-300" disabled={!newMessage.trim()}>
                                    Kirim
                                </button>
                            </form>
                        </footer>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center text-gray-500">
                        <div>
                             <h2 className="text-xl font-semibold">Selamat Datang di Pesan</h2>
                             <p>Pilih percakapan dari panel kiri untuk memulai.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ChatPage;