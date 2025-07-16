import { defineField, defineType } from "sanity";

export const pubType = defineType({
  name: "pub",
  title: "Pub",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "tagline",
      type: "string",
    }),
    defineField({
      name: 'availability',
      title: 'Opening Times',
      description: 'The opening times of the pub',
      type: 'availability',
    }),
    defineField({
      name: "address",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "beers",
      type: "array",
      description: "Beers available at this pub",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "beer",
            },
          ],
        },
      ],
    }),
  ],
});
