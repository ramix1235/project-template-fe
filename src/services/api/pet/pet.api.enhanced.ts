import { enhancedApi, FindPetsByTagsApiResponse } from './pet.api';

export default enhancedApi.enhanceEndpoints({
  addTagTypes: ['Pets'],
  endpoints: {
    findPetsByTags: {
      transformResponse: (response: FindPetsByTagsApiResponse) => response.toReversed(),
      providesTags: ['Pets'],
    },
    addPet: {
      invalidatesTags: (result, error) => (error ? [] : ['Pets']),
    },
  },
});
