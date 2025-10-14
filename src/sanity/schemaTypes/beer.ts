import { defineField, defineType } from "sanity";

export const beerType = defineType({
  name: "beer",
  title: "Beer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "Name of the beer",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "A brief description of the beer",
      type: "text",
    }),
    defineField({
      name: "abv",
      title: "ABV",
      description: "Alcohol by volume percentage",
      type: "number",
    }),
    defineField({
      name: "style",
      title: "Style",
      description: "Type or style of the beer (e.g., IPA, Stout)",
      type: "string",
    }),
    defineField({
      name: "allergens",
      title: "Allergens",
      description: "List of allergens present in the beer",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "brewery",
      title: "Brewery",
      description: "The brewery that produces the beer",
      type: "string",
    }),
    defineField({
      name: "comingSoon",
      title: "Coming Soon",
      description: "Indicates if the beer is coming soon",
      type: "boolean",
    }),
    defineField({
      name: "availableDate",
      title: "Available From",
      description: "Date when the beer will be available",
      type: "datetime",
      hidden: ({ document }) => {
        return !document?.comingSoon;
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "An image of the beer",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
