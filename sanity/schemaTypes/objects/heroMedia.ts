import {defineField, defineType} from 'sanity'

/** Image-or-video slot used on the right side of the hero. */
export const heroMedia = defineType({
  name: 'heroMedia',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers and search engines.',
        }),
      ],
    }),
    defineField({
      name: 'videoFile',
      title: 'Video file',
      type: 'file',
      description: 'Upload an MP4 or WebM. Plays muted, looped and automatically.',
      options: {accept: 'video/mp4,video/webm'},
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Use instead of an upload if the MP4/WebM is hosted elsewhere. An uploaded file wins if both are set.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'poster',
      title: 'Video poster image',
      type: 'image',
      description: 'Shown while the video loads.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
  ],
})
