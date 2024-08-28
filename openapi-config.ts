import { ConfigFile, EndpointMatcherFunction } from '@rtk-query/codegen-openapi/lib/types';

// Resolver filters by endpoint path, not by operationName
const pathMatcher = (pattern: RegExp) => {
  const matherFn: EndpointMatcherFunction = (operationName, operationDefinition) => {
    return pattern.test(operationDefinition.path);
  };

  return matherFn;
};

const config: ConfigFile = {
  schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json', // TODO: Set your schemaFile
  apiFile: './src/services/api/api.ts',
  apiImport: 'API',
  hooks: { queries: true, lazyQueries: true, mutations: true },
  useEnumType: true,
  // TODO: Set your outputFiles
  outputFiles: {
    './src/services/api/pet/pet.api.ts': {
      filterEndpoints: pathMatcher(/^\/pet/i),
    },
  },
};

export default config;
