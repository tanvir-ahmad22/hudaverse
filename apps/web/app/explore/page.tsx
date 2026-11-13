import ExploreHero from "@/components/explore/ExploreHero";
import EcosystemSection from "@/components/explore/EcosystemSection";
import ExploreAi from "@/components/explore/ExploreAi";
import ExploreLearning from "@/components/explore/ExploreLearning";
import ExplorePersonalSpace from "@/components/explore/ExplorePersonalSpace";
import ExploreKnowledge from "@/components/explore/ExploreKnowledge";
import ExploreTrust from "@/components/explore/ExploreTrust";
import ExploreDay from "@/components/explore/ExploreDay";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <ExploreHero />

      <EcosystemSection />

      <ExploreAi />

      <ExploreLearning />

      <ExplorePersonalSpace />

      <ExploreKnowledge />

      <ExploreTrust />

      <ExploreDay />
    </div>
  );
}
