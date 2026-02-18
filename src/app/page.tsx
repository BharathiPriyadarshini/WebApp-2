import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/components/home/HeroSection";
import TopBrands from "@/components/home/TopBrands";
import HotPicks from "@/components/home/HotPicks";
import Recommendations from "@/components/home/Recommendations";
import ByCarType from "@/components/home/ByCarType";

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <TopBrands />
      <ByCarType />
      <HotPicks />
      <Recommendations />
    </PageWrapper>
  );
}
