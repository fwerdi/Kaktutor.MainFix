

import React, { useState } from 'react';
import { HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

const PageHeader = ({ onNavigate }) => (
    <header className="py-4 px-8 w-full">
        <div className="container mx-auto flex items-center">
            <button onClick={() => onNavigate('community')} className="text-gray-700 hover:text-black transition-colors font-semibold">&larr; Kembali ke Komunitas</button>
        </div>
    </header>
);

const PointAnimation = ({ show, points }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg z-10 animate-point-pop text-2xl">
                +{points} Poin!
                <style>{`
                    @keyframes point-pop {
                        0% { transform: scale(0.5); opacity: 0; }
                        50% { transform: scale(1.2) translateY(-20px); opacity: 1; }
                        100% { transform: scale(1) translateY(-40px); opacity: 0; }
                    }
                    .animate-point-pop {
                        animation: point-pop 1.5s ease-out forwards;
                    }
                `}</style>
            </div>
        </div>
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

const AnswerQuestionPage = ({ onNavigate, onAnswerSubmit }) => {
    const [showAnimation, setShowAnimation] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const questionPoints = 5; // Dummy points for this question
        setShowAnimation(true);
        
        // Simulate API call and then update points and navigate
        setTimeout(() => {
            onAnswerSubmit(questionPoints); 
        }, 1500); // Duration of animation
    };
    
    // This would be dynamic data passed as props in a real app
    const question = {
        title: "Apakah Mitchel adalah manusia asli atau AI?",
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col" style={{ background: 'radial-gradient(ellipse at top right, rgba(233, 213, 255, 0.4), transparent 50%), radial-gradient(ellipse at bottom left, rgba(219, 234, 254, 0.4), transparent 50%)' }}>
            <PointAnimation show={showAnimation} points={5} />
            <PageHeader onNavigate={onNavigate} />
            <div className="flex-grow flex items-center justify-center w-full p-4">
                <div className="w-full max-w-xl">
                     <h1 className="text-2xl font-bold text-gray-400 text-center mb-4 uppercase tracking-widest">Jawab Pertanyaan</h1>
                    <div className="bg-white p-8 rounded-2xl shadow-xl animate-fade-in">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Pertanyaan</h3>
                                <p className="mt-1 text-gray-600">{question.title}</p>
                            </div>

                            <div>
                                <label htmlFor="answer" className="block text-lg font-bold text-gray-900 mb-2">Jawaban :</label>
                                <textarea
                                    id="answer"
                                    name="answer"
                                    rows={5}
                                    placeholder="Tulis jawabanmu di sini (jawaban simpel lebih cepat dipahami)"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition shadow-sm text-gray-900 placeholder-gray-500"
                                    required
                                ></textarea>
                            </div>
                            
                             <div>
                                <label htmlFor="explanation" className="block text-lg font-bold text-gray-900 mb-2">Penjelasan :</label>
                                <textarea
                                    id="explanation"
                                    name="explanation"
                                    rows={5}
                                    placeholder="Tulis penjelasanmu di sini (sertakan langkah-langkah jika perlu)"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition shadow-sm text-gray-900 placeholder-gray-500"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                 <button type="submit" className="w-full bg-fuchsia-200 text-fuchsia-800 font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-300 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                                    KIRIM JAWABAN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AnswerQuestionPage;