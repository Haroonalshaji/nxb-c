"use client"
import { useEffect, useState, useRef } from "react";

function Counter({ target, active, duration = 1000, suffix = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) {
            setCount(0);
            return;
        }
        let start = 0;
        const increment = target / (duration / 16);
        let raf;
        function update() {
            start += increment;
            if (start < target) {
                setCount(Math.floor(start));
                raf = requestAnimationFrame(update);
            } else {
                setCount(target);
            }
        }
        update();
        return () => {
            cancelAnimationFrame(raf);
        };
    }, [active, target, duration]);

    return <span>{count}{suffix}</span>;
}

export default function AnimatedCounter() {
    const sectionRef = useRef();
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.5 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-16 bg-[#B80D2D]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
                    <div data-aos="fade-up">
                        <div className="text-4xl font-bold mb-2">
                            <Counter target={500} active={inView} suffix="+" />
                        </div>
                        <div className="text-lg">Projects Completed</div>
                    </div>
                    <div data-aos="fade-up">
                        <div className="text-4xl font-bold mb-2">
                            <Counter target={150} active={inView} suffix="+" />
                        </div>
                        <div className="text-lg">Trusted Vendors</div>
                    </div>
                    <div data-aos="fade-up">
                        <div className="text-4xl font-bold mb-2">
                            <Counter target={25} active={inView} suffix="+" />
                        </div>
                        <div className="text-lg">Years Experience</div>
                    </div>
                    <div data-aos="fade-up">
                        <div className="text-4xl font-bold mb-2">
                            <Counter target={98} active={inView} suffix="%" />
                        </div>
                        <div className="text-lg">Client Satisfaction</div>
                    </div>
                </div>
            </div>
        </section>
    );
}