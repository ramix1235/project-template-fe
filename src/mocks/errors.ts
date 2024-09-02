// TODO: Use this file to mock errors

// RESPONSE ERROR TYPES
export type MockedInvalidRequestResponse = {
  code: number;
  message: string;
};
export type MockedInvalidRequestValidationResponse = {
  errors: {
    [key: string]: string[];
  };
};
