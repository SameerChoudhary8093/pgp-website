import React from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PasswordResetSuccess() {
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 font-sans backdrop-blur-sm">

            {/* Modal Card */}
            <div className="bg-white w-full max-w-[400px] rounded-[32px] p-8 py-12 flex flex-col items-center shadow-2xl relative animate-fade-in-up">

                {/* Success Icon */}
                <div className="w-28 h-28 rounded-full border-[3px] border-[#0F392B] flex items-center justify-center mb-8">
                    <Check className="w-12 h-12 text-[#0F392B]" strokeWidth={2.5} />
                </div>

                {/* Heading */}
                <h1 className="text-[28px] leading-snug font-bold text-[#0F392B] text-center mb-20">
                    Password Reset<br />
                    Successfully
                </h1>

                {/* Action Button */}
                <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-4 rounded-xl bg-[#0F392B] text-white font-semibold text-[15px] hover:bg-[#0b2b20] transition-colors shadow-sm"
                >
                    Go to Dashboard
                </button>

            </div>
        </div>
    );
}