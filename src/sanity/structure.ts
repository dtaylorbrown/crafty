import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
  .title('Content')
  .items([
    S.listItem()
      .title('Homepage')
      .child(
        S.editor()
          .id('homepage')
          .schemaType('homepage')
          .documentId('homepage') // fixed ID ensures only one homepage document
      ),

    S.divider(),
    
    ...S.documentTypeListItems().filter(
      (listItem) => listItem.getId() !== 'homepage'
    ),
  ])
