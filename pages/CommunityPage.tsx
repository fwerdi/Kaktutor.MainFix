

import React, { useState, useEffect, useRef } from 'react';
import { CrownIcon, MenuIcon, SearchIcon, HomeIcon, MailIcon, GithubIcon, BellIcon, CheckCircleIcon, ClockIcon, ChatIcon, PlusIcon } from '../components/Icons';

// FIX: Added NewHomeHeader and its dependencies (LoggedInUserMenu, SmallLogo) to resolve the "Cannot find name 'NewHomeHeader'" error.
// These components were likely defined in a parent component and needed to be included here after refactoring.
const LoggedInUserMenu = ({ onLogout, onNavigate, userRole }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const menuRef = useRef(null);

    const hasUnread = true;
    const menteeNotifications = [
        { icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />, text: "Booking untuk 'Dasar Pemrograman' telah dikonfirmasi!", time: "5 menit lalu" },
        { icon: <ClockIcon className="w-5 h-5 text-blue-500" />, text: "Kelas Mendatang: Aljabar Linear dalam 1 jam.", time: "20 menit lalu" },
        { icon: <ChatIcon className="w-5 h-5 text-purple-500" />, text: "Pesan baru dari Sofia Chen.", time: "1 hari lalu" },
    ];
    const tutorNotifications = [
        { icon: <PlusIcon className="w-5 h-5 text-yellow-500" />, text: "Permintaan booking baru dari Citra Lestari.", time: "2 menit lalu" },
        { icon: <ClockIcon className="w-5 h-5 text-blue-500" />, text: "Kelas Mendatang: Dasar Pemrograman dalam 30 menit.", time: "15 menit lalu" },
        { icon: <ChatIcon className="w-5 h-5 text-purple-500" />, text: "Pesan baru dari Budi Santoso.", time: "3 jam lalu" },
    ];
    const notifications = userRole === 'tutor' ? tutorNotifications : menteeNotifications;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
                setNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
        if (menuOpen) setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (notificationsOpen) setNotificationsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-4">
                <button onClick={toggleNotifications} className="relative text-gray-700 hover:text-black p-1 rounded-full hover:bg-black/10 transition-colors">
                    <BellIcon className="w-6 h-6" />
                    {hasUnread && <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>}
                </button>
                <div className="flex items-center gap-2">
                     <img onClick={() => onNavigate('dashboard')} src={userRole === 'tutor' ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100"} alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 cursor-pointer" />
                    <button onClick={toggleMenu} className="text-gray-800 p-1 rounded-md hover:bg-black/10 transition-colors">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {notificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50 text-black animate-fade-in border border-gray-100" style={{animationDuration: '0.2s'}}>
                    <div className="px-4 py-2 border-b"><h3 className="font-bold text-gray-800">Notifikasi</h3></div>
                    <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                        {notifications.map((notif, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex-shrink-0 mt-1">{notif.icon}</div>
                                <div>
                                    <p className="text-sm text-gray-700">{notif.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="px-4 py-2 border-t text-center"><button className="text-sm font-semibold text-purple-600 hover:underline">Lihat semua notifikasi</button></div>
                </div>
            )}
            {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-black animate-fade-in" style={{animationDuration: '0.2s'}}>
                    <button onClick={() => { onNavigate('settings'); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Pengaturan</button>
                    <button onClick={() => { onLogout(); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Keluar</button>
                </div>
            )}
        </div>
    );
};

const SmallLogo = ({ onNavigate }) => (
    <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
        <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
    </button>
);

const NewHomeHeader = ({ onNavigate, onSearchSubmit, isLoggedIn, onLogout, activePage, userRole }) => {
    const NavLink = ({ text, isActive, onClick }) => (
        <button onClick={onClick} className="relative text-lg font-bold px-4 py-2 transition-colors duration-200">
            <span className={isActive ? 'text-purple-600' : 'text-gray-600 hover:text-black'}>{text}</span>
            {isActive && <div className="absolute bottom-0 left-4 right-4 h-1 bg-purple-600 rounded-full"></div>}
        </button>
    );

    return (
        <header className="bg-white/80 backdrop-blur-sm text-gray-800 py-4 px-8 z-30 fixed top-0 w-full border-b border-gray-900/5">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <SmallLogo onNavigate={onNavigate} />
                    <nav className="hidden md:flex items-center">
                        <NavLink text="BERANDA" isActive={activePage === 'home'} onClick={() => onNavigate('home')} />
                        <NavLink text="KOMUNITAS" isActive={activePage === 'community'} onClick={() => onNavigate('community')} />
                        <NavLink text="PERINGKAT" isActive={activePage === 'leaderboard'} onClick={() => onNavigate('leaderboard')} />
                         {isLoggedIn && <NavLink text="KELAS SAYA" isActive={activePage === 'dashboard' || activePage === 'chat'} onClick={() => onNavigate('dashboard')} />}
                    </nav>
                </div>
                
                <div className="flex items-center">
                    {isLoggedIn ? (
                        <LoggedInUserMenu onLogout={onLogout} onNavigate={onNavigate} userRole={userRole} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <button onClick={() => onNavigate('signin')} className="text-sm font-semibold hover:text-black text-gray-700 transition-colors px-4 py-2">Masuk</button>
                            <button onClick={() => onNavigate('signup')} className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-purple-700 transition-transform duration-300 hover:scale-105 shadow-md">Daftar Gratis</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const QuestionCard: React.FC<{
    userName: string;
    userImage: string;
    subject: string;
    timestamp: string;
    points: number;
    questionTitle: string;
    onClick: () => void;
    userRole: string;
}> = ({ userName, userImage, subject, timestamp, points, questionTitle, onClick, userRole }) => (
    <div onClick={onClick} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200">
        <img src={userImage} alt={userName} className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
        
        <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-md">{userName}</span>
                    <span className="text-gray-500 text-sm">{subject} • {timestamp}</span>
                </div>
                <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">+{points} poin</span>
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mt-2 mb-3">{questionTitle}</h3>
            
            {userRole !== 'tutor' && (
                <div className="text-right">
                    <div 
                        className="inline-block border border-gray-300 rounded-full px-6 py-1.5 text-sm font-semibold text-gray-700 bg-white"
                    >
                        JAWAB
                    </div>
                </div>
            )}
        </div>
    </div>
);


const UserProfileCard = ({ points, onNavigate, userName }) => (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-start gap-4">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt={userName} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-900">{userName}</h3>
            </div>
            <button onClick={() => onNavigate('settings')} className="text-sm font-semibold text-purple-600 hover:underline flex-shrink-0">Ubah</button>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-pink-100 text-pink-800 rounded-lg p-2 text-center">
                <p className="font-bold">{points} poin</p>
            </div>
            <div className="bg-pink-100 text-pink-800 rounded-lg p-2 flex items-center justify-center gap-2">
                <CrownIcon className="w-5 h-5" />
                <p className="font-bold">0</p>
            </div>
        </div>
    </div>
);

const LeaderboardCard: React.FC<{
    users: { name: string; points: string; imgSrc: string }[];
    userRole: string;
    onNavigate: (page: string) => void;
}> = ({ users, userRole, onNavigate }) => (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
            <CrownIcon className="w-6 h-6 text-yellow-500" />
            <div>
                 <h3 className="font-bold text-lg leading-tight">{userRole === 'tutor' ? 'Si paling tutor' : 'Pengguna tercerdas'}</h3>
                 {userRole !== 'tutor' && <p className="text-xs text-gray-500 font-semibold">Si paling membantu</p>}
            </div>
        </div>
        <div className="space-y-3">
            {users.slice(0, 5).map((user, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                        <img src={user.imgSrc} alt={user.name} className="w-8 h-8 rounded-full" />
                        <span className="font-semibold text-gray-800">{user.name}</span>
                    </div>
                    <span className="font-bold text-gray-600">{user.points} poin</span>
                </div>
            ))}
        </div>
        <div className="text-center mt-4">
            <button onClick={() => onNavigate('leaderboard')} className="text-sm text-gray-500 hover:underline">selengkapnya</button>
        </div>
    </div>
);

// --- DUMMY DATA GENERATION ---
const firstNames = ["Adi", "Alya", "Bagus", "Bima", "Cici", "Citra", "Dafa", "Dian", "Eko", "Elisa", "Fitri", "Gilang", "Hana", "Indra", "Jihan", "Joko", "Kevin", "Lia", "Mega", "Nadia", "Oscar", "Putri", "Qori", "Rian", "Rina", "Sinta", "Tono", "Umar", "Vina", "Wawan", "Yuni", "Zainal"];
const lastNames = ["Hakim", "Gunawan", "Firmansyah", "Kusumo", "Lestari", "Nugroho", "Pratama", "Santoso", "Saputra", "Susanti", "Wahyuni", "Wijaya"];
const subjects = ["Matematika", "Fisika Dasar", "Kimia Organik", "Biologi Sel", "Statistika", "Kalkulus", "Algoritma", "Struktur Data", "Ekonomi Mikro", "Sejarah Modern", "Sastra Inggris"];
const questionTemplates = [
    "Bagaimana cara menyelesaikan [SUBJECT]?",
    "Tolong jelaskan konsep [SUBJECT] dong.",
    "Error saat implementasi [SUBJECT], solusinya gimana ya?",
    "Stuck di soal tentang [SUBJECT], ada yang bisa bantu?",
    "Minta rekomendasi sumber belajar untuk",
];

const generateRandomName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
const generateRandomSubject = () => subjects[Math.floor(Math.random() * subjects.length)];
const generateRandomQuestionTitle = () => {
    const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    return template.replace('[SUBJECT]', generateRandomSubject());
};

const generateQuestions = () => {
    return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        userName: generateRandomName(),
        userImage: `https://i.pravatar.cc/40?u=user${i}`,
        subject: generateRandomSubject(),
        timestamp: `${Math.floor(Math.random() * 59) + 1} menit yang lalu`,
        points: (Math.floor(Math.random() * 4) + 1) * 5,
        questionTitle: generateRandomQuestionTitle(),
    }));
};

// --- FOOTER ---
const Footer = () => (
    <footer className="bg-white text-gray-600 py-16 px-8 border-t">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
            <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900">Kak Tutor</h3>
                <p className="mt-2 text-sm">Platform les privat terdepan untuk semua jenjang pendidikan.</p>
                <div className="flex gap-4 mt-4">
                    <a href="#" className="hover:text-purple-600"><HomeIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-purple-600"><MailIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-purple-600"><GithubIcon className="w-5 h-5"/></a>
                </div>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-gray-900">Perusahaan</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">Tentang Kami</a></li>
                    <li><a href="#" className="hover:underline">Karier</a></li>
                    <li><a href="#" className="hover:underline">Pers</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-gray-900">Legal</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">Kontak</a></li>
                    <li><a href="#" className="hover:underline">Ketentuan Layanan</a></li>
                    <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-gray-900">Dukungan</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">Pusat Bantuan</a></li>
                    <li><a href="#" className="hover:underline">FAQ</a></li>
                    <li><a href="#" className="hover:underline">Status</a></li>
                </ul>
            </div>
        </div>
         <div className="container mx-auto mt-12 pt-8 border-t text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Kak Tutor. Semua Hak Cipta Dilindungi.
        </div>
    </footer>
);


// --- MAIN COMPONENT ---
// FIX: The CommunityPage component must be exported to be used in other files. It was missing an export statement.
const CommunityPage = (props) => {
    const { onNavigate, onSearchSubmit, isLoggedIn, onLogout, activePage, userRole, tutorPoints, menteePoints } = props;
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setQuestions(generateQuestions());
    }, []);
    
    const filteredQuestions = questions.filter(q => 
        q.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const allTimeTutors = [
        { name: 'Mr. Amba', points: '250,430', imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
        { name: 'Sofia Chen', points: '245,120', imgSrc: 'https://i.pravatar.cc/40?u=user0' },
        { name: 'David Rodriguez', points: '239,870', imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100' },
    ];
    
    const allTimeMentees = [
        { name: 'Citra Lestari', points: '1,250', imgSrc: 'https://i.pravatar.cc/40?u=citra' },
        { name: 'Budi Santoso', points: '1,180', imgSrc: 'https://i.pravatar.cc/40?u=budi' },
        { name: 'Aulia Putri', points: '1,120', imgSrc: 'https://i.pravatar.cc/40?u=aulia' },
    ];
    
    const users = userRole === 'tutor' ? allTimeTutors : allTimeMentees;
    const userName = userRole === 'tutor' ? 'Mr. Amba' : 'Citra Lestari';
    const points = userRole === 'tutor' ? tutorPoints : menteePoints;

    return (
        <div className="min-h-screen bg-gray-50" style={{background: 'linear-gradient(to bottom right, #fce7f3, #f3e8ff, #faf5ff)'}}>
            <NewHomeHeader {...props} onSearchSubmit={(q) => setSearchQuery(q)} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Tanyakan sesuatu</h2>
                            <button onClick={() => onNavigate('askQuestion')} className="bg-purple-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-purple-700 transition-colors shadow-md">
                                Ajukan Pertanyaan
                            </button>
                        </div>
                        {filteredQuestions.map(q => 
                            <QuestionCard 
                                key={q.id} 
                                {...q} 
                                onClick={() => onNavigate('questionDetail')} 
                                userRole={userRole}
                            />
                        )}
                    </div>
                    
                    {/* Sidebar */}
                    <aside className="space-y-6 lg:sticky lg:top-28">
                        <UserProfileCard points={points} onNavigate={onNavigate} userName={userName} />
                        <LeaderboardCard users={users} userRole={userRole} onNavigate={onNavigate} />
                    </aside>
                    
                </div>
            </main>
            <Footer />
        </div>
    );
};

// FIX: Export the CommunityPage component as default to make it importable in other files.
export default CommunityPage;