import { DeepPartial, FindManyOptions } from 'typeorm';
import { InsertOneResult } from 'mongodb';
import AppDataSource from '../../data-source';
import Build from '../../models/Build';
import { CharacterClassName } from '../../enums/classname';
import mongoDB from '../../utils/mongo';

const buildRepository = AppDataSource.getRepository(Build);
const mongo = mongoDB.getInstance();

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

/**
 * Inserts the build into the mongo repository
 *
 * @param { InsertOneResult } build The build
 * @returns { InsertOneResult<Build> } The result of inserting one document
 */
export const insertMongo = async (
  build: DeepPartial<Build>,
): Promise<InsertOneResult<Build>> => {
  const collection = (await mongo.connect('twinkinfos')).collection('builds');
  const result = await collection.insertOne(build);
  return result;
};

/**
 * Try to get a build from an ID if existant, if not, returns null
 *
 * @param { any } options The build
 * @returns { Promise<WithId<Build> | null> } The result of finding one document
 */
export const getByIdMongo = async (options?: any): Promise<any> => {
  const collection = (await mongo.connect('twinkinfos')).collection('builds');
  const result = await collection.findOne(options);
  return result;
};
