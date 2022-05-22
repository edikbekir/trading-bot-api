import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

const filePath = resolve('src/config/', 'config.yaml');
const config: Record<string, any> = yaml.load(readFileSync(filePath, 'utf8'));

const getMongodbURI = () => {
  const {
    db: {
      mongodb: { user, password, url, database, params },
    },
  } = config;
  const connectionParams = new URLSearchParams(params).toString();

  return `mongodb+srv://${user}:${password}@${url}/${database}?${connectionParams}`;
};

export default () => ({
  databaseURI: getMongodbURI(),
  ...config,
});
