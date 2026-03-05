"use client"

import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/components/home/HeroSection";
import TopBrands from "@/components/home/TopBrands";
import HotPicks from "@/components/home/TrendingCars";
import SmartComparison from "@/components/home/SmartComparison";
import ByCarType from "@/components/home/ByCarType";
import News from "@/components/home/News";
import AISuggestionCard from "@/components/home/Aisuggestioncard";
import ExpertReview from "@/components/home/ExpertReview";
import UpcomingCars from "@/components/home/UpComing";
import ByBudget from "@/components/home/ByBudget"; 
import RecentlyLaunched from "@/components/home/Recently-Launched";


// ── Model Cards — Original 6 styles ───────────────────────────────────────
import ModelCardSlant from "@/components/home/model/Modelcardslant";
import ModelCardReveal from "@/components/home/model/Modelcardreveal";
import ModelCardMagazine from "@/components/home/model/Modelcardmagazine";
import ModelCardMinimal from "@/components/home/model/Modelcardminimal";
import ModelCardNeon from "@/components/home/model/Modelcardneon";
import ModelCardCinema from "@/components/home/model/Modelcardcinema";

// ── Model Cards — New 6 styles ─────────────────────────────────────────────
import ModelCardOrbit from "@/components/home/model/Modelcardorbit";
import ModelCardPulse from "@/components/home/model/Modelcardpulse";
import ModelCardArchive from "@/components/home/model/Modelcardarchive";
import ModelCardVelocity from "@/components/home/model/Modelcardvelocity";
import ModelCardHologram from "@/components/home/model/Modelcardhologram";
import ModelCardPhantom from "@/components/home/model/Modelcardphantom";

// ── Trim Cards — Original 5 styles ────────────────────────────────────────
import TrimCardSpectrum from "@/components/home/trims/Trimcardspectrum";
import TrimCardBadge from "@/components/home/trims/Trimcardbadge";
import TrimCardTimeline from "@/components/home/trims/Trimcardtimeline";
import TrimCardGlass from "@/components/home/trims/Trimcardglass";
import TrimCardPolar from "@/components/home/trims/Trimcardpolar";

// ── Trim Cards — New 5 styles ──────────────────────────────────────────────
import TrimCardRadar from "@/components/home/trims/Trimcardradar";
import TrimCardFlip from "@/components/home/trims/Trimcardflip";
import TrimCardMeter from "@/components/home/trims/Trimcardmeter";
import TrimCardStack from "@/components/home/trims/Trimcardstack";
import TrimCardVault from "@/components/home/trims/Trimcardvault";

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
      {/* <section
        style={{
          padding: "80px 40px",
          background: "linear-gradient(180deg, #080808 0%, #0a0a0a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      > */}
        {/* Section ambient glow */}
        {/* <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 400,
            background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        /> */}

        {/* Section header */}
        {/* <div style={{ marginBottom: 48, position: "relative" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "#C9A84C",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            ✦ AI-Powered Results
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 36,
              fontWeight: 400,
              color: "#fff",
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Best Matches for You
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.35)",
              margin: 0,
            }}
          >
            Ranked by how well each car fits your budget, needs & lifestyle
          </p>
        </div> */}

        {/* Cards stack */}
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "flex-start",
          }}
        > */}
          {/* ── Card 1 — Tata Tiago EV (example from your data) ── */}
          {/* <AISuggestionCard
            rank={1}
            badge="AI PICK"
            category="HATCHBACK"
            price="₹11,14,000"
            brand="Tata"
            model="Tiago EV"
            trim="XZ Plus Tech LUX Long Range"
            description="The Tata Tiago EV XZ Plus Tech LUX Long Range is a fully electric hatchback that comes with a smooth automatic transmission, making it easy to navigate tight city streets. With its compact dimensions and a price of just ₹11.1 lakh, it fits comfortably within your budget while offering the quiet, emission‑free driving you'll enjoy on narrow roads."
            image="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
            scores={{
              budgetMatch: 100,
              popularity: 0,
              needsMatch: 63,
              cityDriving: 73,
              compactParking: 58,
              fuelEfficient: 58,
            }}
            onViewDetails={() => console.log("View Details clicked")}
            onContactDealer={() => console.log("Contact Dealer clicked")}
          /> */}

          {/* ── Card 2 — Plug in your next AI suggestion here ── */}
          {/* 
          <AISuggestionCard
            rank={2}
            badge="BUDGET HERO"
            category="SEDAN"
            price="₹9,99,000"
            brand="Maruti Suzuki"
            model="Ciaz"
            trim="Alpha Diesel"
            description="..."
            image="..."
            scores={{ budgetMatch: 95, popularity: 72, needsMatch: 70, cityDriving: 80, compactParking: 65, fuelEfficient: 88 }}
          />
          */}
        {/* </div>
      </section> */}


      {/* ─────────────────────────────────────────────────────────────────
          MODEL CARD SHOWCASE — ORIGINAL 6
          Drop into any section that lists cars by brand or lineup.
          Each card is a fully self-contained component with default props
          so you can render it with zero config for prototyping.
      ───────────────────────────────────────────────────────────────── */}
      {/* <section style={{ padding: "60px 40px", background: "#0a0a0a" }}>
        <h2 style={{ color: "#fff", fontFamily: "sans-serif", marginBottom: "8px" }}>Model Cards</h2>
        <p style={{ color: "#555", fontFamily: "sans-serif", fontSize: "14px", marginBottom: "40px" }}>
          6 original styles — use for brand lineup displays
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "flex-start" }}> */}

          {/* Style 1 — Sporty slant, dark bg, red accent */}
          {/* <ModelCardSlant
            brand="Toyota"
            model="Supra"
            year={2024}
            category="Sports Coupe"
            price="$56,000"
            image="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80"
            specs={[
              { label: "0–60", value: "3.9s" },
              { label: "HP", value: "382" },
              { label: "MPG", value: "25" },
            ]}
            accentColor="#E63946"
          /> */}

          {/* Style 2 — Hover reveal overlay */}
          {/* <ModelCardReveal
            brand="BMW"
            model="M4"
            year={2024}
            tagline="Born on the Track"
            price="From $74,700"
            image="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80"
            features={["Twin-Turbo 3.0L", "503 hp", "xDrive AWD", "7-Speed DCT"]}
          /> */}

          {/* Style 3 — Editorial magazine, serif, gold */}
          {/* <ModelCardMagazine
            brand="Mercedes-Benz"
            model="AMG GT"
            year={2024}
            subtitle="The Ultimate Grand Tourer"
            price="$118,000"
            image="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80"
            tag="EDITOR'S PICK"
            rating={9.4}
          /> */}

          {/* Style 4 — Clean luxury minimalist */}
          {/* <ModelCardMinimal
            brand="Porsche"
            model="Cayenne"
            year={2024}
            price="$84,900"
            image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80"
            specs={[
              { icon: "⚡", label: "Power", value: "335 hp" },
              { icon: "⏱", label: "0–60", value: "5.9s" },
              { icon: "🛣", label: "Range", value: "450 mi" },
            ]}
          /> */}

          {/* Style 5 — Retro-futuristic neon grid */}
          {/* <ModelCardNeon
            brand="Lamborghini"
            model="Huracán"
            year={2024}
            category="Supercar"
            price="$248,295"
            image="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80"
            stats={[
              { label: "Power", value: "631", unit: "hp" },
              { label: "0–60", value: "2.5", unit: "sec" },
              { label: "Top", value: "202", unit: "mph" },
            ]}
            neonColor="#39FF14"
          /> */}

          {/* Style 6 — Cinematic letterbox, serif, gold accent */}
          {/* <ModelCardCinema
            brand="Aston Martin"
            model="Vantage"
            year={2024}
            tagline="Engineered for the Fearless"
            price="$142,000"
            image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
            specs={[
              { label: "Engine", value: "4.0L V8" },
              { label: "Output", value: "503 hp" },
              { label: "0–60", value: "3.6s" },
            ]}
            accentColor="#C9A84C"
          />

        </div>
      </section> */}

      {/* ─────────────────────────────────────────────────────────────────
          MODEL CARD SHOWCASE — NEW 6
          Bold new styles: orbital rings, EKG pulse, vintage editorial,
          diagonal velocity split, holographic tilt, luxury phantom split.
      ───────────────────────────────────────────────────────────────── */}
      {/* <section style={{ padding: "60px 40px", background: "#080808" }}>
        <h2 style={{ color: "#fff", fontFamily: "sans-serif", marginBottom: "8px" }}>Model Cards — New Styles</h2>
        <p style={{ color: "#444", fontFamily: "sans-serif", fontSize: "14px", marginBottom: "40px" }}>
          6 new styles — orbit, pulse, archive, velocity, hologram, phantom
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "60px 48px", alignItems: "flex-start" }}> */}

          {/* New Style 1 — Orbital circular card with rotating rings */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>ModelCardOrbit</span>
            <ModelCardOrbit
              brand="Ferrari"
              model="Roma"
              year={2024}
              price="$222,000"
              image="https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80"
              specs={[
                { label: "HP", value: "612" },
                { label: "0–60", value: "3.4s" },
                { label: "Top", value: "199 mph" },
              ]}
              accentColor="#FF2D20"
              category="Grand Tourer"
            />
          </div> */}

          {/* New Style 2 — Dark EKG heartbeat pulse */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>ModelCardPulse</span>
            <ModelCardPulse
              brand="Dodge"
              model="Demon 170"
              year={2024}
              price="$96,000"
              image="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80"
              hp="1,025"
              torque="945 lb-ft"
              zeroToSixty="1.66s"
              category="Muscle Car"
              accentColor="#FF4500"
            />
          </div> */}

          {/* New Style 3 — Vintage editorial newspaper */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>ModelCardArchive</span>
            <ModelCardArchive
              brand="Jaguar"
              model="F-Type"
              year={2024}
              price="$69,900"
              image="https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?w=600&q=80"
              edition="R-Dynamic Edition"
              description="A visceral, athletic GT car with a supercharged V8 that howls at full throttle."
              specs={[
                { label: "Engine", value: "5.0L Supercharged V8" },
                { label: "Output", value: "575 hp / 516 lb-ft" },
                { label: "Trans", value: "8-Speed Automatic" },
                { label: "Drive", value: "Rear-Wheel Drive" },
              ]}
              issueNumber="No. 047"
            />
          </div> */}

          {/* New Style 4 — Diagonal velocity / motion-blur split */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>ModelCardVelocity</span>
            <ModelCardVelocity
              brand="Bugatti"
              model="Chiron"
              year={2024}
              price="$3,300,000"
              image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
              speed="261 mph"
              power="1,479 hp"
              time="2.4s"
              category="Hypercar"
              accentColor="#00D4FF"
            />
          </div> */}

          {/* New Style 5 — Holographic 3D tilt foil shimmer */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>ModelCardHologram</span>
            <ModelCardHologram
              brand="Rolls-Royce"
              model="Spectre"
              year={2024}
              price="$413,000"
              image="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&q=80"
              tagline="The Future of Opulence"
              specs={[
                { label: "Range", value: "320 mi" },
                { label: "Output", value: "577 hp" },
                { label: "0–62", value: "4.5s" },
              ]}
            />
          </div> */}

          {/* New Style 6 — Luxury horizontal split with hover feature reveal */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>ModelCardPhantom</span>
            <ModelCardPhantom
              brand="Bentley"
              model="Continental GT"
              year={2024}
              price="$274,900"
              image="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80"
              category="Grand Tourer"
              features={["6.0L W12 Engine", "659 Horsepower", "AWD System", "Mulliner Interior"]}
              engine="W12 Biturbo"
              accentColor="#C5A028"
            />
          </div>

        </div>
      </section> */}

      {/* ─────────────────────────────────────────────────────────────────
          TRIM CARD SHOWCASE — ORIGINAL 5
          Drop into model detail or comparison pages.
          Each card handles its own interactive state internally.
      ───────────────────────────────────────────────────────────────── */}
      {/* <section style={{ padding: "60px 40px", background: "#f5f5f5" }}>
        <h2 style={{ color: "#111", fontFamily: "sans-serif", marginBottom: "8px" }}>Trim Cards</h2>
        <p style={{ color: "#888", fontFamily: "sans-serif", fontSize: "14px", marginBottom: "40px" }}>
          5 original styles — use for variant/level selection
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "flex-start" }}>

          {/* Style 1 — Color swatch + tier spectrum (interactive) */}
          {/* <TrimCardSpectrum
            model="Mustang"
            trims={[
              { name: "EcoBoost", price: "$32,515", color: "#4B8BFF", tier: 2, features: ["2.3L Turbo", "310 hp", "6-Speed Manual"] },
              { name: "GT", price: "$42,770", color: "#FF6B35", tier: 3, features: ["5.0L V8", "450 hp", "10-Speed Auto"] },
              { name: "GT Premium", price: "$49,580", color: "#9B59B6", tier: 4, features: ["5.0L V8", "450 hp", "B&O Audio"] },
              { name: "Dark Horse", price: "$58,235", color: "#2C3E50", tier: 5, features: ["5.0L V8", "500 hp", "Track Pack"] },
            ]}
          /> */}

          {/* Style 2 — Badge/tag heavy, popular flag */}
          {/* <TrimCardBadge
            model="Camry"
            trimName="XSE V6"
            trimCode="XV70"
            price="$35,980"
            image="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80"
            badges={[
              { label: "V6 Engine", color: "#fff", bg: "#E84040" },
              { label: "Sport Tuned", color: "#fff", bg: "#2563EB" },
              { label: "JBL Audio", color: "#111", bg: "#F5C518" },
              { label: "All-Wheel", color: "#fff", bg: "#16A34A" },
            ]}
            highlights={["3.5L V6 / 301 hp", "8-Speed Auto", "19-in Dark Alloys", "Panoramic Roof"]}
            isPopular={true}
          /> */}

          {/* Style 3 — Interactive vertical timeline */}
          {/* <TrimCardTimeline
            model="CR-V"
            brand="Honda"
            baseFeatures={["1.5L Turbo Engine", "CVT Transmission", "Honda Sensing Suite", "Apple CarPlay"]}
            trims={[
              { name: "LX", price: "$31,895", additionalFeatures: ["17-in Alloy Wheels", "Backup Camera"] },
              { name: "EX", price: "$34,595", additionalFeatures: ["Sunroof", "Wireless CarPlay", "Adaptive Cruise"] },
              { name: "EX-L", price: "$37,095", additionalFeatures: ["Leather Seats", "Heated Front Seats", "Power Tailgate"] },
              { name: "Sport Touring", price: "$41,595", additionalFeatures: ["Bose Audio", "20-in Wheels", "Head-Up Display"] },
            ]}
          /> */}

          {/* Style 4 — Glassmorphism luxury, color picker */}
          {/* <TrimCardGlass
            model="Model S"
            brand="Tesla"
            trimName="Plaid"
            price="$108,490"
            monthlyEstimate="$1,820/mo"
            image="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80"
            features={[
              { icon: "⚡", label: "Range", value: "396 mi" },
              { icon: "🏁", label: "0–60", value: "1.99s" },
              { icon: "💨", label: "Top Speed", value: "200 mph" },
              { icon: "🔋", label: "Charge", value: "250 kW" },
            ]}
            colorOptions={["#1A1A2E", "#B8001F", "#F5F5F5", "#1A3A5C", "#2D6A4F"]}
          /> */}

          {/* Style 5 — Bold two-column split, brutalist polar aesthetic */}
          {/* <TrimCardPolar
            model="Wrangler"
            brand="Jeep"
            trims={[
              {
                name: "Sport",
                price: "$34,090",
                engine: "3.6L V6",
                power: "285 hp",
                drive: "4x4",
                highlights: ["17-in Steel Wheels", "Command-Trac 4WD", "Uconnect 7-in"],
                tag: "BASE",
              },
              {
                name: "Sahara",
                price: "$43,090",
                engine: "2.0L Turbo",
                power: "270 hp",
                drive: "4x4",
                highlights: ["18-in Alloys", "Leather Seats", "Body-Color Fenders"],
                tag: "POPULAR",
              },
              {
                name: "Rubicon",
                price: "$50,290",
                engine: "3.6L V6",
                power: "285 hp",
                drive: "Rock-Trac",
                highlights: ["Rock Rails", "Locking Diffs", "35-in Mud Tires"],
                tag: "OFF-ROAD",
              },
            ]}
          />

        </div>
      </section> */}

      {/* ─────────────────────────────────────────────────────────────────
          TRIM CARD SHOWCASE — NEW 5
          Radar chart, 3D flip, animated gauge meters, accordion stack,
          and vault-door unlock reveal.
      ───────────────────────────────────────────────────────────────── */}
      {/* // <section style={{ padding: "60px 40px", background: "#0F0F0F" }}>
      //   <h2 style={{ color: "#fff", fontFamily: "sans-serif", marginBottom: "8px" }}>Trim Cards — New Styles</h2>
      //   <p style={{ color: "#444", fontFamily: "sans-serif", fontSize: "14px", marginBottom: "40px" }}>
      //     5 new styles — radar, flip, meter, stack, vault
      //   </p>
      //   <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 48px", alignItems: "flex-start" }}> */}

          {/* New Style 1 — Radar/spider chart visualization per trim */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>TrimCardRadar</span>
            <TrimCardRadar
              model="Model 3"
              brand="Tesla"
              trims={[
                {
                  name: "Standard RWD",
                  price: "$40,240",
                  tag: "BASE",
                  scores: { performance: 55, comfort: 70, tech: 85, efficiency: 90, cargo: 65, safety: 88 },
                },
                {
                  name: "Long Range AWD",
                  price: "$47,240",
                  tag: "POPULAR",
                  scores: { performance: 75, comfort: 80, tech: 90, efficiency: 85, cargo: 65, safety: 92 },
                },
                {
                  name: "Performance",
                  price: "$53,240",
                  tag: "SPORT",
                  scores: { performance: 97, comfort: 70, tech: 92, efficiency: 72, cargo: 65, safety: 92 },
                },
              ]}
              accentColor="#E5FF00"
            />
          </div> */}

          {/* New Style 2 — 3D flip card, front shows trim, back shows full specs */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>TrimCardFlip</span>
            <TrimCardFlip
              brand="BMW"
              model="M5"
              trimName="Competition"
              price="$107,000"
              image="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80"
              highlights={["617 hp", "AWD xDrive", "0–60 in 2.9s"]}
              fullSpecs={[
                { label: "Engine", value: "4.4L V8 TwinTurbo" },
                { label: "Power", value: "617 hp / 553 lb-ft" },
                { label: "Transmission", value: "8-Speed M Steptronic" },
                { label: "Drive", value: "M xDrive AWD" },
                { label: "0–60 mph", value: "2.9 seconds" },
                { label: "Top Speed", value: "190 mph (limited)" },
                { label: "Brakes", value: "M Carbon-Ceramic" },
                { label: "Weight", value: "4,387 lbs" },
              ]}
              accentColor="#0080FF"
              tag="M DIVISION"
            />
          </div> */}

          {/* New Style 3 — Horizontal animated gauge bars per spec */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>TrimCardMeter</span>
            <TrimCardMeter
              model="Civic"
              brand="Honda"
              image="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80"
              trims={[
                {
                  name: "Sport",
                  price: "$26,700",
                  color: "#FF6B35",
                  badge: "ENTRY",
                  gauges: [
                    { label: "Power", value: 42, unit: "158hp" },
                    { label: "Efficiency", value: 78, unit: "36mpg" },
                    { label: "Comfort", value: 60 },
                    { label: "Tech", value: 50 },
                  ],
                },
                {
                  name: "Sport Touring",
                  price: "$32,450",
                  color: "#00C896",
                  badge: "BEST VALUE",
                  gauges: [
                    { label: "Power", value: 42, unit: "158hp" },
                    { label: "Efficiency", value: 75, unit: "34mpg" },
                    { label: "Comfort", value: 80 },
                    { label: "Tech", value: 85 },
                  ],
                },
                {
                  name: "Type R",
                  price: "$44,990",
                  color: "#FF2D55",
                  badge: "PERFORMANCE",
                  gauges: [
                    { label: "Power", value: 85, unit: "315hp" },
                    { label: "Efficiency", value: 52, unit: "28mpg" },
                    { label: "Comfort", value: 45 },
                    { label: "Tech", value: 80 },
                  ],
                },
              ]}
            />
          </div> */}

          {/* New Style 4 — Stacked accordion, click to expand each trim */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>TrimCardStack</span>
            <TrimCardStack
              model="Taycan"
              brand="Porsche"
              trims={[
                {
                  name: "Taycan",
                  price: "$93,700",
                  tagline: "Dual motor. Pure exhilaration.",
                  color: "#C0C0C0",
                  emoji: "⚡",
                  features: ["408 hp / 599 lb-ft", "Range: 246 mi", "0–60: 5.1s", "Base Overboost"],
                },
                {
                  name: "Taycan 4S",
                  price: "$113,300",
                  tagline: "Awaken all four corners.",
                  color: "#E5B700",
                  emoji: "🔱",
                  features: ["522 hp / 626 lb-ft", "Range: 227 mi", "0–60: 3.8s", "Sport Chrono Pkg"],
                },
                {
                  name: "Taycan GTS",
                  price: "$134,400",
                  tagline: "Track soul. Road approved.",
                  color: "#FF4444",
                  emoji: "🏁",
                  features: ["590 hp / 626 lb-ft", "Range: 217 mi", "0–60: 3.5s", "GTS Sport Chassis"],
                },
                {
                  name: "Taycan Turbo S",
                  price: "$187,400",
                  tagline: "Defiance in motion.",
                  color: "#8B5CF6",
                  emoji: "🚀",
                  features: ["750 hp / 1,084 lb-ft", "Range: 201 mi", "0–60: 2.4s", "Carbon-Ceramic Brakes"],
                },
              ]}
            />
          </div> */}

          {/* New Style 5 — Vault door unlock, premium exclusive reveal */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#333", letterSpacing: "2px" }}>TrimCardVault</span>
            <TrimCardVault
              brand="Lamborghini"
              model="Urus"
              trimName="Performante"
              price="$258,000"
              monthlyEstimate="est. $4,200/mo"
              image="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
              specs={[
                { icon: "⚡", label: "Power", value: "657 hp" },
                { icon: "⏱", label: "0–60", value: "3.3s" },
                { icon: "🏎", label: "Top Speed", value: "193 mph" },
                { icon: "⚙️", label: "Gearbox", value: "8-Speed" },
              ]}
              includes={[
                "Carbon Fiber Exterior Pack",
                "Alcantara Sport Interior",
                "Advanced Driver Assist",
                "Akrapovič Exhaust",
                "Sensonum Audio System",
              ]}
              accentColor="#FFB800"
              exclusiveLabel="HALO TRIM"
            />
          </div>

        </div>
      </section> */}

    </PageWrapper>
  );
}