import { type SchemaTypeDefinition } from "sanity";

import { pubType } from "./pub";
import { staffType } from "./staff";
import { beerType } from "./beer";
import { homepage } from "./homepage";
import { eventType } from "./events";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pubType, staffType, beerType, homepage, eventType],
};
