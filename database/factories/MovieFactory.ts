import Factory from '@ioc:Adonis/Lucid/Factory';
import Movie from "App/Models/Movie";
import { DateTime } from 'luxon';

export const MovieFactory = Factory
  .define(Movie, ({ faker }) => {
    return {
      name: faker.lorem.words(1),
      description: faker.lorem.words(10),
      note: faker.number.int({ min: 1, max: 5 }),
      releaseDate: DateTime.fromJSDate(faker.date.past()),
    }
  })
  .build()

