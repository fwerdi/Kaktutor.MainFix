

import React from 'react';
import { CheckCircleIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

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

const OrderSuccessPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow bg-gray-50 flex flex-col items-center justify-center text-center p-4" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #e9f1f8 100%)'}}>
                <div className="bg-white p-10 rounded-2xl shadow-2xl animate-fade-in" style={{animationDuration: '0.5s'}}>
                    <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
                    <h1 className="text-4xl font-extrabold text-gray-800 mt-6">Pesanan Berhasil!</h1>
                    <p className="text-gray-600 mt-2">Terima kasih atas pembelian Anda. Pemesanan Anda telah dikonfirmasi.</p>
                    <button 
                        onClick={() => onNavigate('home')} 
                        className="mt-8 bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSuccessPage;