"use client"

import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/components/home/HeroSection";
import TopBrands from "@/components/home/TopBrands";
import HotPicks from "@/components/home/TrendingCars";
import SmartComparison from "@/components/home/SmartComparison";
import ByCarType from "@/components/home/ByCarType";
import News from "@/components/home/News";
import ExpertReview from "@/components/home/ExperRreview";
import UpcomingCars from "@/components/home/UpComing";
import ByBudget from "@/components/home/ByBudget"; 
import RecentlyLaunched from "@/components/home/Recently-Launched";
import FooterPage from "./footer/page";


export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <ByBudget />
      <UpcomingCars />
      <RecentlyLaunched />
      <TopBrands />
      <HotPicks />
      <ByCarType />
      <SmartComparison/>
       <News />
       <ExpertReview/>
       <FooterPage/>
    </PageWrapper>
  );
}