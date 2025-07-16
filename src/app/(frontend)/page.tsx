import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PUBS_QUERY } from "@/sanity/lib/queries";

const options = { next: { revalidate: 60 } };

export default async function Page() {
  const pubs = await client.fetch(PUBS_QUERY, {}, options);

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">The Crafty Collection</h1>
      <ul className="grid grid-cols-1 divide-y divide-blue-100">
        {pubs.map((pub) => (
          <li key={pub._id}>
            <Link
              className="block p-4 hover:text-blue-500"
              href={`/pub/${pub?.slug?.current}`}
            >
              {pub?.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}