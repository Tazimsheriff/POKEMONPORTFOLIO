import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PokeballLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const ballRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const centerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Delay slightly before calling onComplete to allow flash to settle
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete
        });
      }
    });

    // 1. Initial Spinning and Pulsing
    tl.set(containerRef.current, { opacity: 1 });
    
    tl.to(ballRef.current, {
      rotate: 360 * 3,
      duration: 2.5,
      ease: "power2.inOut"
    });

    tl.to(centerRef.current, {
      scale: 1.2,
      boxShadow: "0 0 30px #fff",
      repeat: 3,
      yoyo: true,
      duration: 0.3
    }, "-=1");

    // 2. Open Animation
    tl.to(textRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3
    });

    tl.to(topRef.current, {
      y: -200,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in"
    });

    tl.to(bottomRef.current, {
      y: 200,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in"
    }, "<");

    tl.to(centerRef.current, {
      scale: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in"
    }, "-=0.2");

    // 3. White Flash
    tl.to(containerRef.current, {
      backgroundColor: "#fff",
      duration: 0.2
    }, "-=0.4");

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="scanlines" />
      
      <div ref={ballRef} className="relative w-48 h-48 mb-8">
        {/* Top Half */}
        <div 
          ref={topRef}
          className="absolute top-0 w-full h-1/2 bg-poke-red rounded-t-full border-b-4 border-black box-border"
        />
        
        {/* Bottom Half */}
        <div 
          ref={bottomRef}
          className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-t-4 border-black box-border"
        />
        
        {/* Center Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full flex items-center justify-center z-10">
          <div 
            ref={centerRef}
            className="w-10 h-10 bg-white border-4 border-black rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>

      <p 
        ref={textRef}
        className="font-pixel text-poke-yellow text-sm md:text-xl tracking-widest animate-pulse"
      >
        A wild portfolio appeared...
      </p>

      {/* Particle Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-float"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random()
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PokeballLoader;
