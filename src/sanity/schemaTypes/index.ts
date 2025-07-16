import { type SchemaTypeDefinition } from "sanity";

import { pubType } from "./pub";
import { staffType } from "./staff";
import { beerType } from "./beer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pubType, staffType, beerType],
};
