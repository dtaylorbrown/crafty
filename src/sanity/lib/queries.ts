import { defineQuery } from "next-sanity";

export const PUBS_QUERY =
  defineQuery(`*[_type == "pub" && defined(slug.current)][0...12]{
  _id, name, slug
}`);

export const PUB_QUERY =
  defineQuery(`*[_type == "pub" && slug.current == $slug][0]{
  name, tagline, address, image { ..., asset-> { url, metadata { dimensions } } }, "openingHours": availability
}`);
