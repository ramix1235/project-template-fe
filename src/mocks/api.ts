import { API as api } from '#/services/api';

// TODO: Use this file to mock api calls

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const mockedAllPermissions = ['user:create', 'user:read', 'user:update', 'user:delete'];

// Invalid request response
const generateInvalidRequestResponse = (message: string) => {
  return {
    error: {
      status: 500,
      data: {
        code: 500,
        message,
      },
    },
  };
};

// Invalid request validation response
const generateInvalidRequestValidationResponse = (errors: { [key: string]: string[] }) => {
  return {
    error: {
      status: 400,
      data: {
        errors,
      },
    },
  };
};

const injectedMockApi = api.injectEndpoints({
  endpoints: (build) => ({
    mockPostCountUpdate: build.mutation<MockPostCountUpdateApiResponse, MockPostCountUpdateApiArg>({
      queryFn: async (queryArg) => {
        console.log(queryArg.count);

        await sleep();

        return {
          data: {
            isSuccess: true,
            count: queryArg.count + 1,
          },
        };
      },
    }),
    mockGetCount: build.query<MockGetCountResponse, void>({
      queryFn: async () => {
        await sleep();

        return {
          data: {
            isSuccess: true,
            count: 10,
          },
        };
      },
    }),
    mockRefreshToken: build.mutation<MockPostRefreshTokenApiResponse, MockPostRefreshTokenApiArg>({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
            token: `mockToken-${Date.now()}`,
          },
        };
      },
    }),
    mockPostLogin: build.mutation<MockPostLoginApiResponse, MockPostLoginApiArg>({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
            token: `mockToken-${Date.now()}`,
            permissions: mockedAllPermissions,
          },
        };
      },
    }),
    mockPostRegister: build.mutation<MockPostRegisterApiResponse, MockPostRegisterApiArg>({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
          },
        };
      },
    }),
    mockPostChangeEmailRequest: build.mutation<
      MockPostChangeEmailRequestApiResponse,
      MockPostChangeEmailRequestApiArg
    >({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return generateInvalidRequestValidationResponse({
          email: ['Mocked error - Invalid email', 'Mocked error - Incorrect email'],
        });
      },
    }),
    mockPostResetPasswordRequest: build.mutation<
      MockPostResetPasswordRequestApiResponse,
      MockPostResetPasswordRequestApiArg
    >({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
          },
        };
      },
    }),
    mockPostChangeEmailConfirm: build.mutation<
      MockPostChangeEmailConfirmApiResponse,
      MockPostChangeEmailConfirmApiArg
    >({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
          },
        };
      },
    }),
    mockPostActivateAccount: build.mutation<
      MockPostActivateAccountApiResponse,
      MockPostActivateAccountApiArg
    >({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
          },
        };
      },
    }),
    mockPostSetupPassword: build.mutation<
      MockPostSetupPasswordApiResponse,
      MockPostSetupPasswordApiArg
    >({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
          },
        };
      },
    }),
    mockPostChangePassword: build.mutation<
      MockPostChangePasswordApiResponse,
      MockPostChangePasswordApiArg
    >({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return generateInvalidRequestResponse('Mocked error - Invalid password');
      },
    }),
    mockPostResetPassword: build.mutation<
      MockPostResetPasswordApiResponse,
      MockPostResetPasswordApiArg
    >({
      queryFn: async (queryArg) => {
        console.log(queryArg);

        await sleep();

        return {
          data: {
            isSuccess: true,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export type MockPostCountUpdateApiResponse = {
  isSuccess: boolean;
  count: number;
};
export type MockPostCountUpdateApiArg = { count: number };
export type MockGetCountResponse = {
  isSuccess: boolean;
  count: number;
};
export type MockPostRefreshTokenApiResponse = {
  isSuccess: boolean;
  token: string;
};
export type MockPostRefreshTokenApiArg = {
  token: string;
};
export type MockPostLoginApiResponse = {
  isSuccess: boolean;
  token: string;
  permissions: string[];
};
export type MockPostLoginApiArg = {
  email: string;
  password: string;
};
export type MockPostRegisterApiResponse = {
  isSuccess: boolean;
};
export type MockPostRegisterApiArg = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type MockPostChangeEmailRequestApiResponse = {
  isSuccess: boolean;
};
export type MockPostChangeEmailRequestApiArg = {
  email: string;
  password: string;
};
export type MockPostResetPasswordRequestApiResponse = {
  isSuccess: boolean;
};
export type MockPostResetPasswordRequestApiArg = {
  email: string;
};
export type MockPostChangeEmailConfirmApiResponse = {
  isSuccess: boolean;
};
export type MockPostChangeEmailConfirmApiArg = {
  code: string;
};
export type MockPostActivateAccountApiResponse = {
  isSuccess: boolean;
};
export type MockPostActivateAccountApiArg = {
  code: string;
};
export type MockPostSetupPasswordApiResponse = {
  isSuccess: boolean;
};
export type MockPostSetupPasswordApiArg = {
  code: string;
  password: string;
  confirmPassword: string;
};
export type MockPostChangePasswordApiResponse = {
  isSuccess: boolean;
};
export type MockPostChangePasswordApiArg = {
  password: string;
  currentPassword: string;
  confirmPassword: string;
};
export type MockPostResetPasswordApiResponse = {
  isSuccess: boolean;
};
export type MockPostResetPasswordApiArg = {
  code: string;
  password: string;
  confirmPassword: string;
};

export { injectedMockApi as mockApi };
export const {
  useMockPostCountUpdateMutation,
  useMockGetCountQuery,
  useMockRefreshTokenMutation,
  useMockPostLoginMutation,
  useMockPostRegisterMutation,
  useMockPostChangeEmailRequestMutation,
  useMockPostResetPasswordRequestMutation,
  useMockPostChangeEmailConfirmMutation,
  useMockPostActivateAccountMutation,
  useMockPostSetupPasswordMutation,
  useMockPostChangePasswordMutation,
  useMockPostResetPasswordMutation,
} = injectedMockApi;
