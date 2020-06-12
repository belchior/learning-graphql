import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';

import { schema } from '../src/graphql/schema';


const filePath = typeof process.argv[2] === 'string'
  ? process.argv[2]
  : '../client/src/schema.graphql';

writeFileSync(filePath, printSchema(schema));
