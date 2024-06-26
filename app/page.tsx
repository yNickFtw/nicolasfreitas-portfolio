import { getServerSession } from "next-auth";
import CardProject from "./components/card-project/card-project";
import Header from "./components/header";
import { Hero } from "./components/hero";
import TrackerAnalysis from "./tracker-analysis/tracker-analysis";
import { nextAuthOptions } from "./options/nextAuthOptions";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <TrackerAnalysis session={!!session} />
      <main className="max-w-7xl m-auto">
        <Header isLogged={!!session} />

        <div className="w-full h-screen flex justify-center items-center">
          <Hero />
        </div>
      </main>
    </>
  );
}
