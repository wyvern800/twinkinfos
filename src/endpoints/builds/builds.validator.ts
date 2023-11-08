/* eslint-disable import/prefer-default-export */
import { body, query, ValidationChain } from 'express-validator';
import { CharacterClassName } from '../../enums/classname';
import { Item, AlternativeItem } from '../../types/others/item';
import { equipment } from '../../utils/constants';
import * as userRepository from '../users/users.repository';
import { CharacterRaceAlliance, CharacterRaceHorde } from '../../enums/race';
import { Brackets } from '../../enums/brackets';

/**
 * Validate if item has the correct structure
 *
 * @param value Object
 * @returns True if valid, throw error if not
 */
const validateItem = (value: Item): boolean => {
  if (
    !value ||
    !('hordeMainItemId' in value) ||
    !('allianceMainItemId' in value) ||
    !('alternatives' in value) ||
    Object.keys(value).length !== 3 ||
    !Array.isArray(value.alternatives) ||
    !value.alternatives.every(
      (alternative: AlternativeItem) =>
        Object.keys(alternative).length === 3 &&
        'hordeItemId' in alternative &&
        'allianceItemId' in alternative &&
        'priority' in alternative,
    )
  ) {
    throw new Error('Invalid item structure.');
  }
  return true;
};

/**
 * Validation chain for INSERTING builds
 */
export const createBuild: ValidationChain[] = [
  body('alias')
    .exists()
    .withMessage('A name for the build is required.')
    .isLength({ min: 5, max: 20 })
    .withMessage(
      'Build name must have at least 5 and maximum 20 characters long.',
    ),
  body('className')
    .custom(value => {
      if (!value) {
        return false;
      }
      if (!Object.values(CharacterClassName).includes(value)) {
        throw new Error('Invalid className.');
      }
      return true;
    })
    .withMessage('Invalid className. Must be one of the valid enum values.')
    .exists()
    .withMessage('className is required.'),
  body('user')
    .isUUID()
    .withMessage('Invalid user id.')
    .exists()
    .withMessage('User id is needed.')
    .custom(async (value: string) => {
      if (!value) {
        return false;
      }
      if (!(await userRepository.checkUUIDExists(value))) {
        throw new Error('User id not found');
      }
      return true;
    }),
  body('hordeRace')
    .exists()
    .withMessage('A horde race is needed.')
    .custom((value: CharacterRaceHorde) => value in CharacterRaceHorde)
    .withMessage(`Invalid race, must be a for example: Undead, Blood Elf...`),
  body('allianceRace')
    .exists()
    .withMessage('An alliance race is needed.')
    .custom((value: CharacterRaceAlliance) => value in CharacterRaceAlliance)
    .withMessage(`Invalid race, must be a for example: Gnome, Night Elf...`),
  body('bracket')
    .exists()
    .withMessage('An build bracket is needed.')
    .custom((value: Brackets) => value in Brackets)
    .withMessage(`Invalid bracket, must be a for example: 19, 29, 39`),
  // Spread all the validators
  ...equipment.map(equip => {
    return body(equip)
      .custom((value: Item) => validateItem(value))
      .withMessage(`Invalid item structure (${equip}).`)
      .optional();
  }),
];

export const searchByClass: ValidationChain[] = [
  query('search')
    .optional()
    .custom((value: CharacterClassName) => value in CharacterClassName)
    .withMessage(
      `Invalid class name, must be for example: Death Knight, Hunter...`,
    ),
];
