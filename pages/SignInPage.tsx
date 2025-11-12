

import React, { useState, useEffect } from 'react';
import { GoogleIcon, FacebookIcon } from '../components/Icons';

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

const SocialLoginModal = ({ isOpen, provider, onSuccess }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onSuccess(); // Simulate successful login after a delay
            }, 2000); // 2 second delay
            return () => clearTimeout(timer);
        }
    }, [isOpen, onSuccess]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" style={{ animationDuration: '0.3s' }}>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
                <div className="flex justify-center mb-4">
                    {provider === 'Google' ? <GoogleIcon className="w-10 h-10" /> : <FacebookIcon className="w-10 h-10" />}
                </div>
                <h2 className="text-xl font-bold text-gray-800">Masuk dengan {provider}</h2>
                <p className="text-gray-600 my-4">Anda akan dialihkan untuk masuk. Mohon tunggu...</p>
                <div className="flex justify-center items-center">
                     <svg className="animate-spin h-8 w-8 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

const SignInPage = ({ onNavigate, onLogin }) => {
    const [modalState, setModalState] = useState({ isOpen: false, provider: null });

    const handleSocialLogin = (provider) => {
        setModalState({ isOpen: true, provider });
    };
    
    // This form submission handler is now just for show,
    // as the buttons below directly trigger the login with a specific role.
    const handleSubmit = (e) => {
        e.preventDefault();
        // Default login is as a mentee if someone hits enter
        onLogin('mentee');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ background: 'linear-gradient(to top right, #f3e8ff, #faf5ff, #ffffff, #e0f2fe)' }}>
             <SocialLoginModal 
                isOpen={modalState.isOpen}
                provider={modalState.provider}
                onSuccess={() => onLogin('mentee')}
            />
             <button onClick={() => onNavigate('home')} className="absolute top-6 left-6 text-gray-600 hover:text-black transition-colors z-20 font-semibold">&larr; Kembali</button>
            <div className="relative w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl my-12" style={{boxShadow: '0 25px 50px -12px rgba(192, 132, 252, 0.25)'}}>
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900">Masuk</h1>
                </div>

                <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleSocialLogin('Google')} className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-50 font-semibold transition-colors">
                            <GoogleIcon className="w-5 h-5 mr-2" />
                            Google
                        </button>
                        <button onClick={() => handleSocialLogin('Facebook')} className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-[#1877F2] hover:bg-[#166e_dd] font-semibold transition-colors">
                            <FacebookIcon className="w-5 h-5 mr-2" />
                            Facebook
                        </button>
                     </div>

                    <div className="flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-4 text-gray-500">atau</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <FormInput id="email" label="Email address*" type="email" placeholder="email@janesfakedomain.net" />
                    <FormInput id="password" label="Password*" type="password" placeholder="Enter your password" />
                    
                    <div className="pt-4 space-y-3">
                        <button type="button" onClick={() => onLogin('mentee')} className="w-full bg-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                            Masuk sebagai Mentee
                        </button>
                         <button type="button" onClick={() => onLogin('tutor')} className="w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Masuk sebagai Tutor
                        </button>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                            Masuk
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <p>
                            Apakah Anda belum memiliki akun?{' '}
                            <button type="button" onClick={() => onNavigate('signup')} className="font-medium text-fuchsia-600 hover:underline">Daftar</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;