import { type SchemaTypeDefinition } from "sanity";

import { pubType } from "./pub";
import { staffType } from "./staff";
import { beerType } from "./beer";
import { homepage } from "./homepage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pubType, staffType, beerType, homepage],
};
