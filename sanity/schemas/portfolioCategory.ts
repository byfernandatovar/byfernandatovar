import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'portfolioCategory',
  title: 'Portfolio Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Slug',
      type: 'string',
      description: 'Identificador único (weddings, couples, portraits, moments)',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const validSlugs = ['weddings', 'couples', 'portraits', 'moments'];
          if (value && !validSlugs.includes(value)) {
            return `Debe ser uno de: ${validSlugs.join(', ')}`;
          }
          return true;
        }),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Título que se muestra en la página',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      description: 'Subtítulo que aparece encima del título',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      description: 'Imagen que se muestra en la página principal del portfolio',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Descripción de la imagen para accesibilidad',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imágenes de la Galería',
      type: 'array',
      description: 'Arrastra para reordenar las imágenes de la galería',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Descripción de la imagen para accesibilidad',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
      media: 'images.0',
    },
  },
});

