/* eslint-disable import/prefer-default-export */
import { equipment } from '../../utils/constants';

/**
 * Parses the build for better format to
 *
 * @param { Build } requestBody The request body containing the build data from front-end
 * @param { any } itemsRepository The item repository
 * @returns
 */
export const parseBuild = (requestBody: any, itemsRepository: any): any => {
  const newBuildObject: any = {};
  // Map all builds and their object key/vals
  Object.entries({
    ...requestBody,
  }).map(([buildKey, buildValue]: any) => {
    if (buildValue !== null) {
      const newBuildEquipmentParsed: any = {};
      // if the build key is within the equipments array, then proceed the parsing
      if (equipment.includes(buildKey)) {
        Object.entries(buildValue).map(([k, v]) => {
          // Convert mainItemId to an actual item
          if (k === 'hordeMainItemId') {
            const item = itemsRepository.getById(Number(v));
            if (item) {
              newBuildEquipmentParsed.hordeItem = item;
            }
          } else if (k === 'allianceMainItemId') {
            const item = itemsRepository.getById(Number(v));
            if (item) {
              newBuildEquipmentParsed.allianceItem = item;
            }
          } else if (k === 'alternatives') {
            const parsedAlternactives: any[] = [];
            const alternativesOriginal: any = v;
            alternativesOriginal.map((alt: any) => {
              const newAlternactive: any = {};
              // Map the alternactive object
              Object.entries(alt).map(([altKey, altVal]) => {
                if (altKey === 'hordeItemId') {
                  const item = itemsRepository.getById(Number(altVal));
                  if (item) {
                    newAlternactive.hordeItem = {
                      ...item,
                      isHorde: true,
                    };
                  }
                } else if (altKey === 'allianceItemId') {
                  const item = itemsRepository.getById(Number(altVal));
                  if (item) {
                    newAlternactive.allianceItem = {
                      ...item,
                      isHorde: false,
                    };
                  }
                } else {
                  newAlternactive.priority = altVal;
                }

                return [altKey, altVal];
              });
              parsedAlternactives.push(newAlternactive);
              return newAlternactive;
            });
            // Map the alternatives
            newBuildEquipmentParsed.alternatives = parsedAlternactives.sort(
              (a, b) => a.priority - b.priority,
            );
          }
          return [k, v];
        });

        // delete all old object vals
        Object.entries(newBuildObject).map(([nBOKey, nBOValue]) => {
          if (!equipment.includes(nBOKey)) {
            delete newBuildObject[nBOKey];
          }
          return [nBOKey, nBOValue];
        });

        newBuildObject[buildKey] = newBuildEquipmentParsed;
      }

      return newBuildEquipmentParsed;
    }
    return [buildKey, buildValue];
  });
  return newBuildObject;
};
