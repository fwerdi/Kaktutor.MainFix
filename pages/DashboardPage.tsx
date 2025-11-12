
import React, { useState, useEffect, useRef } from 'react';
import {
    DashboardIcon, ChatIcon, DocumentIcon, ReceiptIcon, SettingsIcon, HelpIcon,
    ClockIcon, CheckBadgeIcon, InProgressIcon, ShareIcon, PlusIcon, MoreHorizIcon,
    CheckboxUncheckedIcon, CheckboxCheckedIcon, MenuIcon, CloseIcon, StarIcon, BellIcon, CheckCircleIcon,
    HomeIcon, MailIcon, GithubIcon
} from '../components/Icons';


// --- Shared Header Components ---
const LoggedInUserMenu = ({ onLogout, onNavigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const menuRef = useRef(null);

    // Dummy data for notifications
    const hasUnread = true;
    const notifications = [
        { icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />, text: "Pemesanan untuk 'Dasar Pemrograman' telah dikonfirmasi!", time: "5 menit lalu" },
        { icon: <ClockIcon className="w-5 h-5 text-blue-500" />, text: "Kelas Mendatang: Aljabar Linear dalam 1 jam.", time: "20 menit lalu" },
        { icon: <ChatIcon className="w-5 h-5 text-purple-500" />, text: "Pesan baru dari Sofia Chen.", time: "1 hari lalu" },
    ];

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
                    <img onClick={() => onNavigate('dashboard')} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 cursor-pointer" />
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


const SmallLogo = ({ onNavigate }) => (
    <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
        <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
    </button>
);

const DashboardHeader = ({ onNavigate, isLoggedIn, onLogout, activePage }) => {
    const NavLink = ({ text, isActive, onClick }) => (
        <button onClick={onClick} className="relative text-lg font-bold px-4 py-2 transition-colors duration-200">
            <span className={isActive ? 'text-purple-600' : 'text-gray-600 hover:text-black'}>{text}</span>
            {isActive && <div className="absolute bottom-0 left-4 right-4 h-1 bg-purple-600 rounded-full"></div>}
        </button>
    );

    return (
        <header className="bg-gradient-to-b from-purple-100/80 to-transparent backdrop-blur-sm text-gray-800 py-4 px-8 z-30 fixed top-0 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <SmallLogo onNavigate={onNavigate} />
                    <nav className="flex items-center">
                        <NavLink text="BERANDA" isActive={activePage === 'home'} onClick={() => onNavigate('home')} />
                        <NavLink text="KOMUNITAS" isActive={activePage === 'community'} onClick={() => onNavigate('community')} />
                        <NavLink text="PERINGKAT" isActive={activePage === 'leaderboard'} onClick={() => onNavigate('leaderboard')} />
                         {isLoggedIn && <NavLink text="KELAS SAYA" isActive={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />}
                    </nav>
                </div>
                
                <div className="flex items-center">
                    {isLoggedIn ? (
                        <LoggedInUserMenu onLogout={onLogout} onNavigate={onNavigate} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <button onClick={() => onNavigate('signin')} className="text-sm font-semibold hover:text-black text-gray-700 transition-colors">Masuk</button>
                            <button onClick={() => onNavigate('signup')} className="bg-purple-500 text-white font-semibold py-1.5 px-4 rounded-md hover:bg-purple-600 transition-colors text-sm">Daftar</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};


// --- Sidebar ---
const Sidebar = ({ onNavigate, activeView, setActiveView }) => {
    
    // FIX: Added types for NavLink props to make `viewName` and `page` optional, which resolves the TypeScript errors about missing properties.
    const NavLink = ({ icon, text, viewName, page }: { icon: React.ReactNode; text: string; viewName?: string; page?: string }) => (
        <button
            onClick={() => {
                if (viewName) {
                    setActiveView(viewName);
                } else if (page) {
                    onNavigate(page);
                }
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === viewName
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            {icon}
            {text}
        </button>
    );

    return (
        <aside className="w-64 bg-white/70 backdrop-blur-sm p-4 flex flex-col border-r border-gray-200/50">
            <div className="p-2 mb-6">
                <button onClick={() => onNavigate('home')} className="flex items-center justify-center w-full">
                    <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
                </button>
            </div>
            <nav className="flex-grow space-y-1">
                <NavLink icon={<DashboardIcon className="w-5 h-5" />} text="Kelas Saya" viewName="my-classes" />
                <NavLink icon={<DocumentIcon className="w-5 h-5" />} text="Riwayat Kelas" viewName="history" />
                <NavLink icon={<PlusIcon className="w-5 h-5" />} text="Permintaan Kelas" viewName="requests" />
                <NavLink icon={<ClockIcon className="w-5 h-5" />} text="Kalender" viewName="calendar" />
                <NavLink icon={<ChatIcon className="w-5 h-5" />} text="Pesan" page="chat" />
            </nav>
            <div className="mt-auto space-y-1">
                 <NavLink icon={<SettingsIcon className="w-5 h-5" />} text="Pengaturan" page="settings" />
                 <NavLink icon={<HelpIcon className="w-5 h-5" />} text="Bantuan & Dukungan" page="home" />
            </div>
        </aside>
    );
};


// --- Main Content Components ---

const NotificationBanner = ({ message, onDismiss }) => (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex justify-between items-center animate-fade-in">
        <div className="flex items-center">
            <CheckBadgeIcon className="w-6 h-6 mr-3" />
            <p className="font-semibold">{message}</p>
        </div>
        <button onClick={onDismiss} className="p-1 rounded-full hover:bg-green-200">
            <CloseIcon className="w-5 h-5" />
        </button>
    </div>
);


const ContentHeader = ({ onAddClassClick }) => {
    const today = new Date();
    const dateString = today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <header className="flex justify-between items-center mb-6">
            <div>
                <p className="text-gray-500">{dateString}</p>
                <h1 className="text-4xl font-bold text-gray-800">Selamat Malam! John,</h1>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={onAddClassClick}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    <PlusIcon className="w-5 h-5" /> Tambah Kelas
                </button>
            </div>
        </header>
    );
};

const StatCard: React.FC<{
    icon: React.ReactElement<{ className?: string }>;
    value: string;
    title: string;
    subtitle: string;
    colorClass: { bg: string; text: string; };
}> = ({ icon, value, title, subtitle, colorClass }) => (
    <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${colorClass.bg}`}>
            {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass.text}` })}
        </div>
        <div>
            <p className="text-xl font-bold text-gray-800">{value} {title}</p>
            <p className="text-gray-500">{subtitle}</p>
        </div>
    </div>
);

const StatsBar = () => {
    const stats = [
        {
            icon: <ClockIcon />,
            value: "12",
            title: "Jam",
            subtitle: "Waktu Belajar",
            colorClass: { bg: 'bg-blue-100', text: 'text-blue-600' }
        },
        {
            icon: <CheckBadgeIcon />,
            value: "24",
            title: "Kelas",
            subtitle: "Dihadiri",
            colorClass: { bg: 'bg-green-100', text: 'text-green-600' }
        },
        {
            icon: <HelpIcon />,
            value: "7",
            title: "Pertanyaan",
            subtitle: "Dijawab",
            colorClass: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 rounded-2xl" style={{backgroundColor: '#F6F0FF'}}>
             {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

const MyClasses = ({ classes }) => {
    const StatusPill = ({ status }) => {
        const styles = {
            "Sedang Berlangsung": "bg-green-100 text-green-800",
            "Tertunda": "bg-purple-100 text-purple-800",
            "Selesai": "bg-blue-100 text-blue-800",
        };
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Kelas Saya</h2>
                <button className="text-sm font-semibold text-gray-600 hover:underline">Lihat Semua</button>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Kelas</th>
                            <th className="p-3 font-medium">Peserta</th>
                            <th className="p-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((c, index) => (
                            <tr key={index} className="border-t border-gray-200/80">
                                <td className="p-3 align-top">
                                    <p className="font-bold text-gray-800">{c.subject}</p>
                                    <p className="text-gray-500 text-xs">{c.time}</p>
                                    <p className="text-gray-500 text-xs">{c.tutor} • {c.mode}</p>
                                    <a href={c.location} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">{c.mode === 'Online' ? 'Tautan Zoom' : c.location}</a>
                                </td>
                                <td className="p-3 align-top">
                                    <div className="flex items-center -space-x-2">
                                        {c.attendees.map((img, i) => (
                                            <img key={i} src={img} alt="attendee" className="w-6 h-6 rounded-full border-2 border-white" />
                                        ))}
                                    </div>
                                </td>
                                <td className="p-3 align-top">
                                    <StatusPill status={c.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ClassHistory = ({ historyData, onOpenFeedbackModal }) => {
    const Rating = ({ count }) => (
        <div className="flex">
            {[...Array(5)].map((_, i) => <StarIcon key={i} isFilled={i < count} className="w-4 h-4" />)}
        </div>
    );

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Riwayat Kelas</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Kelas</th>
                            <th className="p-3 font-medium">Tutor</th>
                            <th className="p-3 font-medium">Tanggal</th>
                            <th className="p-3 font-medium">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((item) => (
                            <tr key={item.id} className="border-t border-gray-200/80">
                                <td className="p-3 font-bold text-gray-800">{item.subject}</td>
                                <td className="p-3 text-gray-600">{item.tutor}</td>
                                <td className="p-3 text-gray-600">{item.date}</td>
                                <td className="p-3">
                                    {item.rating ? (
                                        <Rating count={item.rating} />
                                    ) : (
                                        <button
                                            onClick={() => onOpenFeedbackModal(item)}
                                            className="text-xs font-semibold text-blue-600 hover:underline"
                                        >
                                            Beri Ulasan
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CalendarWidget = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date('2024-07-01'));
    const [selectedDate, setSelectedDate] = useState(new Date());

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = (startOfMonth.getDay() + 6) % 7; // Monday is 0
    const daysInMonth = endOfMonth.getDate();

    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const eventsByDate = events.reduce((acc, event) => {
        const date = event.fullDate;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {});

    const selectedDayEvents = selectedDate ? eventsByDate[selectedDate.toISOString().split('T')[0]] || [] : [];

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50 h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        &lt;
                    </button>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        &gt;
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
                    <div key={day} className="font-semibold text-gray-500 pb-2">{day}</div>
                ))}
                {calendarDays.map((day, index) => (
                    <div key={index} className="relative h-10 flex items-center justify-center">
                        {day ? (
                            <button
                                onClick={() => setSelectedDate(day)}
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors
                                    ${selectedDate && selectedDate.toDateString() === day.toDateString() ? 'bg-purple-600 text-white' : ''}
                                    ${new Date().toDateString() === day.toDateString() ? 'text-purple-600 font-bold' : 'text-gray-700 hover:bg-gray-100'}
                                `}
                            >
                                {day.getDate()}
                            </button>
                        ) : null}
                        {day && eventsByDate[day.toISOString().split('T')[0]] && (
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                {eventsByDate[day.toISOString().split('T')[0]].slice(0, 3).map((event, i) => (
                                    <span key={i} className={`block w-1.5 h-1.5 rounded-full ${event.status === 'Selesai' ? 'bg-gray-400' : 'bg-green-500'}`}></span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800">Jadwal untuk {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                <div className="space-y-3 mt-3 max-h-40 overflow-y-auto">
                    {selectedDayEvents.length > 0 ? selectedDayEvents.map((event, index) => (
                         <div key={index} className={`pl-3 border-l-4 ${event.status === 'Selesai' ? 'border-gray-400' : 'border-purple-500'}`}>
                            <p className="font-semibold text-gray-800">{event.subject}</p>
                            <p className="text-xs text-gray-500">{event.time} bersama {event.tutor}</p>
                            <p className={`text-xs font-semibold ${event.status === 'Selesai' ? 'text-gray-500' : 'text-purple-600'}`}>{event.status}</p>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 text-sm pt-4">Tidak ada kelas yang dijadwalkan.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Feedback Modal ---
const FeedbackModal = ({ isOpen, onClose, onSubmit, tutorName }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in" style={{ animationDuration: '0.2s' }}>
            <div ref={modalRef} className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 m-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Beri Ulasan untuk {tutorName}</h2>
                <div className="space-y-4 mt-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Peringkat</label>
                        <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                                <button key={i} onClick={() => setRating(i + 1)}>
                                    <StarIcon isFilled={i < rating} className="w-8 h-8" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="feedbackText" className="text-sm font-medium text-gray-700">Ulasan (opsional)</label>
                        <textarea
                            id="feedbackText"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                            placeholder={`Bagaimana pengalaman belajar Anda dengan ${tutorName}?`}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                    <button onClick={() => onSubmit({ rating, feedback })} disabled={rating === 0} className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300">Kirim</button>
                </div>
            </div>
        </div>
    );
};

// --- New Component for Class Requests ---
const RequestClassModal = ({ isOpen, onClose, onSubmit }) => {
    const [requestData, setRequestData] = useState({ subject: '', topic: '', date: '', startTime: '', endTime: '', minRating: '4' });
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(requestData);
        setRequestData({ subject: '', topic: '', date: '', startTime: '', endTime: '', minRating: '4' }); // Reset form
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in" style={{ animationDuration: '0.2s' }}>
            <div ref={modalRef} className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 m-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Buat Permintaan Kelas</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="text-sm font-medium text-gray-700">Mata Kuliah</label>
                        <input type="text" name="subject" id="subject" value={requestData.subject} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" placeholder="Contoh: Kalkulus Lanjut" />
                    </div>
                    <div>
                        <label htmlFor="topic" className="text-sm font-medium text-gray-700">Materi Spesifik</label>
                        <textarea name="topic" id="topic" value={requestData.topic} onChange={handleChange} required rows={3} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" placeholder="Contoh: Turunan parsial, integral lipat, dll."></textarea>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div className="sm:col-span-1">
                             <label htmlFor="date" className="text-sm font-medium text-gray-700">Tanggal</label>
                             <input type="date" name="date" id="date" value={requestData.date} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                         </div>
                         <div className="sm:col-span-1">
                              <label htmlFor="startTime" className="text-sm font-medium text-gray-700">Jam Mulai</label>
                              <input type="time" name="startTime" id="startTime" value={requestData.startTime} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                         </div>
                         <div className="sm:col-span-1">
                              <label htmlFor="endTime" className="text-sm font-medium text-gray-700">Jam Selesai</label>
                             <input type="time" name="endTime" id="endTime" value={requestData.endTime} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                         </div>
                     </div>
                     <div>
                        <label htmlFor="minRating" className="text-sm font-medium text-gray-700">Rating Minimal Tutor</label>
                         <select name="minRating" id="minRating" value={requestData.minRating} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-white text-black">
                            <option value="5">★★★★★ (5)</option>
                            <option value="4">★★★★☆ (4+)</option>
                            <option value="3">★★★☆☆ (3+)</option>
                            <option value="2">★★☆☆☆ (2+)</option>
                            <option value="1">★☆☆☆☆ (1+)</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">Kirim Permintaan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ClassRequestView = ({ requests, onOpenModal }) => {
    const StatusPill = ({ status }) => {
        const styles = {
            "Mencari Tutor": "bg-yellow-100 text-yellow-800",
            "Diterima": "bg-green-100 text-green-800",
            "Ditolak": "bg-red-100 text-red-800",
        };
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Permintaan Kelas Saya</h2>
                <button onClick={onOpenModal} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                    <PlusIcon className="w-5 h-5" /> Buat Permintaan
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Mata Kuliah</th>
                            <th className="p-3 font-medium">Materi</th>
                            <th className="p-3 font-medium">Waktu</th>
                            <th className="p-3 font-medium">Rating Min. Tutor</th>
                            <th className="p-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-t border-gray-200/80">
                                <td className="p-3 font-bold text-gray-800">{req.subject}</td>
                                <td className="p-3 text-gray-600">{req.topic}</td>
                                <td className="p-3 text-gray-600">{req.date ? `${req.date}, ${req.startTime} - ${req.endTime}` : 'Fleksibel'}</td>
                                <td className="p-3"><div className="flex items-center">{[...Array(5)].map((_, i) => <StarIcon key={i} isFilled={i < req.minRating} className="w-4 h-4" />)}</div></td>
                                <td className="p-3"><StatusPill status={req.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="bg-gray-50 text-gray-600 py-16 px-8 border-t mt-8">
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


// --- Dashboard Page ---
const DashboardPage = ({ onNavigate, isLoggedIn, onLogout, newlyBookedClass, clearNewBooking }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [activeView, setActiveView] = useState('my-classes');
    const [classes, setClasses] = useState([
        {
            subject: "Basic Statistic",
            tutor: "Bohemian Ackerman",
            time: "09:00 - 12:00",
            day: "Monday",
            date: 15,
            fullDate: '2024-07-15',
            mode: "Online",
            location: "https://zoom.us/j/1234567890",
            attendees: ["https://i.pravatar.cc/24?u=a", "https://i.pravatar.cc/24?u=b"],
            status: "Sedang Berlangsung"
        },
        {
            subject: "Aljabar Linear",
            tutor: "Cohen Merritt",
            time: "13:00 - 15:00",
            day: "Wednesday",
            date: 17,
            fullDate: '2024-07-17',
            mode: "Offline",
            location: "Gedung A, Ruang 201",
            attendees: ["https://i.pravatar.cc/24?u=c", "https://i.pravatar.cc/24?u=d", "https://i.pravatar.cc/24?u=e"],
            status: "Tertunda"
        }
    ]);

    const initialHistoryData = [
        { id: 1, subject: 'Kalkulus Lanjut', tutor: 'Lukas Jacobs', date: '10 Juli 2024', fullDate: '2024-07-10', time: '10:00 - 12:00', status: 'Selesai', rating: 5 },
        { id: 2, subject: 'Struktur Data', tutor: 'Emily Carter', date: '8 Juli 2024', fullDate: '2024-07-08', time: '14:00 - 16:00', status: 'Selesai', rating: 4 },
        { id: 3, subject: 'Fisika Kuantum', tutor: 'Sofia Chen', date: '5 Juli 2024', fullDate: '2024-07-05', time: '09:00 - 11:00', status: 'Selesai', rating: null },
    ];
    const [classHistoryData, setClassHistoryData] = useState(initialHistoryData);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [selectedClassForRating, setSelectedClassForRating] = useState(null);
    
    // State for Class Requests
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [classRequests, setClassRequests] = useState([
        { id: 1, subject: 'Kalkulus', topic: 'Integral Lipat Dua', date: '2024-07-26', startTime: '10:00', endTime: '12:00', minRating: 4, status: 'Mencari Tutor' },
        { id: 2, subject: 'Fisika Dasar', topic: 'Hukum Newton & Termodinamika', date: '2024-08-01', startTime: '13:00', endTime: '15:00', minRating: 5, status: 'Diterima' },
    ]);

    const handleAddNewRequest = (newRequest) => {
        setClassRequests(prev => [...prev, { ...newRequest, id: prev.length + 1, status: 'Mencari Tutor' }]);
        setIsRequestModalOpen(false);
    };

    const handleOpenFeedbackModal = (classItem) => {
        setSelectedClassForRating(classItem);
        setIsFeedbackModalOpen(true);
    };

    const handleCloseFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
        setSelectedClassForRating(null);
    };

    const handleSubmitFeedback = (feedback) => {
        setClassHistoryData(prevHistory => 
            prevHistory.map(item => 
                item.id === selectedClassForRating.id 
                    ? { ...item, rating: feedback.rating } 
                    : item
            )
        );
        handleCloseFeedbackModal();
    };

    useEffect(() => {
        if (newlyBookedClass) {
            const today = new Date();
            const fullDate = new Date(today.getFullYear(), today.getMonth(), newlyBookedClass.date)
                           .toISOString().split('T')[0];
            
            const translatedClass = {
                ...newlyBookedClass,
                status: "Tertunda", // Map "Pending" to "Tertunda"
                fullDate: fullDate,
            };
            setShowNotification(true);
            setClasses(prev => [translatedClass, ...prev]);
        }
    }, [newlyBookedClass]);

    const handleDismissNotification = () => {
        setShowNotification(false);
        clearNewBooking();
    };
    
    const allEvents = [...classes, ...classHistoryData];

    return (
        <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #fce7f3, #f3e8ff, #faf5ff)'}}>
            <FeedbackModal 
                isOpen={isFeedbackModalOpen}
                onClose={handleCloseFeedbackModal}
                onSubmit={handleSubmitFeedback}
                tutorName={selectedClassForRating?.tutor}
            />
             <RequestClassModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                onSubmit={handleAddNewRequest}
            />
            <DashboardHeader onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage="dashboard" />
            <div className="flex h-screen pt-24">
                <Sidebar onNavigate={onNavigate} activeView={activeView} setActiveView={setActiveView} />
                <main className="flex-1 p-8 overflow-y-auto">
                    {showNotification && (
                         <NotificationBanner 
                            message={`Pendaftaran kelas "${newlyBookedClass.subject}" berhasil! Menunggu konfirmasi dari tutor.`}
                            onDismiss={handleDismissNotification}
                         />
                    )}
                    <ContentHeader onAddClassClick={() => setActiveView('requests')} />
                    <StatsBar />
                    
                    <div className="animate-fade-in mt-8">
                        {activeView === 'my-classes' && <MyClasses classes={classes.filter(c => c.status !== 'Selesai')} />}
                        {activeView === 'history' && <ClassHistory historyData={classHistoryData} onOpenFeedbackModal={handleOpenFeedbackModal} />}
                        {activeView === 'requests' && <ClassRequestView requests={classRequests} onOpenModal={() => setIsRequestModalOpen(true)} />}
                        {activeView === 'calendar' && <CalendarWidget events={allEvents} />}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;