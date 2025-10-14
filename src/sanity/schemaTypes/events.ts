import { defineField, defineType } from "sanity";
import { format } from "date-fns";

export const eventType = defineType({
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Name of the event",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "A brief description of the event",
      type: "text",
    }),
    defineField({
      name: "date",
      title: "Date",
      description: "Date of the event",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "Location where the event will take place",
      type: "reference",
      to: [{ type: "pub" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "Event poster or related image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "image",
    },
    prepare(selection) {
      const { title, date, media } = selection;
      return {
        title: title || "Unnamed event",
        subtitle: date
          ? `Date: ${format(date, "MMMM d, yyyy")}`
          : "No event date",
        media,
      };
    },
  },
});
