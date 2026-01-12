import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const featureIconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      )
      .fromTo(
        iconsRef.current?.children || [],
        { opacity: 0, y: 16, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.4)" },
        "-=0.2"
      );

    // Subtle pulse animation for security icons
    featureIconRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.to(ref, {
          scale: 1.02,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      }
    });
  }, []);

  const handleIconHover = (ref: HTMLDivElement | null, isEnter: boolean) => {
    if (ref) {
      gsap.to(ref, {
        scale: isEnter ? 1.08 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(ref.querySelector("svg"), {
        rotate: isEnter ? 5 : 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const features = [
    { icon: Shield, label: "Secure" },
    { icon: Lock, label: "Private" },
    { icon: Users, label: "Family" },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12">
      <div className="text-center max-w-2xl mx-auto">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-5 md:mb-6 tracking-[-0.02em] leading-[1.1]"
          style={{ fontFamily: "'Source Sans 3', 'Inter', sans-serif", fontWeight: 600 }}
        >
          safebox
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-10 md:mb-12 leading-relaxed max-w-lg mx-auto"
        >
          Your privacy-focused family data organizer.
          <span className="hidden sm:inline"><br /></span>
          <span className="sm:hidden"> </span>
          Secure, simple, and always within reach.
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-14 md:mb-16">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 md:h-13 text-base font-medium shadow-soft transition-shadow duration-200 cursor-pointer"
          >
            Get Started
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary/20 text-foreground rounded-full px-8 h-12 md:h-13 text-base font-medium"
          >
            <Link to="/dashboard">Login</Link>
          </Button>
        </div>

        {/* Feature Icons */}
        <div ref={iconsRef} className="flex justify-center gap-10 md:gap-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={feature.label} className="flex flex-col items-center gap-2.5">
                <div
                  ref={(el) => (featureIconRefs.current[index] = el)}
                  onMouseEnter={(e) => handleIconHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleIconHover(e.currentTarget, false)}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/80 border border-border/50 flex items-center justify-center shadow-subtle cursor-pointer"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary transition-colors duration-200" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">{feature.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
