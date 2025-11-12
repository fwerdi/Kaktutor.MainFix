
import React, { useState } from 'react';
import { BackArrowIcon, StarIcon, HeartIcon, ShareIcon, LocationMarkerIcon, VideoCameraIcon, DescriptionIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

const PageHeader = ({ onNavigate }) => (
    <header className="bg-white/80 backdrop-blur-sm py-3 px-8 sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
            <button onClick={() => onNavigate('tutorList')} className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors font-semibold">
                <BackArrowIcon className="w-5 h-5" />
                Kembali ke Pencarian
            </button>
            <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
                <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
            </button>
             <div className="w-48"></div> {/* Spacer */}
        </div>
    </header>
);

// FIX: Typed the `ReviewCard` component using `React.FC` to resolve the error about the 'key' prop.
const ReviewCard: React.FC<{ name: string; avatar: string; rating: number; date: string; review: string; }> = ({ name, avatar, rating, date, review }) => (
    <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center mb-2">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
            <div className="ml-3">
                <p className="font-bold text-gray-800">{name}</p>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} isFilled={i < rating} className="w-4 h-4" />)}
                    <span className="text-xs text-gray-500 ml-2">{date}</span>
                </div>
            </div>
        </div>
        <p className="text-gray-600">{review}</p>
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

const TutorDetailPage = ({ onNavigate }) => {
    
    const [isReserving, setIsReserving] = useState(false);

    const handleReserveClick = () => {
        setIsReserving(true);
        setTimeout(() => {
            onNavigate('payment');
            setIsReserving(false);
        }, 1500);
    };

    const tutor = {
        name: "Fadil",
        rating: 5,
        reviewsCount: 42,
        imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        tags: ["Matematika", "Aljabar", "Statistik", "Trigonometri", "Kalkulus"],
        headline: "Pengalaman 12+ tahun mengajar Matematika: AP Calculus; Kurikulum IB; Kurikulum IGCSE, A Level dan O Level, dan Persiapan Tes: SAT dan ACT",
        about: "Saya Fadil, seorang guru matematika dengan pengalaman lebih dari 12 tahun. Saya bersemangat membantu siswa memahami konsep-konsep yang sulit dengan cara yang mudah dan menyenangkan. Saya percaya setiap siswa memiliki potensi untuk berhasil, dan tugas saya adalah membimbing mereka untuk mencapai potensi tersebut.",
        locations: [
            { type: "Di rumah Fadil", icon: <LocationMarkerIcon /> },
            { type: "Online", icon: <VideoCameraIcon /> },
            { type: "Di rumah Anda atau di tempat publik", icon: <DescriptionIcon />, detail: "Bisa berpergian sampai 20 km" }
        ],
        reviews: [
            { name: "John Doe", avatar: "https://i.pravatar.cc/40?u=john", rating: 5, date: "2 minggu lalu", review: "Penjelasan Kak Fadil sangat mudah dimengerti! Nilai kalkulus saya langsung meningkat. Terima kasih banyak, Kak!" },
            { name: "Jane Smith", avatar: "https://i.pravatar.cc/40?u=jane", rating: 5, date: "1 bulan lalu", review: "Sangat sabar dan metode mengajarnya asyik. Belajar matematika jadi tidak membosankan. Recommended!" }
        ],
        tariff: "Rp500,000",
        response: "2 jam",
        students: "50+"
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader onNavigate={onNavigate} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="w-full lg:w-2/3">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tutor.tags.map(tag => <span key={tag} className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">{tag}</span>)}
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">{tutor.headline}</h1>

                        <div className="mt-10">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Lokasi kursus</h2>
                            <div className="flex flex-wrap gap-3">
                                {tutor.locations.map((loc, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                                        <div className="flex items-center gap-2 text-gray-900">
                                            {loc.icon}
                                            <span className="font-semibold">{loc.type}</span>
                                        </div>
                                        {loc.detail && <p className="text-xs text-gray-900 mt-1 pl-7">{loc.detail}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Tentang {tutor.name}</h2>
                            <p className="text-gray-800 leading-relaxed">{tutor.about}</p>
                        </div>

                         <div className="mt-10">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Ulasan dari murid ({tutor.reviews.length})</h2>
                            <div className="space-y-6">
                                {tutor.reviews.map((review, index) => <ReviewCard key={index} {...review} />)}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sticky Card) */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                            <div className="flex justify-center mb-4 relative">
                                <img src={tutor.imgSrc} alt={tutor.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                                <span className="absolute bottom-0 right-1/2 translate-x-[4rem] bg-purple-100 text-purple-700 p-2 rounded-full">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </span>
                                <div className="absolute top-0 right-0 flex gap-2">
                                     <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"><HeartIcon className="w-5 h-5 text-gray-600" /></button>
                                     <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"><ShareIcon className="w-5 h-5 text-gray-600" /></button>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-center text-gray-900">{tutor.name}</h2>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <StarIcon className="w-5 h-5" />
                                <span className="font-bold">{tutor.rating}</span>
                                <a href="#" className="text-sm text-gray-500 hover:underline">({tutor.reviewsCount} ulasan)</a>
                            </div>

                            <div className="mt-6 space-y-3 text-gray-700">
                                <div className="flex justify-between"><span>Tarif</span> <span className="font-bold">{tutor.tariff}</span></div>
                                <div className="flex justify-between"><span>Respon</span> <span className="font-bold">{tutor.response}</span></div>
                                <div className="flex justify-between"><span>Murid</span> <span className="font-bold">{tutor.students}</span></div>
                            </div>

                            <button
                                onClick={handleReserveClick}
                                disabled={isReserving}
                                className="mt-6 w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center disabled:bg-red-400 disabled:cursor-wait"
                            >
                                {isReserving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    'Reservasi kursus'
                                )}
                            </button>
                            <p className="text-center mt-3">
                                <a href="#" className="text-sm font-semibold text-gray-600 hover:underline">Sesi ke 1 gratis</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TutorDetailPage;