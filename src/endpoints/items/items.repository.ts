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

export const getById = async (itemId: number): Promise<Item[] | null> => {
  const items = new Database.Items({ iconSrc: 'blizzard' }).filter(
    item => item.itemId === itemId,
  );
  return items;
};
