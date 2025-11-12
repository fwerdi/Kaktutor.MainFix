

import React, { useState } from 'react';
import { BackArrowIcon, TrashIcon, UploadIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

// Sub-component for Profile Settings
const ProfileSettings = () => (
    <div className="space-y-8 animate-fade-in" style={{animationDuration: '0.3s'}}>
        {/* Profile Picture Section */}
        <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Foto Profil</h3>
            <div className="flex items-center gap-6">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150" alt="User profile" className="w-24 h-24 rounded-full object-cover" />
                <div className="flex gap-2">
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                        <TrashIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition-colors">
                        <UploadIcon className="w-5 h-5" />
                        UNGGAH
                    </button>
                </div>
            </div>
        </div>

        {/* Name Section */}
        <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">Nama</h3>
                <button className="px-4 py-1.5 text-sm font-semibold bg-fuchsia-100 text-fuchsia-800 rounded-md hover:bg-fuchsia-200 transition-colors">Ubah</button>
            </div>
            <p className="text-gray-600">Uzumaki Dimas</p>
        </div>

        {/* Contacts Section */}
        <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-gray-800">Kontak</h3>
                <button className="px-4 py-1.5 text-sm font-semibold bg-fuchsia-100 text-fuchsia-800 rounded-md hover:bg-fuchsia-200 transition-colors">Ubah</button>
            </div>
            <div className="space-y-2 text-gray-600">
                <p><span className="font-medium text-gray-700">Telepon :</span> 0811-2222-3333</p>
                <p><span className="font-medium text-gray-700">Email :</span> Dimas99@gmail.com</p>
                <p><span className="font-medium text-gray-700">Facebook :</span> -</p>
            </div>
        </div>

        {/* Level Section */}
        <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Level</h3>
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">Pemula</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-800">50/100 PENG</span>
            </div>
        </div>
    </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ label, id, defaultChecked = false }) => (
    <div className="flex items-center justify-between py-3">
        <label htmlFor={id} className="text-gray-700">{label}</label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name={id} id={id} defaultChecked={defaultChecked} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label htmlFor={id} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        <style>{`.toggle-checkbox:checked { right: 0; border-color: #A855F7; } .toggle-checkbox:checked + .toggle-label { background-color: #A855F7; }`}</style>
    </div>
);


// Sub-component for Notification Settings
const NotificationSettings = () => (
    <div className="animate-fade-in" style={{animationDuration: '0.3s'}}>
        <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Notifikasi Sesi & Kelas</h3>
            <div className="divide-y divide-gray-200">
                <ToggleSwitch label="Pengingat Sesi" id="session-reminder" defaultChecked />
                <ToggleSwitch label="Peringatan Penjadwalan Ulang atau Pembatalan" id="reschedule-alerts" defaultChecked />
                <ToggleSwitch label="Pengingat Umpan Balik Sesi" id="feedback-reminder" defaultChecked />
            </div>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg mt-8">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Komunitas & Interaksi</h3>
            <div className="divide-y divide-gray-200">
                <ToggleSwitch label="Pembaruan Postingan atau Diskusi Baru" id="post-updates" defaultChecked />
                <ToggleSwitch label="Undangan Acara" id="event-invitations" />
            </div>
        </div>
    </div>
);

// Sub-component for Login & Security Settings
const LoginSecuritySettings = () => (
    <div className="space-y-8 animate-fade-in" style={{animationDuration: '0.3s'}}>
        {/* Password Section */}
        <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">Kata Sandi</h3>
                    <p className="text-gray-600 mt-1">Kata Sandi : D******3</p>
                    <p className="text-sm mt-2">Tingkat Keamanan : <span className="font-semibold text-yellow-600">Sedang</span></p>
                </div>
                <button className="px-4 py-1.5 text-sm font-semibold bg-fuchsia-100 text-fuchsia-800 rounded-md hover:bg-fuchsia-200 transition-colors">Ubah</button>
            </div>
        </div>

        {/* Two-Factor Authentication Section */}
        <div className="p-6 border border-gray-200 rounded-lg">
             <h3 className="font-semibold text-lg text-gray-800 mb-4">Autentikasi Dua Faktor (2FA)</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-700 font-medium">Email</p>
                        <p className="text-sm text-gray-500">Dimas99@gmail.com</p>
                    </div>
                     <button className="px-4 py-1.5 text-sm font-semibold bg-fuchsia-100 text-fuchsia-800 rounded-md hover:bg-fuchsia-200 transition-colors">Hubungkan</button>
                </div>
                 <div className="flex justify-between items-center">
                     <p className="text-gray-700 font-medium">SMS</p>
                     <button className="px-4 py-1.5 text-sm font-semibold bg-fuchsia-100 text-fuchsia-800 rounded-md hover:bg-fuchsia-200 transition-colors">Hubungkan</button>
                </div>
                 <div className="flex justify-between items-center">
                     <p className="text-gray-700 font-medium">Google Authenticator</p>
                     <button className="px-4 py-1.5 text-sm font-semibold bg-fuchsia-100 text-fuchsia-800 rounded-md hover:bg-fuchsia-200 transition-colors">Hubungkan</button>
                </div>
             </div>
        </div>

        {/* Login Activity Section */}
        <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
                 <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Aktivitas Masuk</h3>
                    <p className="text-gray-700 font-medium mb-2">Perangkat Terhubung:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Lenava TingPet E14</li>
                        <li>Ipong 16 Promag</li>
                        <li>Ipet Eir M3</li>
                    </ul>
                </div>
                <button className="px-4 py-1.5 text-sm font-semibold bg-fuchsia-100 text-fuchsia-800 rounded-md hover:bg-fuchsia-200 transition-colors self-start">Keluar dari Semua Perangkat</button>
            </div>
        </div>
    </div>
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


const SettingsPage = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettings />;
            case 'notification':
                return <NotificationSettings />;
            case 'login':
                return <LoginSecuritySettings />;
            default:
                return <ProfileSettings />;
        }
    };
    
    // FIX: Use React.FC to correctly type the component and its children prop.
    const NavLink: React.FC<{ tabName: string; children: React.ReactNode }> = ({ tabName, children }) => {
        const isActive = activeTab === tabName;
        const baseClasses = "w-full text-left px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm";
        const activeClasses = "bg-fuchsia-100 text-fuchsia-700";
        const inactiveClasses = "text-gray-600 hover:bg-gray-100";
        
        return (
            <button onClick={() => setActiveTab(tabName)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                {children}
            </button>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-b from-purple-100 to-transparent py-4 px-8 sticky top-0 z-30">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => onNavigate('home')} className="text-gray-700 hover:text-black transition-colors">
                            <BackArrowIcon className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">Pengaturan</h1>
                    </div>
                     <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
                        <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="md:col-span-1 bg-white p-4 rounded-lg border border-gray-200 self-start">
                        <nav className="space-y-1">
                            <NavLink tabName="profile">Profil</NavLink>
                            <NavLink tabName="notification">Notifikasi</NavLink>
                            <NavLink tabName="login">Masuk dan Keamanan</NavLink>
                        </nav>
                    </aside>
                    {/* Content */}
                    <div className="md:col-span-3">
                        {renderContent()}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SettingsPage;