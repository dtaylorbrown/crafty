import { sanityFetch } from "@/sanity/lib/live";
import { PUB_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: pub } = await sanityFetch({
    query: PUB_QUERY,
    params: await params,
  });

  if (!pub) {
    notFound();
  }

  return (
    <>
      <header className="h-[620px] flex bg-black items-center justify-center relative">
        {pub?.image?.asset?.url && (
          <div className="absolute w-full h-full opacity-25">
            <Image
              src={pub.image.asset.url}
              alt='Hero image'
              className="object-cover rounded-2xl shadow-lg"
              priority
              fill
            />
          </div>
        )}
        <div className="text-center relative z-1">
          <h1 className="font-title text-4xl sm:text-6xl font-bold text-white mb-2 sm:mb-4">{pub?.name}</h1>
          <h2 className="text-lg sm:text-2xl font-semibold text-white">{pub?.tagline || 'Craft Beer, Friendly Atmosphere'}</h2>
        </div>
      </header>
      <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
        <h3 className="text-xl font-bold text-balance">Opening Hours</h3>
        <div className="text-lg text-balance">
          {pub?.openingHours && pub.openingHours.map((day) => {
            return (
              <p key={day.day}>
                <strong>{day.day}:</strong> {Array.isArray(day?.availableTimes) && day.availableTimes.length > 0 ? day.availableTimes[0].from + ' - ' + day.availableTimes[0].to : "Closed"}
              </p>
            );
          })}
        </div>
        <p className="text-lg text-balance">
          <strong>Address:</strong> {pub?.address}
        </p>
        <hr />
        <h3 className="text-xl font-bold text-balance">Beers</h3>
        <ul className="list-disc pl-6">
          {Array.isArray(pub?.beers) && pub.beers.length > 0 ? (
            pub.beers.map((beer) => (
              <li key={beer.name} className="text-lg text-balance">
                <strong>{beer.name}</strong>: {beer.description}
              </li>
            ))
          ) : (
            <li className="text-lg text-balance">No beers available</li>
          )}
        </ul>
        <hr />
        <Link href="/">&larr; Return home</Link>
      </main>
    </>
  );
}
