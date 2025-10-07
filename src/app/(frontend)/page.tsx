import Link from "next/link";
import Image from "next/image";

import { client } from "@/sanity/lib/client";
import { HOME_QUERY, PUBS_QUERY } from "@/sanity/lib/queries";

const options = { next: { revalidate: 60 } };

export default async function Page() {
  const pageData = await client.fetch(HOME_QUERY, {}, options);
  const pubs = await client.fetch(PUBS_QUERY, {}, options);

  const homepageData = pageData?.[0];

  return (
    <>
      <header className="h-[620px] flex bg-black items-center justify-center relative">
        {homepageData?.hero?.backgroundImage?.asset?.url && (
          <div className="absolute w-full h-full opacity-25">
            <Image
              src={homepageData.hero.backgroundImage.asset.url}
              alt={homepageData.hero.backgroundImage.alt || 'Hero image'}
              fill
              className="object-cover rounded-2xl shadow-lg"
              priority
            />
          </div>
        )}
        <div className="text-center relative z-1">
          <h1 className="font-title text-4xl sm:text-6xl font-bold text-white mb-8">{homepageData?.hero?.headline || 'The Crafty Collection'}</h1>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white">{homepageData?.hero?.subhead || 'Craft Beer, Friendly Atmosphere'}</h2>
        </div>
      </header>
      <main className="bg-black text-3xl flex flex-col justify-center text-center text-white py-12">
        <h2 className="font-title text-3xl font-bold text-white mb-6 col-span-full text-center">About Us</h2>
        <p className="text-xl">{homepageData?.intro}</p>
        <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-12 max-w-6xl">
          <h2 className="font-title text-3xl font-bold text-white mb-6 col-span-full text-center">Our Pubs</h2>
          {pubs.map((pub: { _id: string; slug: { current: string }; name: string; image: { asset: { url: string } } }) => (
            <li key={pub._id}>
              <Link
                className="block p-4 text-white hover:text-emerald-500"
                href={`/pub/${pub?.slug?.current}`}
              >
                <div className="text-center">
                  <Image
                    className="rounded-lg mx-auto"
                    src={pub?.image?.asset?.url}
                    alt={pub?.name || "Pub image"}
                    width={500}
                    height={500}
                  />
                  <p className="mt-2 text-lg">{pub?.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bg-emerald-950 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} The Crafty Collection</p>
      </footer>
    </>
  );
}