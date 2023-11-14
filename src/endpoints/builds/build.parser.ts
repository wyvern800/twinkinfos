/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { equipment } from '../../utils/constants';

export const parseBuild = (requestBody: any, itemsRepository: any): any => {
  const newBuildObject: any = {};

  // For the response body loop it up
  Object.entries(requestBody).forEach(
    ([buildKey, buildValue]: [string, any]) => {
      // If there is no buildValue and it is actually an equipment slot
      if (buildValue !== null && equipment.includes(buildKey)) {
        const newBuildEquipmentParsed: any = {};

        // Map the equipment slot object and check if it is any of the keys shown
        Object.entries(buildValue).forEach(([k, v]: [string, any]) => {
          if (
            k === 'hordeMainItemId' ||
            k === 'allianceMainItemId' ||
            k === 'allianceMainItemNotes' ||
            k === 'hordeMainItemNotes'
          ) {
            const isHorde = k === 'hordeMainItemId';
            const itemId = Number(v);
            const item = itemsRepository.getById(itemId);
            const allianceNotes = buildValue?.allianceMainItemNotes;
            const hordeNotes = buildValue?.hordeMainItemNotes;

            if (item) {
              // Create an array to store both hordeItem and allianceItem
              newBuildEquipmentParsed.items =
                newBuildEquipmentParsed.items || [];

              newBuildEquipmentParsed.items.push({
                type: isHorde ? 'hordeItem' : 'allianceItem',
                ...item,
                notes: isHorde ? hordeNotes : allianceNotes,
              });
            }
          } else if (k === 'alternatives') {
            const parsedAlternatives = (v || [])
              .map((alt: any) => {
                const itemId = alt?.itemId;
                const priority = alt?.priority;
                const notes = alt?.notes;
                const type = alt?.type;

                if (itemId) {
                  const itemIdParsed = Number(itemId);
                  const item = itemsRepository.getById(itemIdParsed);

                  if (item) {
                    return {
                      ...item,
                      type,
                      notes,
                      priority,
                    };
                  }
                }

                return null;
              })
              .filter(Boolean);

            newBuildEquipmentParsed.alternatives = parsedAlternatives.sort(
              (a: any, b: any) => a.priority - b.priority,
            );
          }
        });

        // Only delete if there are actual keys to delete
        if (
          Object.keys(newBuildObject).some(
            nBOKey => !equipment.includes(nBOKey),
          )
        ) {
          Object.keys(newBuildObject).forEach(nBOKey => {
            if (!equipment.includes(nBOKey)) {
              delete newBuildObject[nBOKey];
            }
          });
        }

        newBuildObject[buildKey] = newBuildEquipmentParsed;
      }
    },
  );

  return newBuildObject;
};
