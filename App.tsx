

import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, HomeIcon, MailIcon, GithubIcon, MenuIcon, CrownIcon, BellIcon, CheckCircleIcon, ClockIcon, ChatIcon, PlusIcon, StarIcon as StarIconSolid } from './components/Icons';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import TutorDetailPage from './pages/TutorDetailPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AskQuestionPage from './pages/AskQuestionPage';
import AnswerQuestionPage from './pages/AnswerQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DashboardPage from './pages/DashboardPage';
import TutorDashboardPage from './pages/TutorDashboardPage';
import ChatPage from './pages/ChatPage';
import TutorSignUpFlow from './pages/TutorSignUpFlow';
import TutorListPage from './pages/TutorListPage';
// FIX: Import the CommunityPage component to resolve 'Cannot find name' error.
import CommunityPage from './pages/CommunityPage';


// --- Reusable Components (can be moved to their own files later) ---
// FIX: Typed the `TutorCard` component using `React.FC` to resolve the error about the 'key' prop.
const TutorCard: React.FC<{ name: string; description: string; imgSrc: string; onClick: () => void; }> = ({ name, description, imgSrc, onClick }) => (
    <div onClick={onClick} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col">
        <img src={imgSrc} alt={name} className="w-full h-60 object-cover rounded-lg" />
        <h3 className="text-xl font-bold mt-4 text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1 flex-grow">{description}</p>
    </div>
);

const TestimonialCard = ({ quote, name, role, avatarSrc }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
         <svg className="w-10 h-10 text-purple-200 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.33 16.33c0-1.2.33-2.33.93-3.33 1.13-1.8 2.33-3.4 4.34-5.33l2.06 1.67c-1.8 1.8-2.87 3.33-3.74 4.87-.93 1.47-1.4 3.07-1.4 4.8h.87c1.47 0 2.67.53 3.53 1.67.87 1.07 1.34 2.33 1.34 3.8-.07 1.47-.53 2.73-1.47 3.8-1 1-2.2.47-3.6.47-1.4 0-2.6-.53-3.47-1.6-.87-1-1.33-2.27-1.33-3.73 0-1.2.34-2.33 1-3.33-.2-.13-.4-.27-.53-.47-.27-.4-.4-.8-.4-1.27v-.2zM21.33 16.33c0-1.2.33-2.33.93-3.33 1.13-1.8 2.33-3.4 4.34-5.33l2.06 1.67c-1.8 1.8-2.87 3.33-3.74 4.87-.93 1.47-1.4 3.07-1.4 4.8h.87c1.47 0 2.67.53 3.53 1.67.87 1.07 1.34 2.33 1.34 3.8-.07 1.47-.53 2.73-1.47 3.8-1 1-2.2.47-3.6.47-1.4 0-2.6-.53-3.47-1.6-.87-1-1.33-2.27-1.33-3.73 0-1.2.34-2.33 1-3.33-.2-.13-.4-.27-.53-.47-.27-.4-.4-.8-.4-1.27v-.2z"></path></svg>
        <p className="text-gray-800 font-medium text-lg">"{quote}"</p>
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            <img src={avatarSrc} alt={name} className="w-12 h-12 rounded-full object-cover" />
            <div className="ml-4">
                <p className="font-bold text-gray-900">{name}</p>
                <p className="text-gray-500 text-sm">{role}</p>
            </div>
        </div>
    </div>
);


// --- UI Components for Logged In State ---

const LoggedInUserMenu = ({ onLogout, onNavigate, userRole }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const menuRef = useRef(null);

    // Dummy data for notifications
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
                    <div className="px-4 py-2 border-b">
                        <h3 className="font-bold text-gray-800">Notifikasi</h3>
                    </div>
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
                     <div className="px-4 py-2 border-t text-center">
                        <button className="text-sm font-semibold text-purple-600 hover:underline">Lihat semua notifikasi</button>
                    </div>
                </div>
            )}
            
            {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-black animate-fade-in" style={{animationDuration: '0.2s'}}>
                    <button onClick={() => { onNavigate('settings'); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Pengaturan</button>
                    <button onClick={() => { onLogout(); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Keluar
                    </button>
                </div>
            )}
        </div>
    );
};


// --- Homepage Section Components ---
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


const Hero = ({ onSearchSubmit }) => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearchSubmit(search);
    };

    return (
        <section className="relative pt-48 pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)' }}>
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-200 rounded-full opacity-50 filter blur-3xl"></div>
            <div className="absolute -bottom-24 -right-12 w-96 h-96 bg-blue-200 rounded-full opacity-40 filter blur-3xl"></div>
            <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text Content & Search */}
                <div className="text-center lg:text-left animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Bersama Berbagi Ilmu,   <span className="text-purple-600">
                            Untuk Melangkah Lebih Jauh.</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                        Temukan tutor ahli dalam berbagai mata pelajaran, jadwalkan sesi fleksibel, dan raih potensi akademis terbaik Anda bersama Kak Tutor.
                    </p>
                    <form onSubmit={handleSearch} className="mt-8 flex justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0">
                        <div className="relative flex w-full">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Mata pelajaran apa yang ingin kamu kuasai?"
                                className="w-full pl-6 pr-20 py-4 text-base text-gray-900 placeholder-gray-500 bg-white rounded-full shadow-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white font-bold p-3 rounded-full hover:bg-purple-700 transition-transform duration-300 hover:scale-110 shadow-md flex items-center justify-center">
                                <SearchIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                </div>
                {/* Right Column: Image Collage */}
                <div className="hidden lg:block relative h-96 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400" alt="Tutor 1" className="absolute w-48 h-64 object-cover rounded-xl shadow-2xl top-0 left-16 transform rotate-[-8deg] hover:rotate-[-2deg] hover:scale-105 transition-transform duration-300" />
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400" alt="Tutor 2" className="absolute w-40 h-52 object-cover rounded-xl shadow-2xl bottom-8 right-8 transform rotate-[6deg] hover:rotate-[2deg] hover:scale-105 transition-transform duration-300" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400" alt="Tutor 3" className="absolute w-32 h-40 object-cover rounded-xl shadow-2xl top-16 right-24 transform rotate-[-4deg] hover:rotate-[0deg] hover:scale-105 transition-transform duration-300" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300" alt="Tutor 4" className="absolute w-36 h-48 object-cover rounded-xl shadow-2xl bottom-16 left-4 transform rotate-[10deg] hover:rotate-[5deg] hover:scale-105 transition-transform duration-300" />
                </div>
            </div>
        </section>
    );
};


const HowItWorks = () => {
    const steps = [
        { icon: '🔍', title: 'Cari Tutor', description: 'Gunakan pencarian untuk menemukan tutor berdasarkan mata pelajaran atau keahlian.' },
        { icon: '✅', title: 'Pilih & Pesan', description: 'Lihat profil, ulasan, dan tarif, lalu pesan sesi yang paling sesuai untukmu.' },
        { icon: '🎓', title: 'Mulai Belajar', description: 'Terhubung dengan tutormu secara online atau tatap muka dan tingkatkan nilaimu!' }
    ];
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-8 text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Bagaimana Cara Kerjanya?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">Memulai perjalanan belajar Anda hanya butuh 3 langkah mudah.</p>
                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturedTutors = ({ onNavigate }) => {
    const tutors = [
        { name: "Mr. Amba", description: "Kelas Tutor dasar pemrograman.", imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
        { name: "Sofia Chen", description: "Tutor Fisika Kuantum & Astrofisika.", imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" },
        { name: "David Rodriguez", description: "Pakar Sejarah Dunia & Peradaban Kuno.", imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop" },
        { name: 'Emily Carter', description: "Spesialis Biologi Molekuler.", imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
        { name: 'Michael Brown', description: "Mentor Desain Grafis & UI/UX.", imgSrc: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop' },
        { name: 'Jessica Lee', description: "Ahli Ekonomi Makro dan Keuangan.", imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop' },
    ];
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Tutor Unggulan Kami</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutors.map((tutor, index) => (
                        <TutorCard key={index} onClick={() => onNavigate('tutorDetail')} {...tutor} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button onClick={() => onNavigate('tutorList')} className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-700 transition-transform duration-300 hover:scale-105 shadow-lg">
                        Lihat Semua Tutor
                    </button>
                </div>
            </div>
        </section>
    );
};

const Subjects = ({ onSearchSubmit }) => {
    const subjects = [
        { name: 'Matematika', icon: '🔢', gradient: 'from-blue-400 to-blue-600' },
        { name: 'Fisika', icon: '⚛️', gradient: 'from-purple-400 to-purple-600' },
        { name: 'Kimia', icon: '🧪', gradient: 'from-green-400 to-green-600' },
        { name: 'Biologi', icon: '🧬', gradient: 'from-teal-400 to-teal-600' },
        { name: 'Sejarah', icon: '📜', gradient: 'from-yellow-400 to-yellow-600' },
        { name: 'Geografi', icon: '🌍', gradient: 'from-indigo-400 to-indigo-600' },
        { name: 'Ekonomi', icon: '📈', gradient: 'from-pink-400 to-pink-600' },
        { name: 'Pemrograman', icon: '💻', gradient: 'from-gray-700 to-gray-900' },
    ];
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Jelajahi Berdasarkan Mata Pelajaran</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {subjects.map(({ name, icon, gradient }) => (
                        <button key={name} onClick={() => onSearchSubmit(name)} className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center`}>
                            <span className="text-4xl mb-2">{icon}</span>
                            <p className="font-bold text-lg">{name}</p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => (
    <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Dipercaya oleh Ribuan Siswa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <TestimonialCard quote="Platform les terbaik yang pernah saya gunakan. Nilai saya meningkat secara signifikan!" name="Aulia Putri" role="Siswa" avatarSrc="https://i.pravatar.cc/50?u=aulia" />
                <TestimonialCard quote="Pengalaman yang luar biasa. Tutornya berpengetahuan luas dan sangat suportif." name="Budi Santoso" role="Mahasiswa" avatarSrc="https://i.pravatar.cc/50?u=budi" />
                <TestimonialCard quote="Saya suka fitur komunitas. Senang bisa terhubung dengan siswa lain." name="Citra Lestari" role="Siswa" avatarSrc="https://i.pravatar.cc/50?u=citra" />
                <TestimonialCard quote="Sangat direkomendasikan untuk siapa saja yang ingin berprestasi dalam studi mereka." name="Dewi Wijaya" role="Orang Tua" avatarSrc="https://i.pravatar.cc/50?u=dewi" />
            </div>
        </div>
    </section>
);

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

const HomePage = ({ onNavigate, onSearchSubmit, isLoggedIn, onLogout, activePage, userRole }) => (
    <div className="bg-white">
        {/* FIX: Removed invalid 'onSearchSubmit' prop from NewHomeHeader component. */}
        <NewHomeHeader onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage={activePage} userRole={userRole} />
        <main>
            <Hero onSearchSubmit={onSearchSubmit} />
            <HowItWorks />
            <FeaturedTutors onNavigate={onNavigate} />
            <Subjects onSearchSubmit={onSearchSubmit} />
            <Testimonials />
        </main>
        <Footer />
    </div>
);

export default function App() {
    const [activePage, setActivePage] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('mentee'); // 'mentee' or 'tutor'
    const [newlyBookedClass, setNewlyBookedClass] = useState(null);
    const [tutorPoints, setTutorPoints] = useState(250430);
    const [menteePoints, setMenteePoints] = useState(50);

    // FIX: Add type annotation for `params` to avoid implicit any and allow property access.
    const handleNavigate = (page: string, params: any = {}) => {
        setActivePage(page);
        if (page === 'orderSuccess') { // Changed from 'payment' to 'orderSuccess'
            const schedule = params.schedule || '13:00 - 15:00'; // Default if not passed
            setNewlyBookedClass({
                subject: "Dasar Pemrograman",
                tutor: "Fadil",
                time: schedule,
                day: "Friday",
                date: 19,
                mode: "Online",
                location: "https://zoom.us/j/1234567890",
                attendees: ["https://i.pravatar.cc/24?u=f", "https://i.pravatar.cc/24?u=g"],
                status: "Pending"
            });
        }
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const handleLogin = (role: string) => {
        setIsLoggedIn(true);
        setUserRole(role);
        handleNavigate('dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        handleNavigate('home');
    };
    
    const handleSearchSubmit = (query: string) => {
        setSearchQuery(query);
        handleNavigate('tutorList');
    };
    
    const clearNewBooking = () => {
        setNewlyBookedClass(null);
    };

    const handleAnswerSubmit = (points: number) => {
        setMenteePoints(prev => prev + points);
        handleNavigate('community');
    };

    const handleVerifyAnswer = () => {
        setTutorPoints(prev => prev + 5);
    };

    const renderPage = () => {
        // FIX: Correctly map handler functions to prop names. The shorthand property syntax requires the variable name to match the key name.
        const pageProps = { 
            onNavigate: handleNavigate, 
            onSearchSubmit: handleSearchSubmit, 
            isLoggedIn, 
            onLogout: handleLogout, 
            activePage, 
            userRole 
        };

        switch (activePage) {
            case 'home':
                return <HomePage {...pageProps} />;
            case 'signup':
                return <SignUpPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'signin':
                return <SignInPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'search':
                 return <SearchPage {...pageProps} searchQuery={searchQuery} />;
            case 'settings':
                return <SettingsPage onNavigate={handleNavigate} />;
             case 'tutorDetail':
                return <TutorDetailPage onNavigate={handleNavigate} />;
             case 'payment':
                return <PaymentPage onNavigate={handleNavigate} />;
             case 'orderSuccess':
                return <OrderSuccessPage onNavigate={handleNavigate} />;
            case 'community':
                return <CommunityPage {...pageProps} tutorPoints={tutorPoints} menteePoints={menteePoints} />;
            case 'askQuestion':
                return <AskQuestionPage onNavigate={handleNavigate} />;
            case 'answerQuestion':
                 return <AnswerQuestionPage onNavigate={handleNavigate} onAnswerSubmit={handleAnswerSubmit} />;
            case 'questionDetail':
                return <QuestionDetailPage onNavigate={handleNavigate} userRole={userRole} onVerify={handleVerifyAnswer} />;
            case 'leaderboard':
                return <LeaderboardPage {...pageProps} />;
            case 'dashboard':
                 return userRole === 'tutor' 
                    ? <TutorDashboardPage {...pageProps} /> 
                    : <DashboardPage {...pageProps} newlyBookedClass={newlyBookedClass} clearNewBooking={clearNewBooking} />;
            case 'chat':
                return <ChatPage onNavigate={handleNavigate} />;
            case 'tutorSignUpFlow':
                return <TutorSignUpFlow onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'tutorList':
                 return <TutorListPage {...pageProps} searchQuery={searchQuery} />;
            default:
                return <HomePage {...pageProps} />;
        }
    };

    return <div className="min-h-screen">{renderPage()}</div>;
}