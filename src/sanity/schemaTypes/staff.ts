import { defineField, defineType } from "sanity";

export const staffType = defineType({
  name: "staff",
  title: "Staff",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "Full name of the staff member",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      description: "Role or position of the staff member",
      type: "string",
    }),
    defineField({
      name: "funfact",
      title: "Fun Fact",
      description: "A fun fact about the staff member",
      type: "string",
    }),
    defineField({
      name: "mugshot",
      title: "Mugshot",
      description: "A photo of the staff member",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "pub",
      title: "Pub",
      description: "The pub where the staff member works",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "pub",
            },
          ],
        },
      ],
    }),
  ],
});
