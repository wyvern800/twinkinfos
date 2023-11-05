/* eslint-disable import/prefer-default-export */
export const equipment = [
  'head',
  'neck',
  'shoulder',
  'back',
  'chest',
  'wrist',
  'hands',
  'waist',
  'legs',
  'feet',
  'finger1',
  'finger2',
  'trinket1',
  'trinket2',
  'mainHand',
  'offHand',
  'relic',
];

/**
 * Parses the user role from numeric to text
 *
 * @param { number } role The role ID
 * @returns { string} The role name parsed
 */
export const getRole = (role: number): string => {
  switch (role) {
    case 2:
      return 'admin';
    case 1:
      return 'staff';
    default:
      return 'user';
  }
};
