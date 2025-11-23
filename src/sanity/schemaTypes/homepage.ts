// schemas/homepage.js
import {defineType, defineField} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for the homepage document (not necessarily shown on site)',
      initialValue: 'Homepage'
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'subhead', title: 'Subhead', type: 'text' }),
        defineField({
          name: 'backgroundImage',
          title: 'Background image',
          type: 'image',
          options: {hotspot: true}
        })
      ]
    }),

    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),

    // defineField({
    //   name: 'seo',
    //   title: 'SEO / Open Graph',
    //   type: 'object',
    //   fields: [
    //     defineField({ name: 'metaTitle', title: 'Meta title', type: 'string' }),
    //     defineField({ name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3 }),
    //     defineField({ name: 'shareImage', title: 'Share image', type: 'image', options: {hotspot: true} })
    //   ]
    // }),

    // defineField({
    //   name: 'showAnnouncement',
    //   title: 'Show announcement bar',
    //   type: 'boolean',
    //   initialValue: false
    // }),

    // defineField({
    //   name: 'announcement',
    //   title: 'Announcement text',
    //   type: 'string',
    //   hidden: ({parent}) => !parent?.showAnnouncement
    // })
  ],

  preview: {
    select: {
      title: 'title',
      headline: 'hero.headline',
      media: 'hero.backgroundImage'
    },
    prepare(selection) {
      const {title, headline, media} = selection
      return {
        title: title || 'Homepage',
        subtitle: headline ? `Hero: ${headline}` : 'No hero headline',
        media
      }
    }
  }
})
