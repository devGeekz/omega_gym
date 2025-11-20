"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

const allClasses = [
    { id: 1, name: 'HIIT Blast', time: '08:00 AM', instructor: 'Alex', spots: 15, category: 'hiit' },
    { id: 2, name: 'Vinyasa Flow', time: '09:30 AM', instructor: 'Maria', spots: 20, category: 'yoga' },
    { id: 3, name: 'Strength Circuit', time: '11:00 AM', instructor: 'John', spots: 12, category: 'strength' },
    { id: 4, name: 'Cycle Sync', time: '04:00 PM', instructor: 'Chloe', spots: 18, category: 'cardio' },
    { id: 5, name: 'Power Yoga', time: '05:30 PM', instructor: 'Maria', spots: 15, category: 'yoga' },
    { id: 6, name: 'Full Body Burn', time: '07:00 PM', instructor: 'Alex', spots: 10, category: 'hiit' },
];

export function HomePageSections() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [bookedClasses, setBookedClasses] = useState(new Set());
    const [selectedMembership, setSelectedMembership] = useState('premium');

    const filteredClasses = useMemo(() => {
        if (activeFilter === 'all') return allClasses;
        return allClasses.filter(cls => cls.category === activeFilter);
    }, [activeFilter]);

    const toggleBookClass = (classId: number) => {
        setBookedClasses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(classId)) {
                newSet.delete(classId);
            } else {
                newSet.add(classId);
            }
            return newSet;
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, []);


    return (
        <div>
            {/* Equipment Showcase */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-foreground">Premium Equipment</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            State-of-the-art fitness equipment designed to help you achieve your goals faster and safer.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Strength Training', desc: 'Comprehensive free weights and resistance machines for building muscle and increasing strength.' },
                            { title: 'Cardio Zone', desc: 'Advanced treadmills, ellipticals, and bikes with smart tracking and entertainment systems.' },
                            { title: 'Functional Training', desc: 'Suspension systems, battle ropes, and kettlebells for real-world movement patterns.' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer animate-on-scroll">
                                <div className="h-48 bg-gradient-to-br from-primary to-muted-foreground/50 flex items-center justify-center">
                                    <div className="text-6xl">🏋️</div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold uppercase mb-3 text-card-foreground">{item.title}</h3>
                                    <p className="text-muted-foreground mb-4">{item.desc}</p>
                                    <button className="px-6 py-3 bg-destructive text-primary-foreground rounded-full font-semibold hover:bg-destructive/90 transition-all">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Class Schedule */}
            <section id="classes" className="py-20 bg-secondary">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-secondary-foreground">Group Classes</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Expert-led classes designed to motivate, challenge, and transform your fitness journey.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
                        {['all', 'hiit', 'yoga', 'strength', 'cardio'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-3 rounded-full font-semibold uppercase text-sm transition-all ${activeFilter === filter
                                    ? 'bg-destructive text-primary-foreground'
                                    : 'border-2 border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClasses.map((cls) => (
                            <div key={cls.id} className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all animate-on-scroll">
                                <div className="text-2xl font-bold text-destructive mb-2">{cls.time}</div>
                                <h4 className="text-xl font-bold uppercase mb-2 text-card-foreground">{cls.name}</h4>
                                <p className="text-muted-foreground mb-1">with {cls.instructor}</p>
                                <p className="text-sm text-muted-foreground/80 mb-4">{cls.spots} spots available</p>
                                <button
                                    onClick={() => toggleBookClass(cls.id)}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all ${bookedClasses.has(cls.id)
                                        ? 'bg-destructive text-primary-foreground cursor-not-allowed'
                                        : 'bg-muted text-muted-foreground hover:bg-accent hover:-translate-y-1'
                                        }`}
                                >
                                    {bookedClasses.has(cls.id) ? '✓ Booked' : 'Book Class'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membership Plans */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-foreground">Choose Your Plan</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Flexible membership options designed to fit your lifestyle and fitness goals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { tier: 'basic', name: 'Basic', price: 29, features: ['Gym Access', 'Basic Classes', 'Locker Room Access', 'Equipment Orientation'] },
                            { tier: 'premium', name: 'Premium', price: 49, features: ['All Basic Features', 'All Group Classes', 'Personal Training Session', 'Guest Passes', 'Nutrition Consultation'] },
                            { tier: 'elite', name: 'Elite', price: 79, features: ['All Premium Features', 'Unlimited Personal Training', 'Spa Access', 'Priority Class Booking', 'Exclusive Events', 'Recovery Services'] }
                        ].map((plan) => (
                            <div
                                key={plan.tier}
                                onClick={() => setSelectedMembership(plan.tier)}
                                className={`bg-card rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all cursor-pointer animate-on-scroll ${selectedMembership === plan.tier ? 'border-4 border-destructive scale-105' : 'border-4 border-transparent'
                                    }`}
                            >
                                <h3 className="text-2xl font-bold uppercase mb-4 text-card-foreground">{plan.name}</h3>
                                <div className="text-5xl font-black text-destructive mb-2">
                                    ${plan.price}
                                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8 text-left text-card-foreground">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="py-2 border-b border-border last:border-0">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/membership" className="block w-full py-3 bg-destructive text-primary-foreground rounded-full font-semibold hover:bg-destructive/90 transition-all">
                                    Choose {plan.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-secondary">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-secondary-foreground">Success Stories</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Real transformations from real people in our fitness community.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah Johnson', text: 'Joining OMEGA was the best decision I made for my health. The trainers are incredible and the community is so supportive!' },
                            { name: 'Mike Chen', text: 'The variety of classes keeps me motivated every day. I\'ve never been stronger or healthier!' },
                            { name: 'Emma Davis', text: 'The personal training sessions transformed my approach to fitness. Highly recommend!' }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-card rounded-2xl p-8 text-center shadow-xl animate-on-scroll">
                                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                                    👤
                                </div>
                                <div className="text-2xl text-destructive mb-4">★★★★★</div>
                                <p className="italic text-muted-foreground mb-4">"{testimonial.text}"</p>
                                <p className="font-semibold text-card-foreground">- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="max-w-4xl mx-auto px-8 text-center animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">Ready to Transform?</h2>
                    <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
                        Join thousands of members who have already started their fitness journey with us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/membership" className="px-8 py-4 bg-destructive text-primary-foreground rounded-full font-semibold hover:bg-destructive/90 transition-all">
                            Get Started Today
                        </Link>
                        <Link href="/community" className="px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-full font-semibold hover:bg-primary-foreground hover:text-primary transition-all">
                            Join Community
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary text-primary-foreground py-12 text-center">
                <p className="opacity-80">© 2025 OMEGA Fitness. All rights reserved. | Transform Your Body, Transform Your Life.</p>
            </footer>
        </div>
    );
}