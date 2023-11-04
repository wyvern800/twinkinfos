import Database from 'wow-classic-items';
import { Item } from 'wow-classic-items/types/Item';

// const userRepository = AppDataSource.getRepository(User);

/**
 * Gets all items by name
 *
 * @param { string } itemName The username
 * @returns { Promise<Item[]> } The user object if existant
 */
export const getAllItems = async (itemName: string): Promise<Item[] | null> => {
  const items = new Database.Items({ iconSrc: 'blizzard' });
  if (itemName) {
    return items.filter(item =>
      item.name.toLowerCase().includes(itemName.toLowerCase()),
    );
  }
  return [];
};

/**
 * Gets all items by id
 *
 * @param { number } itemId The itemId
 * @returns { Promise<Item[]> } The user object if existant
 */
export const getById = (itemId: number): Item | undefined => {
  const items = new Database.Items({ iconSrc: 'blizzard' }).find(
    item => item.itemId === itemId,
  );
  return items;
};
