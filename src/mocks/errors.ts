// TODO: Use this file to mock errors

// RESPONSE ERROR TYPES
export type MockInvalidRequestResponse = {
  code: number;
  message: string;
};
export type MockInvalidRequestValidationResponse = {
  errors: {
    [key: string]: string[];
  };
};
