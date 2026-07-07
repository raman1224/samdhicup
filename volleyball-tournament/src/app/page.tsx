import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

const HeroSection = dynamic(() => import("@/components/home/hero-section"), {
  loading: () => <LoadingSkeleton height="100vh" />,
});

const TournamentDetails = dynamic(
  () => import("@/components/home/tournament-details"),
  { loading: () => <LoadingSkeleton height="400px" /> }
);

const PrizePool = dynamic(() => import("@/components/home/prize-pool"), {
  loading: () => <LoadingSkeleton height="400px" />,
});

const Sponsors = dynamic(() => import("@/components/home/sponsors"), {
  loading: () => <LoadingSkeleton height="300px" />,
});

const Gallery = dynamic(() => import("@/components/home/gallery"), {
  loading: () => <LoadingSkeleton height="500px" />,
});

const Schedule = dynamic(() => import("@/components/home/schedule"), {
  loading: () => <LoadingSkeleton height="400px" />,
});

const RegistrationInfo = dynamic(
  () => import("@/components/home/registration-info"),
  { loading: () => <LoadingSkeleton height="600px" /> }
);

const Rules = dynamic(() => import("@/components/home/rules"), {
  loading: () => <LoadingSkeleton height="500px" />,
});

const Venue = dynamic(() => import("@/components/home/venue"), {
  loading: () => <LoadingSkeleton height="400px" />,
});

const Contact = dynamic(() => import("@/components/home/contact"), {
  loading: () => <LoadingSkeleton height="400px" />,
});

const FAQ = dynamic(() => import("@/components/home/faq"), {
  loading: () => <LoadingSkeleton height="500px" />,
});

const Footer = dynamic(() => import("@/components/layout/footer"), {
  loading: () => <LoadingSkeleton height="300px" />,
});

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSkeleton height="100vh" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="400px" />}>
        <TournamentDetails />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="400px" />}>
        <PrizePool />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="300px" />}>
        <Sponsors />
      </Suspense>
      {/* <Suspense fallback={<LoadingSkeleton height="500px" />}>
        <Gallery />
      </Suspense> */}
      <Suspense fallback={<LoadingSkeleton height="400px" />}>
        <Schedule />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="600px" />}>
        <RegistrationInfo />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="500px" />}>
        <Rules />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="400px" />}>
        <Venue />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="400px" />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton height="500px" />}>
        <FAQ />
      </Suspense>
      {/* <Footer /> */}
    </main>
  );
}