import {
  generateInvalidRequestResponse,
  generateInvalidRequestValidationResponse,
} from '#/mocks/api';

import {
  isFetchBaseQueryError,
  isInvalidValidationRequestError,
  getErrorText,
  ErrorCodes,
} from './errors';

describe('service: errors', () => {
  it('detects network error', () => {
    const result = isFetchBaseQueryError({
      status: ErrorCodes.FetchError,
      error: 'Mock error',
    });

    expect(result).toBe(true);
  });

  it('detects invalid validation request error', () => {
    const result = isInvalidValidationRequestError(
      generateInvalidRequestValidationResponse({
        email: ['Mock error 1', 'Mock error 2'],
      }).error,
    );

    expect(result).toBe(true);
  });

  it('provides text for string error', () => {
    const result = getErrorText('Mock error');

    expect(result).toBe('Mock error');
  });

  it('provides text for error with message', () => {
    const result = getErrorText({ message: 'Mock error' });

    expect(result).toBe('Mock error');
  });

  it('provides text for network error', () => {
    const result = getErrorText(generateInvalidRequestResponse('Mock error').error);

    expect(result).toBe('Mock error');
  });

  it('provides default text for unexpected error type', () => {
    const result = getErrorText({
      unexpectedErrorPath: 'Mock error',
    });

    expect(result).toBe('errors.common');
  });
});
