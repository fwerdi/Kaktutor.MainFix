
import React, { useState } from 'react';
import { WalletIcon, BankIcon, RadioUncheckedIcon, CheckCircleIcon, HomeIcon, MailIcon, GithubIcon } from '../components/Icons';

const PageHeader = ({ onNavigate, onBack }) => (
    <header className="bg-gradient-to-b from-purple-100 to-transparent py-4 px-8 sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center">
             <button onClick={() => onNavigate(onBack)} className="text-gray-700 hover:text-black transition-colors font-semibold">&larr; Kembali</button>
            <button onClick={() => onNavigate('home')} className="flex items-center justify-center">
                <img src="https://i.ibb.co/cSVcGHcH/LOGO-ONLY.png" alt="Kak Tutor Logo" className="h-10" />
            </button>
             <div className="w-16"></div> {/* Spacer */}
        </div>
    </header>
);

const ToggleSwitch = ({ label, id, defaultChecked = false }) => (
    <div className="flex items-center justify-between py-3">
        <label htmlFor={id} className="text-gray-700 font-medium">{label}</label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name={id} id={id} defaultChecked={defaultChecked} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label htmlFor={id} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        <style>{`.toggle-checkbox:checked { right: 0; border-color: #6D28D9; } .toggle-checkbox:checked + .toggle-label { background-color: #6D28D9; }`}</style>
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


const PaymentPage = ({ onNavigate }) => {
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedBank, setSelectedBank] = useState('');

    const availableSchedules = ["09:00 - 11:00", "13:00 - 15:00", "16:00 - 18:00", "19:00 - 21:00"];
    const banks = ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga"];
    
    const isPayButtonDisabled = !selectedSchedule || !selectedBank;

    return (
        <div className="min-h-screen bg-gray-50" style={{background: 'linear-gradient(135deg, #e0f2f1 0%, #f5fffe 100%)'}}>
            <PageHeader onNavigate={onNavigate} onBack="tutorDetail" />
            <main className="py-12 px-4 flex items-center justify-center">
                <div 
                    className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl animate-fade-in"
                    style={{boxShadow: '0 0 50px rgba(46, 204, 113, 0.2)'}}
                >
                    {/* Order Summary */}
                    <div className="p-5 border border-gray-200 rounded-lg bg-white/50">
                        <h2 className="text-lg font-bold text-gray-800 mb-3">Ringkasan Pesanan</h2>
                        <div className="space-y-2 text-sm">
                            <p className="font-semibold text-gray-700">Kelas Dasar Pemrograman</p>
                            <p className="text-gray-500">Tutor: Fadil</p>
                            <p className="text-gray-500">Mode: Kelas Online</p>
                        </div>
                    </div>

                    {/* Schedule Selection */}
                    <div className="p-5 border border-gray-200 rounded-lg bg-white/50">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Pilih Jadwal Kursus</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {availableSchedules.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedSchedule(time)}
                                    className={`p-2 text-sm font-semibold rounded-lg transition-colors border-2 ${
                                        selectedSchedule === time
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50'
                                    }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-5 border border-gray-200 rounded-lg bg-white/50">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Pembayaran</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tarif Kursus</span>
                                <span className="font-medium text-gray-800">Rp. 500,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Biaya Admin</span>
                                <span className="font-medium text-gray-800">Rp. 5,000</span>
                            </div>
                            <hr className="my-2"/>
                            <div className="flex justify-between font-bold text-base">
                                <span className="text-gray-800">Total Pembayaran</span>
                                <span className="text-gray-900">Rp. 505,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Points */}
                    <div className="p-3 border border-gray-200 rounded-lg bg-white/50">
                         <ToggleSwitch label="Gunakan poin 83" id="use-points" />
                    </div>

                    {/* Payment Method */}
                    <div className="p-5 border border-gray-200 rounded-lg bg-white/50 space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">Metode Pembayaran</h2>
                        <div>
                            <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                            <select
                                id="bank"
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                            >
                                <option value="" disabled>Pilih bank</option>
                                {banks.map(bank => <option key={bank} value={bank} className="bg-gray-800 text-white">{bank}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4">
                        <button 
                            onClick={() => onNavigate('orderSuccess', { schedule: selectedSchedule })} 
                            className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed" 
                            disabled={isPayButtonDisabled}>
                            Bayar Sekarang
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PaymentPage;