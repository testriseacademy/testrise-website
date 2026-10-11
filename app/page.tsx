import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import WhyTestRise from "@/components/WhyTestRise";
import WhyStudentsChooseUs from "@/components/WhyStudentsChooseUs";
import OurExperience from "@/components/OurExperience";
import TrainingPartner from "@/components/TrainingPartner";
import TrainingPrograms from "@/components/TrainingPrograms";
import WhoCanJoin from "@/components/WhoCanJoin";
import PayAfterPlacement from "@/components/PayAfterPlacement";
import TrainingApproach from "@/components/TrainingApproach";
import LearningRoadmap from "@/components/LearningRoadmap";
import WhySoftwareTesting from "@/components/WhySoftwareTesting";
import Statistics from "@/components/Statistics";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased text-brand-navy selection:bg-brand-primary/20 selection:text-brand-navy">
      <Header />
      <HeroSection />
      <TrustBar />
      <PayAfterPlacement />
      <WhyTestRise />
      <WhyStudentsChooseUs />
      <OurExperience />
      <TrainingPartner />
      <TrainingPrograms />
      <WhoCanJoin />
      <TrainingApproach />
      <LearningRoadmap />
      <WhySoftwareTesting />
      <Statistics />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
