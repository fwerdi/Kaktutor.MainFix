

import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, MenuIcon, StarIcon, HeartIcon, HomeIcon, MailIcon, GithubIcon, CloseIcon, BackArrowIcon } from '../components/Icons';

// --- Reusable Header Components ---

const LoggedInUserMenu = ({ onLogout, onNavigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-3">
                <img onClick={() => onNavigate('dashboard')} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 cursor-pointer" />
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 p-1 rounded-md hover:bg-black/10 transition-colors">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-black animate-fade-in" style={{animationDuration: '0.2s'}}>
                    <button onClick={() => { onNavigate('settings'); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pengaturan</button>
                    <button onClick={() => { onLogout(); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Keluar</button>
                </div>
            )}
        </div>
    );
};

const Header = ({ onNavigate, initialQuery, onSearchSubmit, isLoggedIn, onLogout }) => {
    const [query, setQuery] = useState(initialQuery);
    const NavLink = ({ text, onClick }) => (
        <button onClick={onClick} className="relative text-lg font-bold px-4 py-2 transition-colors duration-200 text-gray-600 hover:text-black">
            {text}
        </button>
    );
    const SmallLogo = () => (
        <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
            <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
        </button>
    );

    return (
        <header className="bg-white/80 backdrop-blur-sm text-gray-800 py-3 px-8 z-30 sticky top-0 border-b border-gray-200">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <SmallLogo />
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSearchSubmit(query); }} className="relative w-full max-w-lg">
                    <input name="search" type="text" placeholder="Cari mata pelajaran atau tutor..." value={query} onChange={(e) => setQuery(e.target.value)} className="bg-gray-100 text-gray-800 placeholder-gray-500 rounded-full py-2.5 px-6 w-full focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {query && <button type="button" onClick={() => setQuery('')} className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"><CloseIcon className="w-5 h-5" /></button>}
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"><SearchIcon className="w-5 h-5" /></button>
                </form>
                <div className="flex items-center gap-6">
                    {isLoggedIn ? <LoggedInUserMenu onLogout={onLogout} onNavigate={onNavigate} /> : (
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

// --- Tutor Card Component ---
const TutorListCard: React.FC<{ tutor: any, onNavigate: (page: string) => void }> = ({ tutor, onNavigate }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">
        <div className="relative">
            <img src={tutor.imgSrc} alt={tutor.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
            <button className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200">
                <HeartIcon className="w-5 h-5" />
            </button>
        </div>
        <div className="p-5">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{tutor.location}</p>
                </div>
                {tutor.badge && (
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{tutor.badge}</span>
                )}
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm">
                <StarIcon className="w-5 h-5" />
                <span className="font-bold text-gray-700">{tutor.rating}</span>
                <span className="text-gray-500">({tutor.reviews} ulasan)</span>
            </div>
            <p className="text-gray-600 mt-3 text-sm h-10 overflow-hidden">{tutor.description}</p>
            <button 
                onClick={() => onNavigate('tutorDetail')}
                className="mt-4 w-full bg-white text-purple-600 border-2 border-purple-500 font-bold py-2.5 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-200">
                Lihat Profil
            </button>
        </div>
    </div>
);

// --- Footer Component ---
const Footer = () => (
    <footer className="bg-white py-16 px-8 border-t border-gray-200 mt-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 text-gray-600">
            <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-black">Kak Tutor</h3>
                <div className="flex gap-4 mt-4 text-gray-500">
                    <a href="#" className="hover:text-black"><HomeIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-black"><MailIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-black"><GithubIcon className="w-5 h-5"/></a>
                </div>
            </div>
            <div><h4 className="font-bold mb-4 text-black">Topik</h4><ul className="space-y-2"><li><a href="#" className="hover:underline">Halaman</a></li><li><a href="#" className="hover:underline">Halaman</a></li></ul></div>
            <div><h4 className="font-bold mb-4 text-black">Topik</h4><ul className="space-y-2"><li><a href="#" className="hover:underline">Halaman</a></li><li><a href="#" className="hover:underline">Halaman</a></li></ul></div>
            <div><h4 className="font-bold mb-4 text-black">Topik</h4><ul className="space-y-2"><li><a href="#" className="hover:underline">Halaman</a></li><li><a href="#" className="hover:underline">Halaman</a></li></ul></div>
        </div>
    </footer>
);

// --- Dummy Data ---
const tutorsData = [
    { name: 'Fadil', imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', location: 'Jakarta (tatap muka & online)', rating: 5, reviews: 42, badge: 'Duta Besar', description: 'Pengalaman 12+ tahun mengajar Matematika: AP Calculus, Aljabar, dan Geometri.' },
    { name: 'Fitria', imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop', location: 'DKI Jakarta (tatap muka & online)', rating: 4.9, reviews: 53, badge: 'Duta Besar', description: 'GARANSI! Lulusan teknik kimia UNS 7 tahun pengalaman mengajar.' },
    { name: 'Dikey Putra', imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', location: 'Kecamatan Mulyorejo (online)', rating: 4.9, reviews: 39, badge: 'Duta Besar', description: 'Lulusan S2 menawarkan Kursus Matematika untuk persiapan ujian.' },
    { name: 'Emily Carter', imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', location: 'Bandung (online)', rating: 5, reviews: 61, badge: 'Tutor Populer', description: 'Spesialis Biologi Molekuler dengan metode belajar yang menyenangkan.' },
    { name: 'Michael Brown', imgSrc: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop', location: 'Surabaya (tatap muka & online)', rating: 4.8, reviews: 75, badge: 'Duta Besar', description: 'Mentor Desain Grafis & UI/UX dengan pengalaman industri 10 tahun.' },
    { name: 'Sofia Chen', imgSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', location: 'Yogyakarta (online)', rating: 5, reviews: 88, badge: 'Tutor Populer', description: 'Tutor Fisika Kuantum & Astrofisika, membuat konsep sulit jadi mudah.' },
];

// --- Main Page Component ---
const TutorListPage = ({ searchQuery, onNavigate, onSearchSubmit, isLoggedIn, onLogout }) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header onNavigate={onNavigate} initialQuery={searchQuery} onSearchSubmit={onSearchSubmit} isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <main className="container mx-auto py-12 px-8">
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors mb-6"
                >
                    <BackArrowIcon className="w-4 h-4" />
                    Kembali ke Beranda
                </button>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Hasil pencarian untuk: <span className="text-purple-600">{searchQuery || "Semua Tutor"}</span>
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {tutorsData.map((tutor, index) => (
                        <TutorListCard key={index} tutor={tutor} onNavigate={onNavigate} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default TutorListPage;