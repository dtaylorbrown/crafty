import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import { client } from "@/sanity/lib/client";
import { HOME_QUERY, PUBS_QUERY, EVENTS_QUERY } from "@/sanity/lib/queries";

const options = { next: { revalidate: 60 } };

export default async function Page() {
  const pageData = await client.fetch(HOME_QUERY, {}, options);
  const pubs = await client.fetch(PUBS_QUERY, {}, options);
  const events = await client.fetch(EVENTS_QUERY, {}, options);

  const homepageData = pageData?.[0];

  return (
    <>
      <header className="h-[620px] flex bg-black items-center justify-center relative">
        {homepageData?.hero?.backgroundImage?.asset?.url && (
          <div className="absolute w-full h-full opacity-25">
            <Image
              src={homepageData.hero.backgroundImage.asset.url}
              alt='Hero image'
              className="object-cover rounded-2xl shadow-lg"
              priority
              fill
            />
          </div>
        )}
        <div className="text-center relative z-1">
          <h1 className="font-title text-4xl sm:text-6xl font-bold text-white mb-2 sm:mb-4">{homepageData?.hero?.headline || 'The Crafty Collection'}</h1>
          <h2 className="text-lg sm:text-2xl font-semibold text-white">{homepageData?.hero?.subhead || 'Craft Beer, Friendly Atmosphere'}</h2>
        </div>
      </header>
      <main className="text-3xl flex flex-col justify-center text-center">
        <section className="bg-black text-white">
          <div className="py-12 px-8 max-w-4xl mx-auto">
            <h2 className="font-title text-3xl font-bold text-white mb-6 col-span-full text-center">About Us</h2>
            <p className="text-lg">{homepageData?.intro}</p>
          </div>
        </section>
        <section className="bg-white text-black">
          <div className="py-12 px-8 max-w-4xl mx-auto">
            <h2 className="font-title text-3xl font-bold text-black my-6 col-span-full text-center">Our Pubs</h2>
            <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl">
              {pubs.map((pub) => (
                <li key={pub._id}>
                  <Link
                    className="block p-4 text-black hover:text-emerald-950"
                    href={`/pub/${pub?.slug?.current}`}
                  >
                    <div className="text-center">
                      {pub?.image?.asset?.url && (
                        <Image
                          className="rounded-lg mx-auto sm:max-h-[260px] object-cover"
                          src={pub?.image?.asset?.url}
                          alt={pub?.name || "Pub image"}
                          width={500}
                          height={400}
                        />
                      )}
                      <p className="mt-3 text-xl font-title">{pub?.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="bg-black text-white">
          <div className="py-12 px-8 max-w-4xl mx-auto">
            <h2 className="font-title text-3xl font-bold text-white mb-6 col-span-full text-center">What&#39;s On</h2>
            <p className="text-lg">Events happening soon across both of our pubs:</p>
            <ul className="mt-6 space-y-6 max-w-xl mx-auto">
              {events.length > 0 ? events.map((event) => (
                <li key={event.title} className="p-4 flex">
                  {event?.date &&
                    <h3 className="w-[75px] text-3xl font-title pr-4 mr-4 flex-shrink-0 text-white flex justify-center items-center border-r-2 border-emerald-950">
                      {format(new Date(event.date), "MMMM d, yyyy") === format(new Date(), "MMMM d, yyyy") ? "Today" : format(new Date(event.date), "do MMM")}
                    </h3>
                  }
                  <div className="flex-grow text-left">
                    <h3 className="text-2xl font-title">{event.title}</h3>
                    {event.date && (
                      <p className="text-sm italic mb-2">
                        {new Date(event.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        {event?.location && ` @ ${event.location.name}`}
                      </p>
                    )}
                    <p className="text-sm">{event.description}</p>
                  </div>
                </li>
              )) : (
                <li className="text-lg">No upcoming events. Please check back later!</li>
              )}
            </ul>
          </div>
        </section>
      </main>
      <footer className="bg-emerald-950 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} The Crafty Collection</p>
      </footer>
    </>
  );
}