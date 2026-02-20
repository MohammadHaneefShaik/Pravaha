import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ImportantDates from "@/components/home/ImportantDates";
import AboutPreview from "@/components/home/AboutPreview";
import DignitaryGallery from "@/components/home/DigitalGallery";
import TeamSection from "@/components/home/TeamSection";
const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutPreview />
      <ImportantDates />
      <DignitaryGallery />
      <TeamSection/>
    </Layout>
  );
};

export default Index;
