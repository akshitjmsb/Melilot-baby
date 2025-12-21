import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const AboutScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
                >
                    <span className="material-symbols-outlined text-gray-900">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-gray-900">Our Story</h1>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            <main className="flex-1 pb-24">
                {/* Hero */}
                <div className="relative aspect-[16/9] w-full bg-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop"
                        alt="Baby in romper"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <h2 className="font-serif text-3xl text-white tracking-wide text-center px-4">
                            Gentle on skin,<br />Kinder to Earth.
                        </h2>
                    </div>
                </div>

                <div className="px-6 py-8 space-y-8">
                    {/* Section 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-3 text-primary">
                            <span className="material-symbols-outlined">eco</span>
                            <h3 className="font-bold text-lg text-gray-900">Organic Origins</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Born in Montreal, Petit Coton was founded with a simple mission: to create the softest, safest clothing for your little ones without compromising on style or the planet. We use only GOTS-certified organic cotton, ensuring no harmful chemicals touch your baby's delicate skin.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-3 text-primary">
                            <span className="material-symbols-outlined">hand_gesture</span>
                            <h3 className="font-bold text-lg text-gray-900">Hand-Stitched Care</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Every button, seam, and hem is finished with care. Our small-batch production ensures quality over quantity, supporting fair labor practices and reducing waste. We believe clothes should be heirloom-quality, passed down from sibling to sibling.
                        </p>
                    </section>

                    {/* Newsletter */}
                    <div className="bg-gray-50 rounded-2xl p-6 text-center mt-8">
                        <h3 className="font-serif text-xl text-gray-900 mb-2">Join the Family</h3>
                        <p className="text-xs text-gray-500 mb-4">Get 10% off your first order and updates on new collections.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm outline-none focus:border-gray-400"
                            />
                            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default AboutScreen;
