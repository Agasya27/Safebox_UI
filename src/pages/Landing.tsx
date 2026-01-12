import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import AnimatedBackground from "@/components/landing/AnimatedBackground";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <AnimatedBackground />
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
