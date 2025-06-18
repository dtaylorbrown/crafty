import { type SchemaTypeDefinition } from "sanity";

import { pubType } from "./pub";
import { staffType } from "./staff";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pubType, staffType],
};
