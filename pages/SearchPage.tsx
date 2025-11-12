

import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, CloseIcon, YoutubeIcon, InstagramIcon, LinkedinIcon, FacebookIcon, MenuIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

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
                    <button onClick={() => { onNavigate('settings'); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Pengaturan</button>
                    <button onClick={() => { onLogout(); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Keluar
                    </button>
                </div>
            )}
        </div>
    );
};

const SearchHeader = ({ onNavigate, initialQuery, onSearchSubmit, isLoggedIn, onLogout, activePage }) => {
    const [query, setQuery] = useState(initialQuery);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(query);
    };
    
    const SmallLogo = () => (
        <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
            <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
        </button>
    );

    const NavLink = ({ text, isActive, onClick }) => (
        <button onClick={onClick} className="relative text-lg font-bold px-4 py-2 transition-colors duration-200">
            <span className={isActive ? 'text-purple-600' : 'text-gray-600 hover:text-black'}>{text}</span>
            {isActive && <div className="absolute bottom-0 left-4 right-4 h-1 bg-purple-600 rounded-full"></div>}
        </button>
    );

    return (
        <header className="bg-gradient-to-b from-purple-100 to-transparent text-gray-800 py-4 px-8 z-30 sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {/* FIX: Removed onNavigate prop from SmallLogo as it's not a valid prop for this component. The component accesses onNavigate from its closure. */}
                    <SmallLogo />
                    <nav className="flex items-center">
                        <NavLink text="BERANDA" isActive={activePage === 'home'} onClick={() => onNavigate('home')} />
                        <NavLink text="KOMUNITAS" isActive={activePage === 'community'} onClick={() => onNavigate('community')} />
                        <NavLink text="PERINGKAT" isActive={activePage === 'leaderboard'} onClick={() => onNavigate('leaderboard')} />
                         {isLoggedIn && <NavLink text="KELAS SAYA" isActive={activePage === 'dashboard' || activePage === 'chat'} onClick={() => onNavigate('dashboard')} />}
                    </nav>
                </div>
                
                <div className="flex items-center gap-6">
                     <form onSubmit={handleFormSubmit} className="relative w-full max-w-xs">
                        <input
                            name="search"
                            type="text"
                            placeholder="Cari..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-md py-1.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {query && (
                            <button type="button" onClick={() => { setQuery(''); }} className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        )}
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                            <SearchIcon className="w-4 h-4" />
                        </button>
                    </form>
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
            </div>
        </header>
    );
};

// FIX: Add explicit props type using React.FC to solve for the 'key' prop error during list rendering.
const SearchResultCard: React.FC<{ name: string; description: string; imgSrc: string; onClick: () => void }> = ({ name, description, imgSrc, onClick }) => (
  <div onClick={onClick} className="bg-white p-3 rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
    <img src={imgSrc} alt={name} className="w-full h-56 object-cover rounded-lg" />
    <h3 className="text-lg font-semibold mt-3 text-gray-800 group-hover:text-fuchsia-600 transition-colors">{name}</h3>
    <p className="text-gray-600 mt-1 text-sm">{description}</p>
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


// Placeholder Data
const searchResultsData = [
    { name: 'Mr. Amba', description: "Kelas Tutor dasar pemrograman.", imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
    { name: 'David Rodriguez', description: "Pakar Sejarah Dunia & Peradaban Kuno.", imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop' },
    { name: 'Sofia Chen', description: "Tutor Fisika Kuantum & Astrofisika.", imgSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { name: 'Emily Carter', description: "Spesialis Biologi Molekuler.", imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
    { name: 'Michael Brown', description: "Mentor Desain Grafis & UI/UX.", imgSrc: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop' },
    { name: 'Jessica Lee', description: "Ahli Ekonomi Makro dan Keuangan.", imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop' },
    { name: 'Alex Johnson', description: "Pakar Geografi Fisik dan Manusia.", imgSrc: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop' },
    { name: 'Maria Garcia', description: "Tutor Geografi Regional & Pariwisata.", imgSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { name: 'James Smith', description: "Spesialis Sistem Informasi Geografis (SIG).", imgSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
];

const SearchPage = ({ searchQuery, onNavigate, onSearchSubmit, isLoggedIn, onLogout, activePage }) => {
    return (
        <div 
          className="bg-white"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(231, 161, 233, 0.1), transparent 60%), radial-gradient(ellipse at top right, rgba(161, 204, 233, 0.1), transparent 60%), #fafbff'
          }}
        >
            <SearchHeader onNavigate={onNavigate} initialQuery={searchQuery} onSearchSubmit={onSearchSubmit} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage={activePage} />
            <main className="container mx-auto py-12 px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Hasil pencarian untuk: <span className="text-fuchsia-600">{searchQuery}</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {searchResultsData.map((item, index) => (
                        <SearchResultCard key={index} {...item} onClick={() => onNavigate('tutorDetail')} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SearchPage;