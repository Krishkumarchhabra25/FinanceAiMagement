import DemoSection from "@/components/DemoSection";
import Features from "@/components/Feature";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Statistics from "@/components/Statistcs";
import Testimonials from "@/components/Testimonial";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DemoSection />
      <Features />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;