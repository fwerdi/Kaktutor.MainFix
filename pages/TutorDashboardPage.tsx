

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    DashboardIcon, ChatIcon, ReceiptIcon, SettingsIcon, HelpIcon,
    ClockIcon, CheckBadgeIcon, UsersIcon, PlusIcon, MenuIcon, CloseIcon,
    LocationMarkerIcon, VideoCameraIcon, DescriptionIcon, StarIcon, TrashIcon,
    CrownIcon, BellIcon, CheckCircleIcon, BankIcon,
    HomeIcon, MailIcon, GithubIcon
} from '../components/Icons';


// --- New Components for Withdrawal Feature ---
const WithdrawSuccessNotification = ({ show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed top-28 right-8 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl z-50 animate-fade-in-down">
            <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6" />
                <div>
                    <p className="font-bold">Penarikan Berhasil!</p>
                    <p className="text-sm">Dana akan dikirim dalam 1x24 jam.</p>
                </div>
            </div>
            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down { animation: fadeInDown 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

const WithdrawModal = ({ isOpen, onClose, maxAmount, onConfirm }) => {
    const [amount, setAmount] = useState(0);
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setAmount(0); // Reset form when modal opens
            setBank('');
            setAccountNumber('');
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);
    
    if (!isOpen) return null;

    const isConfirmDisabled = amount === 0 || !bank || !accountNumber.trim();
    const sliderPercentage = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" style={{ animationDuration: '0.2s' }}>
            <div ref={modalRef} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tarik Pendapatan</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="bank-select" className="block text-sm font-medium text-gray-700">Pilih Bank</label>
                        <select id="bank-select" value={bank} onChange={(e) => setBank(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                            <option value="">-- Pilih Bank Tujuan --</option>
                            <option>Bank Central Asia (BCA)</option>
                            <option>Bank Mandiri</option>
                            <option>Bank Negara Indonesia (BNI)</option>
                            <option>Bank Rakyat Indonesia (BRI)</option>
                            <option>CIMB Niaga</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">Nomor Rekening</label>
                        <input type="number" id="account-number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Masukkan nomor rekening" className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="amount-slider" className="block text-sm font-medium text-gray-700">Jumlah Penarikan</label>
                        <div className="flex items-center gap-4 mt-2">
                            <input
                                id="amount-slider"
                                type="range"
                                min="0"
                                max={maxAmount}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                                style={{
                                    '--slider-percentage': `${sliderPercentage}%`
                                } as React.CSSProperties}
                            />
                            <span className="font-bold text-lg text-teal-700 w-40 text-right">Rp {amount.toLocaleString('id-ID')}</span>
                        </div>
                         <style>{`
                            .range-slider { -webkit-appearance: none; width: 100%; height: 8px; border-radius: 5px; background: #e5e7eb; outline: none; }
                            .range-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #14B8A6; cursor: pointer; }
                            .range-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #14B8A6; cursor: pointer; }
                            .range-slider { background: linear-gradient(to right, #14B8A6 0%, #14B8A6 var(--slider-percentage), #e5e7eb var(--slider-percentage), #e5e7eb 100%); }
                        `}</style>
                        <p className="text-xs text-gray-500 mt-1 text-right">Saldo Tersedia: Rp {maxAmount.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                 <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                    <button onClick={() => onConfirm({ amount, bank, accountNumber })} disabled={isConfirmDisabled} className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed">
                        Konfirmasi Penarikan
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Shared Header Components ---
const LoggedInUserMenu = ({ onLogout, onNavigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const menuRef = useRef(null);

    // Dummy data for notifications
    const hasUnread = true;
    const notifications = [
        { icon: <PlusIcon className="w-5 h-5 text-yellow-500" />, text: "Permintaan pemesanan baru dari Citra Lestari.", time: "2 menit lalu" },
        { icon: <ClockIcon className="w-5 h-5 text-blue-500" />, text: "Kelas Mendatang: Dasar Pemrograman dalam 30 menit.", time: "15 menit lalu" },
        { icon: <ChatIcon className="w-5 h-5 text-purple-500" />, text: "Pesan baru dari Budi Santoso.", time: "3 jam lalu" },
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
                    <img onClick={() => onNavigate('dashboard')} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt="Tutor profile" className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 cursor-pointer" />
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
            <span className={isActive ? 'text-black' : 'text-gray-600 hover:text-black'}>{text}</span>
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
                         {isLoggedIn && <NavLink text="TUGAS SAYA" isActive={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />}
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
const TutorSidebar = ({ onNavigate, view, setView }) => {
    
    const NavLink = ({ icon, text, viewName, page }: { icon: React.ReactNode, text: string, viewName?: string, page?: string }) => (
        <button
            onClick={() => {
                 if (viewName) {
                    setView(viewName);
                } else if (page) {
                    onNavigate(page);
                }
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                view === viewName
                    ? 'bg-teal-600 text-white'
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
                <NavLink icon={<DashboardIcon className="w-5 h-5" />} text="Dasbor" viewName="dashboard" />
                <NavLink icon={<ClockIcon className="w-5 h-5" />} text="Jadwal Saya" viewName="schedule" />
                <NavLink icon={<CheckBadgeIcon className="w-5 h-5" />} text="Riwayat Kelas" viewName="history" />
                <NavLink icon={<UsersIcon className="w-5 h-5" />} text="Permintaan Siswa" viewName="requests" />
                <NavLink icon={<ReceiptIcon className="w-5 h-5" />} text="Pendapatan" viewName="earnings" />
                <NavLink icon={<ChatIcon className="w-5 h-5" />} text="Pesan" page="chat" />
            </nav>
            <div className="mt-auto space-y-1">
                 <NavLink icon={<SettingsIcon className="w-5 h-5" />} text="Pengaturan" viewName="settings" />
                 <NavLink icon={<HelpIcon className="w-5 h-5" />} text="Bantuan & Dukungan" page="home" />
            </div>
        </aside>
    );
};


// --- Main Content Components ---

const ContentHeader = ({ setView }) => {
    const today = new Date();
    const dateString = today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <header className="flex justify-between items-center mb-6">
            <div>
                <p className="text-gray-500">{dateString}</p>
                <h1 className="text-4xl font-bold text-gray-800">Selamat datang kembali, Sarkozy!</h1>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setView('schedule')}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" /> Tambah Kelas Baru
                </button>
            </div>
        </header>
    );
};

const StatCard: React.FC<{
    icon: React.ReactElement<{ className?: string }>;
    value: string;
    title: string;
    colorClass: { bg: string; text: string };
}> = ({ icon, value, title, colorClass }) => (
    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl">
        <div className={`p-3 rounded-full ${colorClass.bg}`}>
            {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass.text}` })}
        </div>
        <div>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-gray-500">{title}</p>
        </div>
    </div>
);

const StatsBar = () => {
    const stats = [
        { icon: <UsersIcon />, value: "32", title: "Total Siswa", colorClass: { bg: 'bg-blue-100', text: 'text-blue-600' } },
        { icon: <CheckBadgeIcon />, value: "18", title: "Kelas Selesai", colorClass: { bg: 'bg-green-100', text: 'text-green-600' } },
        { icon: <ClockIcon />, value: "5", title: "Kelas Mendatang", colorClass: { bg: 'bg-yellow-100', text: 'text-yellow-600' } }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

const MyClasses = ({ classes }) => {
    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Kelas Hari Ini</h2>
            <div className="space-y-4">
                {classes.map((c, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-200/80 bg-white/50">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{c.subject}</h3>
                                <p className="text-gray-600 mt-1">{c.time}</p>
                                <p className="text-gray-600 mt-2">{c.studentName} • {c.mode}</p>
                                <a
                                    href={c.mode === 'Online' ? c.location : '#'}
                                    target={c.mode === 'Online' ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-semibold hover:underline mt-2 inline-block"
                                >
                                    {c.mode === 'Online' ? 'Tautan Zoom' : c.location}
                                </a>
                            </div>
                            <div className="flex items-center -space-x-2">
                                {c.attendees.map((img, i) => <img key={i} src={img} alt="attendee" className="w-8 h-8 rounded-full border-2 border-white" />)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentRequests = ({ requests, onAccept, onDecline }) => {
    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Permintaan Siswa</h2>
            <div className="space-y-3">
                {requests.map((req, index) => (
                    <div key={index} className="p-3 rounded-lg border border-gray-200/80">
                        <div className="flex items-center gap-3">
                            <img src={req.imgSrc} alt={req.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-gray-800">{req.name}</p>
                                <p className="text-xs text-gray-500">{req.class} - {req.day}, {req.startTime}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 my-2">{req.message}</p>
                        {req.status === 'Pending' ? (
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => onDecline(req.id)} className="w-full text-sm py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold text-gray-700">Tolak</button>
                                <button onClick={() => onAccept(req.id)} className="w-full text-sm py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold">Terima</button>
                            </div>
                        ) : (
                            <p className={`text-sm font-semibold text-center mt-2 ${req.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                                {req.status === 'Accepted' ? 'Diterima' : 'Ditolak'}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const EarningsView = ({ earnings, onOpenWithdrawModal }) => {
    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pendapatan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-teal-50 rounded-lg">
                    <p className="text-sm text-teal-800 font-semibold">Pendapatan Bulan Ini</p>
                    <p className="text-3xl font-bold text-teal-900">Rp {earnings.monthly.toLocaleString('id-ID')}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800 font-semibold">Total Saldo Tersedia</p>
                    <p className="text-3xl font-bold text-purple-900">Rp {earnings.total.toLocaleString('id-ID')}</p>
                </div>
            </div>
             <div className="text-center mb-6">
                 <button onClick={onOpenWithdrawModal} className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Tarik Dana
                </button>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Riwayat Transaksi</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Tanggal</th>
                            <th className="p-3 font-medium">Siswa</th>
                            <th className="p-3 font-medium">Kelas</th>
                            <th className="p-3 font-medium text-right">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {earnings.history.map((item) => (
                            <tr key={item.id} className="border-t border-gray-200/80">
                                <td className="p-3 text-gray-600">{item.date}</td>
                                <td className="p-3 font-bold text-gray-800">{item.student}</td>
                                <td className="p-3 text-gray-600">{item.class}</td>
                                <td className="p-3 text-right font-semibold text-green-700">Rp {item.amount.toLocaleString('id-ID')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TutorSettingsView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="p-6 border border-gray-200 rounded-lg bg-white/70">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Profil Publik Anda</h3>
            <p className="text-gray-600">Ini adalah bagaimana siswa akan melihat Anda. Pastikan itu mencerminkan keahlian Anda!</p>
            <button className="mt-3 px-4 py-1.5 text-sm font-semibold bg-teal-100 text-teal-800 rounded-md hover:bg-teal-200 transition-colors">Lihat Profil Publik</button>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white/70">
             <h3 className="font-semibold text-lg text-gray-800 mb-4">Informasi Rekening Bank</h3>
             <div className="flex items-center gap-4">
                 <BankIcon className="w-10 h-10 text-gray-500" />
                 <div>
                    <p className="font-semibold text-gray-800">Bank Central Asia (BCA)</p>
                    <p className="text-gray-600">**** **** **** 1234</p>
                 </div>
             </div>
             <button className="mt-4 px-4 py-1.5 text-sm font-semibold bg-teal-100 text-teal-800 rounded-md hover:bg-teal-200 transition-colors">Ubah Rekening Bank</button>
        </div>
    </div>
);


const TutorClassHistoryView = ({ history }) => (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50 animate-fade-in">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Riwayat Kelas</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-gray-500">
                    <tr>
                        <th className="p-3 font-medium">Tanggal</th>
                        <th className="p-3 font-medium">Siswa</th>
                        <th className="p-3 font-medium">Kelas</th>
                        <th className="p-3 font-medium text-right">Pendapatan</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item) => (
                        <tr key={item.id} className="border-t border-gray-200/80">
                            <td className="p-3 text-gray-600">{item.date}</td>
                            <td className="p-3 font-semibold text-gray-800">{item.student}</td>
                            <td className="p-3 text-gray-600">{item.class}</td>
                            <td className="p-3 text-right font-semibold text-green-700">Rp {item.earnings.toLocaleString('id-ID')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const AddClassModal = ({ isOpen, onClose, onAdd, selectedDate }) => {
    const [classData, setClassData] = useState({
        subject: '',
        startTime: '09:00',
        endTime: '10:00',
        mode: 'Online',
        location: ''
    });
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
        setClassData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...classData, date: selectedDate });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" style={{ animationDuration: '0.2s' }}>
            <div ref={modalRef} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Jadwal Kelas Baru</h2>
                <p className="text-gray-600 mb-4">Untuk tanggal: <span className="font-semibold">{selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</span></p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
                        <input name="subject" value={classData.subject} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Aljabar Linear" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jam Mulai</label>
                            <input type="time" name="startTime" value={classData.startTime} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jam Selesai</label>
                            <input type="time" name="endTime" value={classData.endTime} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mode</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="mode" value="Online" checked={classData.mode === 'Online'} onChange={handleChange} className="mr-2" />
                                <span className="text-sm font-medium text-gray-700">Online</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="mode" value="Offline" checked={classData.mode === 'Offline'} onChange={handleChange} className="mr-2" />
                                <span className="text-sm font-medium text-gray-700">Offline</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{classData.mode === 'Online' ? 'Tautan Meeting' : 'Lokasi'}</label>
                        <input name="location" value={classData.location} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" placeholder={classData.mode === 'Online' ? 'https://zoom.us/j/...' : 'Gedung A, Ruang 101'} />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 font-semibold rounded-lg hover:bg-gray-300">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">Tambah Kelas</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ScheduleCalendarView = ({ events, onDayClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date("2025-11-01"));

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay(); // Sunday is 0, Monday is 1, etc.
    const daysInMonth = endOfMonth.getDate();

    const calendarDays = [];
    // Adjust for starting the week on Monday (Senin)
    const startingDayIndex = startDay === 0 ? 6 : startDay - 1; 

    for (let i = 0; i < startingDayIndex; i++) { calendarDays.push(null); }
    for (let i = 1; i <= daysInMonth; i++) { calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i)); }

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const eventsByDate = events.reduce((acc, event) => {
        const dateStr = new Date(event.date).toISOString().split('T')[0];
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(event);
        return acc;
    }, {});

    return (
        <div className="p-6 border border-gray-200 rounded-lg bg-white/70 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">&lt;</button>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
                    <div key={day} className="font-semibold text-gray-500 pb-2 text-sm">{day}</div>
                ))}
                {calendarDays.map((day, index) => {
                    const dayStr = day ? day.toISOString().split('T')[0] : '';
                    const dayEvents = day ? eventsByDate[dayStr] || [] : [];
                    const isToday = day && day.toDateString() === new Date().toDateString();
                    return (
                        <div key={index} onClick={() => day && onDayClick(day)} className="h-28 border border-gray-100 rounded-md p-1.5 flex flex-col cursor-pointer hover:bg-gray-50 transition-colors">
                            {day ? (
                                <>
                                    <span className={`text-sm self-start font-medium ${isToday ? 'bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold' : 'text-gray-600'}`}>{day.getDate()}</span>
                                    <div className="mt-1 space-y-1 overflow-y-auto text-left">
                                        {dayEvents.map(event => (
                                            <div key={event.id} className="bg-teal-100 text-teal-800 rounded px-1.5 py-0.5 text-xs truncate">
                                                {event.startTime} {event.subject}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- TutorDashboardPage ---
const TutorDashboardPage = ({ onNavigate, isLoggedIn, onLogout, activePage }) => {
    const [view, setView] = useState('dashboard');
    const [requests, setRequests] = useState([
        { id: 1, name: 'Citra Lestari', imgSrc: 'https://i.pravatar.cc/40?u=citra', class: 'Dasar Pemrograman', day: 'Jumat', startTime: '13:00', message: 'Halo kak, saya ingin booking untuk sesi ini. Terima kasih!', status: 'Pending' },
        { id: 2, name: 'Budi Santoso', imgSrc: 'https://i.pravatar.cc/40?u=budi', class: 'Aljabar Linear', day: 'Sabtu', startTime: '10:00', message: 'Permisi kak, apakah slot ini masih tersedia?', status: 'Pending' }
    ]);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
    const [earningsData, setEarningsData] = useState({
        monthly: 3500000, total: 27800000,
        history: [
            { id: 1, date: '15 Jul 2024', student: 'Aulia Putri', class: 'Kalkulus Lanjut', amount: 150000 },
            { id: 2, date: '14 Jul 2024', student: 'Budi Santoso', class: 'Aljabar Linear', amount: 125000 },
            { id: 3, date: '12 Jul 2024', student: 'Citra Lestari', class: 'Dasar Pemrograman', amount: 150000 },
        ]
    });
    
    // New state for calendar schedule and history
    const [scheduleEvents, setScheduleEvents] = useState([
        { id: 1, date: new Date(2025, 10, 12), subject: 'Kalkulus', student: 'Budi S.', startTime: '10:00', endTime: '12:00', mode: 'Online', location: 'zoom.link' },
        { id: 2, date: new Date(2025, 10, 15), subject: 'Fisika', student: 'Citra L.', startTime: '13:00', endTime: '15:00', mode: 'Offline', location: 'Perpustakaan Kota' },
        { id: 3, date: new Date(2025, 10, 15), subject: 'Aljabar', student: 'Dewi W.', startTime: '16:00', endTime: '17:00', mode: 'Online', location: 'meet.google.com' },
    ]);
    const [classHistory, setClassHistory] = useState([
        { id: 1, date: '15 Jul 2024', student: 'Aulia Putri', class: 'Kalkulus Lanjut', earnings: 150000 },
        { id: 2, date: '14 Jul 2024', student: 'Budi Santoso', class: 'Aljabar Linear', earnings: 125000 },
        { id: 3, date: '12 Jul 2024', student: 'Citra Lestari', class: 'Dasar Pemrograman', earnings: 150000 },
    ]);
    const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
    const [selectedDateForModal, setSelectedDateForModal] = useState(new Date());


    const handleOpenAddClassModal = (date) => {
        setSelectedDateForModal(date);
        setIsAddClassModalOpen(true);
    };

    const handleAddClass = (classData) => {
        const newClass = {
            ...classData,
            id: scheduleEvents.length + 1,
            student: 'N/A', // Add placeholder since student name field is removed
        };
        setScheduleEvents(prev => [...prev, newClass]);
    };

    const handleConfirmWithdrawal = ({ amount }) => {
        setEarningsData(prev => ({
            ...prev,
            total: prev.total - amount,
            monthly: Math.max(0, prev.monthly - amount), 
        }));
        setIsWithdrawModalOpen(false);
        setShowWithdrawSuccess(true);
    };

    const handleAcceptRequest = (id) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Accepted' } : r));
    };
    
    const handleDeclineRequest = (id) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Declined' } : r));
    };

    const classesToday = [
        { subject: "Dasar Pemrograman", time: "13:00 - 15:00", studentName: "Citra Lestari", mode: "Online", location: "https://zoom.us/j/12345", attendees: ["https://i.pravatar.cc/24?u=citra"] }
    ];

    const renderContent = () => {
        switch (view) {
            case 'dashboard':
                return (
                    <div className="animate-fade-in">
                        <ContentHeader setView={setView} />
                        <StatsBar />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                            <MyClasses classes={classesToday} />
                            <StudentRequests requests={requests} onAccept={handleAcceptRequest} onDecline={handleDeclineRequest} />
                        </div>
                    </div>
                );
            case 'schedule':
                return <ScheduleCalendarView events={scheduleEvents} onDayClick={handleOpenAddClassModal} />;
            case 'history':
                return <TutorClassHistoryView history={classHistory} />;
            case 'requests':
                return <StudentRequests requests={requests} onAccept={handleAcceptRequest} onDecline={handleDeclineRequest} />;
            case 'earnings':
                return <EarningsView earnings={earningsData} onOpenWithdrawModal={() => setIsWithdrawModalOpen(true)} />;
            case 'settings':
                return <TutorSettingsView />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #f3e8ff, #eef2ff, #faf5ff)'}}>
            <WithdrawModal 
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                maxAmount={earningsData.total}
                onConfirm={handleConfirmWithdrawal}
            />
            <AddClassModal 
                 isOpen={isAddClassModalOpen}
                 onClose={() => setIsAddClassModalOpen(false)}
                 onAdd={handleAddClass}
                 selectedDate={selectedDateForModal}
             />
            <WithdrawSuccessNotification 
                show={showWithdrawSuccess} 
                onClose={() => setShowWithdrawSuccess(false)} 
            />
            <DashboardHeader onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage="dashboard" />
            <div className="flex h-screen pt-24">
                <TutorSidebar onNavigate={onNavigate} view={view} setView={setView} />
                <main className="flex-1 p-8 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};
export default TutorDashboardPage;