import { sanityFetch } from "@/sanity/lib/live";
import { PUB_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
// import Link from "next/link";
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
      <main className="text-3xl flex flex-col justify-center text-center">
        <section className="bg-black text-white">
          <div className="py-12 px-8 max-w-4xl mx-auto">
            <h2 className="font-title text-3xl font-bold text-white mb-6 col-span-full text-center">About {pub?.name}</h2>
            <p className="text-lg mb-4">{pub?.description}</p>
            <p className="text-lg text-balance">
              <strong>Address:</strong> {pub?.address}
            </p>
          </div>
        </section>
        <section className="bg-white text-black">
          <div className="py-12 px-8 max-w-4xl mx-auto">
            <h2 className="font-title text-3xl font-bold text-black mb-6 col-span-full text-center">Opening Hours</h2>
            <ul className="text-lg text-balance">
              {pub?.openingHours && pub.openingHours.map((day: { day: string; availableTimes: { from: string; to: string; }[]; }) => {
                return (
                  <li key={day.day} className="mb-2">
                    <strong>{day.day}:</strong> {Array.isArray(day?.availableTimes) && day.availableTimes.length > 0 ? day.availableTimes[0].from + ' - ' + day.availableTimes[0].to : "Closed"}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="bg-black text-white">
          <div className="py-12 px-8 max-w-4xl mx-auto">
            <h2 className="font-title text-3xl font-bold text-white mb-6 col-span-full text-center">What&#39;s on tap</h2>
            <ul className="mt-4 space-y-2">
              {Array.isArray(pub?.beers) && pub.beers.length > 0 ? (
                pub.beers.map((beer: { name: string; description: string; tapType: string; abv: number; image: { asset: { url: string; metadata: { dimensions: { width: number; height: number; }; }; }; }; }) => {
                  console.log(beer);
                  return (
                    <li key={beer.name} className="text-lg text-balance flex items-center">
                      {beer.image?.asset?.url ? (
                        <Image
                          src={beer.image.asset.url}
                          alt={beer.name}
                          className="w-[75px] h-[75px] object-cover rounded-full mr-4 mb-2"
                          width={75}
                          height={75}
                        />
                      ) : (
                        <p className="w-[75px] h-[75px] bg-gray-300 flex items-center justify-center text-gray-600 rounded-full mr-4 mb-2">
                          No Image
                        </p>
                      )}
                      <p className="text-sm text-left">
                        <strong>{beer.name}</strong>: {beer.description} ({beer.tapType}) - ABV: {beer.abv}%
                      </p>
                    </li>
                  )
                })
              ) : (
                <li className="text-lg text-balance">No beers available</li>
              )}
            </ul>
          </div>
        </section>

        {/* <Link href="/">&larr; Return home</Link> */}
      </main>
      <footer className="bg-emerald-950 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} The Crafty Collection</p>
      </footer>
    </>
  );
}
