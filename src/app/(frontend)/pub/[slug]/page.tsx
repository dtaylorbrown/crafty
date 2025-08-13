import React from "react";
// import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { PUB_QUERY } from "@/sanity/lib/queries";

// --- Types ---
export type OpeningHours = { day: string; hours: string }[];
export type Beer = { name: string; blurb?: string; abv?: string; origin?: string; image?: string };
export type EventItem = { title: string; date?: string; time?: string; description?: string };
export type Social = { platform: "facebook" | "instagram" | "x" | "tiktok" | "website"; url: string };

export type PubData = {
  name: string;
  tagline?: string;
  heroImage: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  bookingUrl?: string;
  openingHours?: OpeningHours;
  featuredBeers?: Beer[];
  events?: EventItem[];
  amenities?: string[];
  gallery?: string[];
  mapEmbedHtml?: string;
  socials?: Social[];
};

// --- Small helpers ---
const Section: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{title}</h2>
    {children}
  </section>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm border border-neutral-200">{children}</span>
);

// --- Main page component ---
export default async function Page({ params }: { params: { slug: string } }) {

  const { data: pubData } = await sanityFetch({
    query: PUB_QUERY,
    params: await params,
  });

  if (!pubData) {
    notFound();
  }

  console.log({ pubData });

  const pub: PubData = {
    name: "The Crafty Wilson",
    tagline: "Ale House",
    heroImage:
      "https://cdn.sanity.io/images/oyabwfgi/production/158c1a851223a12a2856828b21f02bd532138bfb-1691x1227.webp",
    address: "23 Cauldwell Ln, Monkseaton, Whitley Bay NE25 8SS",
    openingHours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "Closed" },
      { day: "Wednesday", hours: "5:00 PM - 10:00 PM" },
      { day: "Thursday", hours: "5:00 PM - 10:00 PM" },
      { day: "Friday", hours: "5:00 PM - 10:00 PM" },
      { day: "Saturday", hours: "4:00 PM - 11:00 PM" },
      { day: "Sunday", hours: "4:00 PM - 10:00 PM" },
    ],
    featuredBeers: [
      {
        name: "Clwb Tropica",
        blurb:
          "The UK's number one Tropical IPA. Pineapples. Mangoes. Peaches. Passion Fruits. We've got the lot.",
      },
      {
        name: "Neck Oil",
        blurb:
          "A refreshingly crisp IPA – a great place to ignite your craft beer journey.",
      },
    ],
    amenities: ["Dog friendly", "Cask & keg", "Card payments"],
    socials: [],
  };


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      {/* <header className="sticky top-0 z-40 backdrop-blur border-b border-neutral-200/70 bg-white/70">
        <Link href="/" className="font-extrabold text-lg md:text-xl tracking-tight">The Crafty Collection</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#about" className="hover:opacity-70">About</a>
          <a href="#hours" className="hover:opacity-70">Hours</a>
          <a href="#beers" className="hover:opacity-70">Beers</a>
          <a href="#find-us" className="hover:opacity-70">Find us</a>
        </nav>
      </header> */}

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
        {pubData?.image && (
          <Image
            className="rounded-lg w-full h-full"
            src={pubData?.image?.asset?.url}
            alt={pubData?.name || "Pub image"}
            width={pubData?.image?.asset?.metadata?.dimensions?.width || 500}
            height={pubData?.image?.asset?.metadata?.dimensions?.height || 500}
          />
        )}
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-[44vh] md:h-[60vh] flex items-end pb-10">
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-neutral-200 p-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{pub.name}</h1>
            <p className="text-neutral-600 mt-1 text-base md:text-lg">{pub.tagline}</p>
            {pub?.amenities?.length && pub.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {pub.amenities.map((a, i) => <Pill key={i}>{a}</Pill>)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      {(pub.description || pub.address) && (
        <Section title="About" id="about">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 leading-relaxed text-neutral-700">
              {pub.description ? (
                <p>{pub.description}</p>
              ) : (
                <p>Welcome to {pub.name}. Pull up a stool and discover rotating craft beers, a cosy atmosphere, and friendly faces.</p>
              )}
            </div>
            <div className="md:col-span-1 rounded-2xl border border-neutral-200 p-4">
              <h3 className="font-semibold">Find us</h3>
              {pub.address && <p className="mt-1 text-neutral-700">{pub.address}</p>}
              {pub.phone && <p className="mt-1">📞 {pub.phone}</p>}
              {pub.email && <p className="mt-1">✉️ {pub.email}</p>}
              <div className="flex gap-3 mt-3 flex-wrap">
                {pub?.socials?.length && pub.socials.map((s, i) => (
                  <a key={i} href={s.url} className="text-sm underline underline-offset-4 hover:opacity-80">{s.platform}</a>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Opening Hours */}
      {pub?.openingHours && pub.openingHours.length > 0 && (
        <Section title="Opening Hours" id="hours">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pub.openingHours.map((row, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
                <span className="font-medium">{row.day}</span>
                <span className="text-neutral-700">{row.hours}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Featured Beers */}
      {pub?.featuredBeers && pub.featuredBeers.length > 0 && (
        <Section title="Beers on now" id="beers">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pub.featuredBeers.map((b, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5 flex flex-col gap-3">
                {b.image && <img src={b.image} alt={b.name} className="rounded-xl aspect-video object-cover" />}
                <div>
                  <h3 className="text-lg font-semibold">{b.name}{b.abv ? <span className="text-sm font-normal text-neutral-500"> · {b.abv}</span> : null}</h3>
                  {b.origin && <p className="text-sm text-neutral-500">{b.origin}</p>}
                </div>
                {b.blurb && <p className="text-sm text-neutral-700 leading-relaxed">{b.blurb}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Events */}
      {/* {events.length > 0 && (
        <Section title="Events" id="events">
          <div className="grid sm:grid-cols-2 gap-6">
            {events.map((e, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="text-sm text-neutral-600">{[e.date, e.time].filter(Boolean).join(" · ")}</p>
                {e.description && <p className="mt-2 text-sm text-neutral-700">{e.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )} */}

      {/* Gallery */}
      {pub?.gallery && pub.gallery?.length > 0 && (
        <Section title="Gallery">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pub.gallery.map((src, i) => (
              <img key={i} src={src} className="rounded-xl object-cover aspect-[4/3]" />
            ))}
          </div>
        </Section>
      )}

      {/* Map / Find us */}
      {(pub.mapEmbedHtml || pub.address) && (
        <Section title="Find us" id="find-us">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border border-neutral-200 p-4">
              <h3 className="font-semibold">Address</h3>
              <p className="mt-1 text-neutral-700">{pub.address}</p>
            </div>
            {pub.mapEmbedHtml ? (
              <div className="rounded-2xl overflow-hidden border border-neutral-200" dangerouslySetInnerHTML={{ __html: pub.mapEmbedHtml }} />
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-500">Add a Google Maps embed to show your exact location.</div>
            )}
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-sm text-neutral-600 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>© {new Date().getFullYear()} The Crafty Collection</div>
          <div className="flex gap-4">
            {pub.socials?.length && pub.socials.map((s, i) => (
              <a key={i} href={s.url} className="underline underline-offset-4 hover:opacity-80">{s.platform}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}


// import { sanityFetch } from "@/sanity/lib/live";
// import { PUB_QUERY } from "@/sanity/lib/queries";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// // TODO ffix opening hour types - get from sanity?
// type OpeningHour = {
//   day: string;
//   availableTimes: { from: string; to: string }[];
// };

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {


//   return (
//     <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
//       <h1 className="text-4xl font-bold text-balance">{pub?.name}</h1>
//       <h2 className="text-2xl font-bold text-balance">{pub?.tagline}</h2>
//       <h3 className="text-xl font-bold text-balance">Opening Hours</h3>
//       <div className="text-lg text-balance">
//         {pub?.openingHours && pub.openingHours.map((day: OpeningHour) => {
//           return (
//             <p key={day.day}>
//               <strong>{day.day}:</strong> {day?.availableTimes?.length > 0 ? day.availableTimes[0].from + ' - ' + day.availableTimes[0].to : "Closed"}
//             </p>
//           );
//         })}
//       </div>
//       <p className="text-lg text-balance">
//         <strong>Address:</strong> {pub?.address}
//       </p>
      // {pub?.image && (
      //   <Image
      //     className="rounded-lg"
      //     src={pub?.image?.asset?.url}
      //     alt={pub?.name || "Pub image"}
      //     width={pub?.image?.asset?.metadata?.dimensions?.width || 500}
      //     height={pub?.image?.asset?.metadata?.dimensions?.height || 500}
      //   />
      // )}
//       <hr />
//       <h3 className="text-xl font-bold text-balance">Beers</h3>
//       <ul className="list-disc pl-6">
//         {pub?.beers?.length > 0 ? (
//           pub.beers.map((beer: { name: string; description: string }) => (
//             <li key={beer.name} className="text-lg text-balance">
//               <strong>{beer.name}</strong>: {beer.description}
//             </li>
//           ))
//         ) : (
//           <li className="text-lg text-balance">No beers available</li>
//         )}
//       </ul>
//       <hr />
//       <Link href="/">&larr; Return home</Link>
//     </main>
//   );
// }