import Link from "next/link";
import Image from "next/image";

import { client } from "@/sanity/lib/client";
import { PUBS_QUERY } from "@/sanity/lib/queries";

const options = { next: { revalidate: 60 } };

export default async function Page() {
  const pubs = await client.fetch(PUBS_QUERY, {}, options);

  return (
    <>
      <header className="h-[480px] bg-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8">The Crafty Collection</h1>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white">Craft Beer, Friendly Atmosphere</h2>
        </div>
      </header>
      <main className="bg-black">
        <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-12 max-w-6xl">
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