import Database from 'wow-classic-items';
import { CharacterClass } from 'wow-classic-items/types/CharacterClass';

// const userRepository = AppDataSource.getRepository(User);

/**
 * Gets all classes by name
 *
 * @param { string } _className The className
 * @returns { Promise<CharacterClass[]> } The user object if existant
 */
export const getAllClasses = async (
  _className: string,
): Promise<CharacterClass[] | null> => {
  const classes = new Database.Classes({ iconSrc: 'blizzard' });
  if (_className) {
    return classes.filter(
      className =>
        className.name.toLowerCase().includes(_className.toLowerCase()) &&
        className.name.toLowerCase() === _className.toLowerCase(),
    );
  }
  return classes;
};

/**
 * Gets all items by class name
 *
 * @param { number } _className The class name
 * @returns { Promise<CharacterClass[]> } The list of classes
 */
export const getByClassName = async (
  _className: string,
): Promise<CharacterClass[] | null> => {
  const classes = new Database.Classes({ iconSrc: 'blizzard' }).filter(
    className => className.name.toLowerCase() === _className.toLowerCase(),
  );
  return classes;
};
