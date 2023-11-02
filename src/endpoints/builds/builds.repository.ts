import { DeepPartial } from 'typeorm';
import AppDataSource from '../../data-source';
import Build from '../../models/Build';

const buildRepository = AppDataSource.getRepository(Build);

/**
 * Gets all the builds
 *
 * @returns { Promise<Build[]> } The builds array
 */
export const getAllBuilds = async (): Promise<Build[]> => {
  return buildRepository.find({
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
  });
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
