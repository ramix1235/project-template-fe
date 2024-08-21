import { enhancedApi } from './user.api';

export default enhancedApi.enhanceEndpoints({
  endpoints: {
    loginUser: {
      query: (queryArg) => ({
        url: `/user/login`,
        params: { username: queryArg.username, password: queryArg.password },
        responseHandler: 'text',
      }),
    },
  },
});
