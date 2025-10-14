import { defineQuery } from "next-sanity";

export const PUBS_QUERY =
  defineQuery(`*[_type == "pub" && defined(slug.current)][0...12]{
  _id, 
  name, 
  slug, 
  image { 
    ...,
    asset -> { 
      url, 
      metadata { dimensions } 
    } 
  }, 
}`);

export const PUB_QUERY =
  defineQuery(`*[_type == "pub" && slug.current == $slug][0]{
  name, 
  tagline, 
  address,
  description,
  tapType,
  image { 
    ...,
    asset -> { 
      url, 
      metadata { dimensions } 
    } 
  }, 
  "openingHours": availability, 
  beers[] -> {
    name, 
    description,
    tapType,
    abv,
    image { 
      ...,
      asset -> { 
        url, 
        metadata { dimensions } 
      } 
    }
  },  
  staff[] -> {
    name, 
    role
  }
}`);

export const HOME_QUERY =
  defineQuery(`*[_type == "homepage" && slug.current == "/home"]{
  slug,
  title,
  intro,
  hero {
    headline,
    subhead,
    backgroundImage { 
      ...,
      asset -> { 
        url, 
        metadata { dimensions } 
      } 
    }
  }
}`);

export const EVENTS_QUERY =
  defineQuery(`*[_type == "events" && date >= now()] | order(date asc)[0...3]{
  title,
  description,
  date,
    location -> {
    name,
    slug
  },
  image { 
    ...,
    asset -> { 
      url, 
      metadata { dimensions } 
    } 
  }
}`);
