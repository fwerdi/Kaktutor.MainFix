

import React, { useState } from 'react';
import { LocationMarkerIcon, DescriptionIcon, UploadIcon, CheckCircleIcon } from '../components/Icons';

const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex items-center justify-center mb-8">
            {Array.from({ length: totalSteps }, (_, i) => {
                const step = i + 1;
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;
                return (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                                    isActive ? 'bg-fuchsia-500 text-white shadow-lg' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {isCompleted ? '✓' : step}
                            </div>
                        </div>
                        {step < totalSteps && <div className={`flex-1 h-1 transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

// FIX: Added 'name' to props to match component usage.
const FormInput = ({ id, name, label, value, onChange, placeholder, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <div className="relative">
             {type === 'number' && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">Rp</span>}
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition ${type === 'number' ? 'pl-10' : ''}`}
                required
                min={type === 'number' ? '0' : undefined}
            />
             {type === 'number' && <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">/ jam</span>}
        </div>
    </div>
);

// FIX: Added 'name' to props to match component usage.
const FormTextArea = ({ id, name, label, value, onChange, placeholder, rows = 4 }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition"
            required
        ></textarea>
    </div>
);

// FIX: Added 'name' to props to match component usage.
const FileInput = ({ id, name, label, fileName, onChange, accept }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <label htmlFor={id} className="relative cursor-pointer bg-white rounded-md font-medium text-fuchsia-600 hover:text-fuchsia-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-fuchsia-500 border-2 border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center justify-center w-full transition hover:border-fuchsia-400">
             <UploadIcon className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-sm text-center">
                {fileName ? `File: ${fileName}` : 'Klik untuk mengunggah file'}
            </span>
            <input id={id} name={name} type="file" onChange={onChange} className="sr-only" accept={accept} required />
        </label>
         <p className="text-xs text-gray-500 mt-1">Foto (PNG, JPG) atau dokumen (PDF) hingga 10MB.</p>
    </div>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" style={{animationDuration: '0.2s'}}>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
                <h2 className="text-xl font-bold text-gray-800">Konfirmasi Pendaftaran</h2>
                <p className="text-gray-600 my-4">Pastikan semua data sudah terisi dengan benar sebelum mengirim.</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                        Batal
                    </button>
                    <button onClick={onConfirm} className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md">
                        Ya, Kirim
                    </button>
                </div>
            </div>
        </div>
    );
};


const TutorSignUpFlow = ({ onNavigate, onLogin }) => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        domicile: '',
        teachingDescription: '',
        selfDescription: '',
        transcriptFile: null,
        hourlyRate: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'transcriptFile') {
            setFormData(prev => ({ ...prev, transcriptFile: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const totalSteps = 5;

    const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSubmit = () => {
        console.log("Tutor application submitted:", formData);
        setIsSubmitted(true);
        setIsConfirmModalOpen(false);
    };
    
    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className="space-y-4 animate-fade-in">
                        <h3 className="text-xl font-semibold text-center text-gray-800">Langkah 1: Informasi Dasar</h3>
                        <FormInput id="domicile" name="domicile" label="Domisili (Kota/Kabupaten)*" value={formData.domicile} onChange={handleChange} placeholder="Contoh: Jakarta Selatan" />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-fade-in">
                        <h3 className="text-xl font-semibold text-center text-gray-800">Langkah 2: Keahlian Mengajar</h3>
                        <FormTextArea id="teachingDescription" name="teachingDescription" label="Deskripsi Mata Pelajaran yang Diajar*" value={formData.teachingDescription} onChange={handleChange} placeholder="Contoh: Saya mengajar Matematika tingkat SMA, dengan fokus pada Kalkulus dan Aljabar. Saya juga bisa mengajar Fisika dasar." />
                    </div>
                );
            case 3:
                return (
                     <div className="space-y-4 animate-fade-in">
                        <h3 className="text-xl font-semibold text-center text-gray-800">Langkah 3: Tentang Anda</h3>
                        <FormTextArea id="selfDescription" name="selfDescription" label="Deskripsi Diri*" value={formData.selfDescription} onChange={handleChange} placeholder="Ceritakan tentang gaya mengajar Anda, kelebihan Anda, dan mengapa siswa harus memilih Anda." rows={6} />
                    </div>
                );
            case 4:
                return (
                     <div className="space-y-4 animate-fade-in">
                         <h3 className="text-xl font-semibold text-center text-gray-800">Langkah 4: Unggah Nilai Rapor</h3>
                        <FileInput id="transcriptFile" name="transcriptFile" label="Unggah Foto atau PDF Transkrip Nilai/IPK*" fileName={formData.transcriptFile?.name} onChange={handleChange} accept="image/*,application/pdf" />
                    </div>
                );
            case 5:
                 return (
                     <div className="space-y-4 animate-fade-in">
                         <h3 className="text-xl font-semibold text-center text-gray-800">Langkah 5: Tarif Mengajar</h3>
                        <FormInput id="hourlyRate" name="hourlyRate" label="Tarif per Jam Mengajar*" type="number" value={formData.hourlyRate} onChange={handleChange} placeholder="Contoh: 50000" />
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to top right, #f3e8ff, #faf5ff, #ffffff, #e0f2fe)' }}>
            <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={handleConfirmSubmit} />
            <button onClick={() => onNavigate('signup')} className="absolute top-6 left-6 text-gray-600 hover:text-black transition-colors z-20 font-semibold">&larr; Kembali</button>
            <div className="relative w-full max-w-lg bg-white p-8 md:p-12 rounded-3xl shadow-2xl my-12" style={{boxShadow: '0 25px 50px -12px rgba(192, 132, 252, 0.25)'}}>
                {isSubmitted ? (
                    <div className="text-center animate-fade-in">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                        <h1 className="text-2xl font-bold text-gray-800 mt-4">Pendaftaran Terkirim!</h1>
                        <p className="text-gray-600 mt-2">Terima kasih telah mendaftar. Tim kami akan meninjau pendaftaran Anda dan akan memberi kabar melalui email dalam 3-5 hari kerja.</p>
                        <button
                            onClick={() => onLogin('tutor')}
                            className="mt-6 px-6 py-2 bg-fuchsia-500 text-white font-bold rounded-lg hover:bg-fuchsia-600 transition-colors shadow-md"
                        >
                            Masuk ke Dasbor
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Pendaftaran Tutor</h1>
                            <p className="text-gray-600 mt-2">Lengkapi profil Anda untuk mulai mengajar.</p>
                        </div>
                        
                        <StepIndicator currentStep={step} totalSteps={totalSteps} />

                        <form onSubmit={handleSubmit}>
                            <div className="min-h-[220px]">
                                {renderStep()}
                            </div>

                            <div className="flex justify-between items-center mt-8 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Kembali
                                </button>

                                {step < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-6 py-2 bg-fuchsia-500 text-white font-bold rounded-lg hover:bg-fuchsia-600 transition-colors shadow-md"
                                    >
                                        Selanjutnya
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
                                    >
                                        Submit Pendaftaran
                                    </button>
                                )}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default TutorSignUpFlow;