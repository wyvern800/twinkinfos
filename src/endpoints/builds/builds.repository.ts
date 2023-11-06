import { DeepPartial, FindManyOptions } from 'typeorm';
import AppDataSource from '../../data-source';
import Build from '../../models/Build';
import { CharacterClassName } from '../../enums/classname';

const buildRepository = AppDataSource.getRepository(Build);

/**
 * Gets all the builds
 *
 * @returns { Promise<Build[]> } The builds array
 */
export const getAllBuilds = async (
  search: CharacterClassName,
): Promise<Build[]> => {
  const options: FindManyOptions<Build> = {
    relations: {
      user: true,
    },
    select: {
      user: {
        id: true,
        role: true,
        username: true,
      },
    },
  };

  // Check if search is a valid CharacterClassName
  if (search && !(search in CharacterClassName)) {
    return [];
  }

  if (!search || search === undefined) {
    return buildRepository.find(options);
  }

  options.where = {
    className: search,
  };

  return buildRepository.find(options);
};

/**
 * Inserts the build
 *
 * @param { DeepPartial<Build> } build Build
 * @returns { Promise<build> } The created build
 */
export const insert = async (build: DeepPartial<Build>): Promise<Build> => {
  return buildRepository.save(build);
};
