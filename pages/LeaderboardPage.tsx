

import React, { useState, useEffect, useRef } from 'react';
import { CrownIcon, MenuIcon, BellIcon, CheckCircleIcon, ClockIcon, ChatIcon, PlusIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';


// --- Komponen Header yang Dapat Digunakan Kembali (disalin dari App.tsx) ---
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

const NewHomeHeader = ({ onNavigate, isLoggedIn, onLogout, activePage, userRole }) => {
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


const Footer = () => (
    <footer className="bg-gray-50 text-gray-600 py-16 px-8 border-t">
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


const LeaderboardColumn = ({ title, users }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg w-full transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center gap-3 mb-6">
            <CrownIcon className="w-8 h-8 text-yellow-500" />
            <h3 className="font-bold text-2xl text-gray-800">{title}</h3>
        </div>
        <div className="space-y-4">
            {users.map((user, index) => (
                <div key={index} className="flex items-center justify-between text-base p-2 rounded-lg transition-colors hover:bg-gray-100">
                    <div className="flex items-center gap-4">
                         <span className={`font-bold text-lg w-6 text-center ${index < 3 ? 'text-purple-600' : 'text-gray-500'}`}>{index + 1}</span>
                        <img src={user.imgSrc} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className="font-semibold text-gray-800">{user.name}</span>
                    </div>
                    <span className="font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-sm">{user.points} poin</span>
                </div>
            ))}
        </div>
    </div>
);


const LeaderboardPage = (props) => {
    const weeklyTutors = [
        { name: 'Mr. Amba', points: '1,594', imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
        { name: 'Sofia Chen', points: '1,482', imgSrc: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150' },
        { name: 'David Rodriguez', points: '1,350', imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100' },
        { name: 'Emily Carter', points: '1,270', imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
        { name: 'Michael Brown', points: '1,190', imgSrc: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100' },
    ];
    const monthlyTutors = [
        { name: 'David Rodriguez', points: '5,480', imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100' },
        { name: 'Mr. Amba', points: '5,210', imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
        { name: 'Emily Carter', points: '4,950', imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
        { name: 'Sofia Chen', points: '4,870', imgSrc: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150' },
        { name: 'Jessica Lee', points: '4,750', imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100' },
    ];
    const allTimeTutors = [
        { name: 'Mr. Amba', points: '250,430', imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
        { name: 'Sofia Chen', points: '245,120', imgSrc: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150' },
        { name: 'David Rodriguez', points: '239,870', imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100' },
        { name: 'Emily Carter', points: '235,430', imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
        { name: 'Michael Brown', points: '231,100', imgSrc: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100' },
    ];

    return (
        <div className="min-h-screen bg-gray-50" style={{background: 'linear-gradient(to bottom right, #fce7f3, #f3e8ff, #faf5ff)'}}>
            <NewHomeHeader {...props} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                 <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900">Papan Peringkat</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Lihat tutor-tutor terbaik kami berdasarkan performa mingguan, bulanan, dan sepanjang waktu.</p>
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <LeaderboardColumn title="Si Paling Membantu" users={weeklyTutors} />
                    <LeaderboardColumn title="Si paling Rajin Belajar" users={monthlyTutors} />
                    <LeaderboardColumn title="Si Paling Tutor" users={allTimeTutors} />
                 </div>
            </main>
            <Footer />
        </div>
    );
};

export default LeaderboardPage;