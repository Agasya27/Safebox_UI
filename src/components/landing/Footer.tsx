import SafeboxLogo from "@/assets/safebox-logo.svg";

const Footer = () => {
  return (
    <footer className="w-full bg-foreground text-background py-16 md:py-20 px-6 mt-auto">
      <div className="max-w-5xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          {/* Logo */}
          <img
            src={SafeboxLogo}
            alt="Safebox"
            className="h-8 md:h-10 w-auto brightness-0 invert opacity-90 mb-4"
          />
          
          {/* Tagline */}
          <p className="text-sm text-background/50 tracking-wide">
            Privacy-first family data organizer
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 md:mb-16">
          <a
            href="#"
            className="text-sm text-background/60 hover:text-background transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-background/60 hover:text-background transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 mb-8" />

        {/* Copyright */}
        <p className="text-center text-xs text-background/40 tracking-wide">
          © {new Date().getFullYear()} Safebox. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
