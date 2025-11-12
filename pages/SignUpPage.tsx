

import React, { useState } from 'react';
import { UploadIcon } from '../components/Icons';

const FormInput = ({ id, label, type = 'text', placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition"
            required
        />
    </div>
);

const SignUpPage = ({ onNavigate, onLogin }) => {
    const [userType, setUserType] = useState('mentee');
    const [studentCard, setStudentCard] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userType === 'mentee') {
            console.log("Mentee signup with student card:", studentCard);
            onLogin('mentee');
        } else {
            onNavigate('tutorSignUpFlow');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ background: 'linear-gradient(to top right, #f3e8ff, #faf5ff, #ffffff, #e0f2fe)' }}>
            <button onClick={() => onNavigate('home')} className="absolute top-6 left-6 text-gray-600 hover:text-black transition-colors z-20 font-semibold">&larr; Kembali</button>
            <div className="relative w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl my-12" style={{boxShadow: '0 25px 50px -12px rgba(192, 132, 252, 0.25)'}}>
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900">Daftar</h1>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <FormInput id="fullName" label="Nama Lengkap*" placeholder="Jane Doe" />
                    <FormInput id="email" label="Alamat Email*" type="email" placeholder="email@janesfakedomain.net" />
                    <FormInput id="password" label="Kata Sandi*" type="password" placeholder="Buat kata sandi" />

                    {userType === 'mentee' && (
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kartu Mahasiswa (Opsional)
                            </label>
                            <label htmlFor="studentCard" className="relative cursor-pointer bg-white rounded-md font-medium text-fuchsia-600 hover:text-fuchsia-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-fuchsia-500 border-2 border-gray-300 border-dashed rounded-lg p-4 flex flex-col items-center justify-center w-full transition hover:border-fuchsia-400">
                                <UploadIcon className="w-8 h-8 text-gray-400 mb-1" />
                                <span className="text-sm text-center">
                                    {studentCard ? `File: ${studentCard.name}` : 'Unggah foto atau PDF'}
                                </span>
                                <input id="studentCard" name="studentCard" type="file" onChange={(e) => setStudentCard(e.target.files ? e.target.files[0] : null)} className="sr-only" accept="image/*,application/pdf" />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">Untuk verifikasi status siswa Anda.</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Anda seorang siswa atau tutor?</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setUserType('mentee')}
                                className={`py-3 rounded-lg font-bold transition-colors ${
                                    userType === 'mentee' ? 'bg-fuchsia-500 text-white shadow-md' : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                Siswa
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserType('tutor')}
                                className={`py-3 rounded-lg font-bold transition-colors ${
                                    userType === 'tutor' ? 'bg-fuchsia-500 text-white shadow-md' : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                Tutor
                            </button>
                        </div>
                    </div>

                    <div className="pt-4">
                        {userType === 'mentee' ? (
                            <button type="submit" className="w-full bg-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                                Daftar sebagai Mentee
                            </button>
                        ) : (
                            <button type="submit" className="w-full bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                                Lanjutkan Pendaftaran Tutor
                            </button>
                        )}
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <p>
                            Sudah punya akun?{' '}
                            <button type="button" onClick={() => onNavigate('signin')} className="font-medium text-fuchsia-600 hover:underline">Masuk</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;