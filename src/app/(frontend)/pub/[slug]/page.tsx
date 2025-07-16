import { sanityFetch } from "@/sanity/lib/live";
import { PUB_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// TODO ffix opening hour types - get from sanity?
type OpeningHour = {
  day: string;
  availableTimes: { from: string; to: string }[];
};

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
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold text-balance">{pub?.name}</h1>
      <h2 className="text-2xl font-bold text-balance">{pub?.tagline}</h2>
      <h3 className="text-xl font-bold text-balance">Opeing Hours</h3>
      <div className="text-lg text-balance">
        {pub?.openingHours && pub.openingHours.map((day: OpeningHour) => {
          return (
            <p key={day.day}>
              <strong>{day.day}:</strong> {day?.availableTimes?.length > 0 ? day.availableTimes[0].from + ' - ' + day.availableTimes[0].to : "Closed"}
            </p>
          );
        })}
      </div>
      <p className="text-lg text-balance">
        <strong>Address:</strong> {pub?.address}
      </p>
      {pub?.image && (
        <Image
          className="rounded-lg"
          src={pub?.image?.asset?.url}
          alt={pub?.name || "Pub image"}
          width={pub?.image?.asset?.metadata?.dimensions?.width || 500}
          height={pub?.image?.asset?.metadata?.dimensions?.height || 500}
        />
      )}
      <hr />
      <Link href="/">&larr; Return home</Link>
    </main>
  );
}