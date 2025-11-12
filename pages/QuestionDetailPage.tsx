

import React, { useState } from 'react';
import { BackArrowIcon, CheckCircleIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

const PointAnimation = ({ show }) => {
    if (!show) return null;
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white font-bold px-4 py-2 rounded-full shadow-lg z-10 animate-point-pop">
            +5 Poin!
            <style>{`
                @keyframes point-pop {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                    50% { transform: translate(-50%, -150%) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -200%) scale(1); opacity: 0; }
                }
                .animate-point-pop {
                    animation: point-pop 1.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};


const QuestionDetailCard = ({ userName, userImage, subject, timestamp, points, questionTitle, questionBody }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center mb-4">
            <img src={userImage} alt={userName} className="w-10 h-10 rounded-full mr-4" />
            <div>
                <span className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-md">{userName}</span>
                <p className="text-gray-500 text-sm mt-1">{subject} • {timestamp}</p>
            </div>
            <span className="ml-auto bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">+{points} poin</span>
        </div>
        <h2 className="font-bold text-xl text-gray-800 mb-2">{questionTitle}</h2>
        <p className="text-gray-600">{questionBody || "Tidak ada deskripsi tambahan."}</p>
    </div>
);

// FIX: Use React.FC with explicit prop types to resolve the 'key' prop error in lists.
const AnswerCard: React.FC<{
    userName: string;
    userImage: string;
    answer: string;
    explanation: string;
    isVerified: boolean;
    userRole: string;
    onVerify: () => void;
    showAnimation: boolean;
}> = ({ userName, userImage, answer, explanation, isVerified, userRole, onVerify, showAnimation }) => (
    <div className={`relative p-5 rounded-xl border ${isVerified ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'}`}>
        <PointAnimation show={showAnimation} />
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <img src={userImage} alt={userName} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-gray-800">{userName}</span>
            </div>
            {isVerified && (
                <div className="flex items-center gap-2 bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                    <CheckCircleIcon className="w-4 h-4" />
                    Terverifikasi oleh Tutor
                </div>
            )}
        </div>
        
        <div>
            <h4 className="font-bold text-gray-700">Jawaban:</h4>
            <p className="text-gray-600 mb-3">{answer}</p>
            <h4 className="font-bold text-gray-700">Penjelasan:</h4>
            <p className="text-gray-600">{explanation}</p>
        </div>

        {userRole === 'tutor' && !isVerified && (
             <div className="mt-4 text-right">
                <button 
                    onClick={onVerify} 
                    className="bg-teal-500 text-white font-semibold py-1.5 px-4 rounded-lg hover:bg-teal-600 transition-colors shadow-sm text-sm"
                >
                    Verifikasi Jawaban
                </button>
            </div>
        )}
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


const QuestionDetailPage = ({ onNavigate, userRole, onVerify }) => {
    // Dummy data
    const question = {
        userName: 'Mitchel Sugianto',
        userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        subject: 'Basic Statistic',
        timestamp: '13 menit yang lalu',
        points: 5,
        questionTitle: 'Bantuin dong kak cara selesain soal ini...',
        questionBody: 'Jadi aku dapet soal statistik dasar tapi bingung banget sama rumusnya, ada yang bisa bantu jelasin langkah-langkahnya nggak? Soalnya terlampir ya.'
    };
    
    const initialAnswers = [
        {
            id: 1,
            userName: 'Jane Doe',
            userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
            answer: 'Tentu, pertama kamu harus menggunakan rumus standar deviasi.',
            explanation: 'Rumus standar deviasi untuk sampel adalah akar kuadrat dari varians. Varians dihitung dengan menjumlahkan kuadrat selisih setiap data dengan rata-rata, lalu dibagi dengan jumlah data dikurangi satu (n-1).',
            isVerified: false
        },
        {
            id: 2,
            userName: 'John Smith',
            userImage: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=100&auto=format&fit=crop',
            answer: 'Bisa pake kalkulator statistik online juga kalau mau cepet.',
            explanation: 'Banyak website yang menyediakan kalkulator statistik. Kamu tinggal masukkan datanya, nanti hasilnya langsung keluar. Tapi baiknya tetap ngerti konsep dasarnya sih.',
            isVerified: false
        },
        {
            id: 3,
            userName: 'Ahmad Subarjo',
            userImage: 'https://i.pravatar.cc/40?u=ahmad',
            answer: 'Jangan lupa perhatikan apakah datanya populasi atau sampel, rumusnya sedikit beda.',
            explanation: 'Kalau populasi, pembaginya adalah N (jumlah total data). Kalau sampel, pembaginya n-1 (jumlah sampel dikurangi satu). Ini penting untuk hasil yang akurat.',
            isVerified: false
        }
    ];

    const [answers, setAnswers] = useState(initialAnswers);
    const [verifyingId, setVerifyingId] = useState<number | null>(null);

    const handleVerifyAnswer = (answerId: number) => {
        setAnswers(currentAnswers =>
            currentAnswers.map(ans =>
                ans.id === answerId ? { ...ans, isVerified: true } : ans
            )
        );
        onVerify();
        setVerifyingId(answerId);
        setTimeout(() => setVerifyingId(null), 1500); // Animation duration
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-b from-purple-100 to-transparent py-4 px-8 sticky top-0 z-30">
                 <div className="container mx-auto flex justify-between items-center">
                    <button onClick={() => onNavigate('community')} className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors font-semibold">
                        <BackArrowIcon className="w-5 h-5" />
                        Kembali
                    </button>
                    <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
                        <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
                    </button>
                    <div className="w-24"></div> {/* Spacer */}
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <QuestionDetailCard {...question} />
                    
                    <div className="my-8 flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-800">Jawaban ({answers.length})</h3>
                         {userRole !== 'tutor' && (
                            <button onClick={() => onNavigate('answerQuestion')} className="bg-fuchsia-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-fuchsia-600 transition-colors shadow-md">
                                + Jawab Pertanyaan
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {answers.map((ans) => 
                            <AnswerCard 
                                key={ans.id} 
                                {...ans} 
                                userRole={userRole} 
                                onVerify={() => handleVerifyAnswer(ans.id)} 
                                showAnimation={verifyingId === ans.id}
                            />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default QuestionDetailPage;