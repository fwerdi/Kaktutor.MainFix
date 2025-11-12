

import React from 'react';
import { ChevronDownIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

const PageHeader = ({ onNavigate }) => (
    <header className="py-4 px-8 w-full">
        <div className="container mx-auto flex items-center">
            <button onClick={() => onNavigate('community')} className="text-gray-700 hover:text-black transition-colors font-semibold">&larr; Kembali ke Komunitas</button>
        </div>
    </header>
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


const AskQuestionPage = ({ onNavigate }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit question
        console.log("Question submitted");
        onNavigate('community'); // Go back to community after asking
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col" style={{ background: 'radial-gradient(ellipse at top right, rgba(233, 213, 255, 0.4), transparent 50%), radial-gradient(ellipse at bottom left, rgba(219, 234, 254, 0.4), transparent 50%)' }}>
            <PageHeader onNavigate={onNavigate} />
             <div className="flex-grow flex items-center justify-center w-full p-4">
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-gray-400 text-center mb-4 uppercase tracking-widest">Ajukan Pertanyaan</h1>
                    <div className="bg-white p-8 rounded-2xl shadow-xl animate-fade-in">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-xl font-bold text-center text-gray-800">Ajukan pertanyaan</h2>
                            <div>
                                <textarea
                                    id="question"
                                    name="question"
                                    rows={5}
                                    placeholder="Tulis pertanyaanmu di sini (pertanyaan simpel lebih cepat dijawab)"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition shadow-sm text-gray-900 placeholder-gray-500"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-4">
                                <button type="button" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-fuchsia-100 text-fuchsia-700 font-semibold rounded-lg hover:bg-fuchsia-200 transition-colors">
                                    Pilih mata pelajaran
                                    <ChevronDownIcon className="w-5 h-5" />
                                </button>
                                 <button type="submit" className="flex-1 bg-fuchsia-200 text-fuchsia-800 font-bold py-2.5 px-6 rounded-lg hover:bg-fuchsia-300 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                                    TANYAKAN PERTANYAANMU
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

export default AskQuestionPage;