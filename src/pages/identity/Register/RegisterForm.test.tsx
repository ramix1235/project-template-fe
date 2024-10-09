import { notifications } from '@mantine/notifications';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as mockApi from '#/mocks/api';
import { MAX_EMAIL_LENGTH, MAX_FIELD_LENGTH, MAX_PASSWORD_LENGTH } from '#/services/auth';
import * as forms from '#/services/forms';
import {
  MOCK_EMAIL,
  MOCK_PASSWORD,
  attachMantine,
  hasFormAnyErrors,
  spyMutationHook,
} from '#/tests';

import { RegisterFormValues } from './Register.schema';
import RegisterForm from './RegisterForm';

interface RenderRegisterForm {
  prefilledValues?: Partial<RegisterFormValues>;
  attachNotificationsSystem?: boolean;
}

const renderRegisterForm = async ({
  prefilledValues = {},
  attachNotificationsSystem = false,
}: RenderRegisterForm = {}) => {
  const { mantineWrapper } = attachMantine({ attachNotificationsSystem });

  render(<RegisterForm />, {
    wrapper: ({ children }) => mantineWrapper(<MemoryRouter>{children}</MemoryRouter>),
  });

  const firstNameInput = screen.getByLabelText<HTMLInputElement>('user.firstName');
  const lastNameInput = screen.getByLabelText<HTMLInputElement>('user.lastName');
  const emailInput = screen.getByLabelText<HTMLInputElement>('user.email');
  const passwordInput = screen.getByLabelText<HTMLInputElement>('user.password');
  const termsCheckbox = screen.getByLabelText<HTMLInputElement>('identity.register.terms');

  const { firstName, lastName, email, password, terms } = prefilledValues;

  if (firstName) {
    await userEvent.type(firstNameInput, firstName);
  }

  if (lastName) {
    await userEvent.type(lastNameInput, lastName);
  }

  if (email) {
    await userEvent.type(emailInput, email);
  }

  if (password) {
    await userEvent.type(passwordInput, password);
  }

  if (terms) {
    await userEvent.click(termsCheckbox);
  }

  return {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    termsCheckbox,
    submitButton: screen.getByRole('button', { name: 'identity.register' }),
  };
};

describe('component: RegisterForm', () => {
  beforeEach(() => {
    spyMutationHook(mockApi, 'useMockPostRegisterMutation', {
      isSuccess: true,
    });
    vi.spyOn(forms, 'useFormErrorHandler').mockReturnValue({
      firstErrorFocus: vi.fn(),
    });
  });

  afterEach(() => {
    act(() => {
      notifications.clean();
    });
  });

  it('validates first name field', async () => {
    const { firstNameInput, submitButton } = await renderRegisterForm({
      prefilledValues: {
        lastName: 'Mock last name',
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
        terms: true,
      },
    });

    // required
    await userEvent.click(submitButton);

    const requiredError = screen.getByText('errors.required');

    expect(requiredError).toBeInTheDocument();

    // max length
    await userEvent.type(
      firstNameInput,
      Array(MAX_FIELD_LENGTH + 1)
        .fill('a')
        .join(''),
    );
    await userEvent.click(submitButton);

    const maxLengthError = screen.getByText('errors.max');

    expect(maxLengthError).toBeInTheDocument();

    // no errors
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'Mock first name');
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('validates last name field', async () => {
    const { lastNameInput, submitButton } = await renderRegisterForm({
      prefilledValues: {
        firstName: 'Mock first name',
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
        terms: true,
      },
    });

    // required
    await userEvent.click(submitButton);

    const requiredError = screen.getByText('errors.required');

    expect(requiredError).toBeInTheDocument();

    // max length
    await userEvent.type(
      lastNameInput,
      Array(MAX_FIELD_LENGTH + 1)
        .fill('a')
        .join(''),
    );
    await userEvent.click(submitButton);

    const maxLengthError = screen.getByText('errors.max');

    expect(maxLengthError).toBeInTheDocument();

    // no errors
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, 'Mock last name');
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('validates email field', async () => {
    const { emailInput, submitButton } = await renderRegisterForm({
      prefilledValues: {
        firstName: 'Mock first name',
        lastName: 'Mock last name',
        password: MOCK_PASSWORD,
        terms: true,
      },
    });

    // required
    await userEvent.click(submitButton);

    const requiredError = screen.getByText('errors.required');

    expect(requiredError).toBeInTheDocument();

    // invalid format
    await userEvent.type(emailInput, 'mock@mail');
    await userEvent.click(submitButton);

    const invalidFormatError = screen.getByText('user.email.errors.format');

    expect(invalidFormatError).toBeInTheDocument();

    // max length
    await userEvent.clear(emailInput);
    await userEvent.type(
      emailInput,
      Array(MAX_EMAIL_LENGTH + 1)
        .fill('a')
        .join(''),
    );
    await userEvent.click(submitButton);

    const maxLengthError = screen.getByText('errors.max');

    expect(maxLengthError).toBeInTheDocument();

    // no errors
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, MOCK_EMAIL);
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('validates password field', async () => {
    const { passwordInput, submitButton } = await renderRegisterForm({
      prefilledValues: {
        firstName: 'Mock first name',
        lastName: 'Mock last name',
        email: MOCK_EMAIL,
        terms: true,
      },
    });

    // required
    await userEvent.click(submitButton);

    const requiredError = screen.getByText('errors.required');

    expect(requiredError).toBeInTheDocument();

    // invalid format
    await userEvent.type(passwordInput, 'qwerty');
    await userEvent.click(submitButton);

    const invalidFormatError = screen.getByText('user.password.errors.format');

    expect(invalidFormatError).toBeInTheDocument();

    // invalid format
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Qwerty');
    await userEvent.click(submitButton);

    expect(invalidFormatError).toBeInTheDocument();

    // invalid format
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Qwerty1');
    await userEvent.click(submitButton);

    expect(invalidFormatError).toBeInTheDocument();

    // invalid format
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Qwert1!');
    await userEvent.click(submitButton);

    expect(invalidFormatError).toBeInTheDocument();

    // invalid format
    await userEvent.clear(passwordInput);
    await userEvent.type(
      passwordInput,
      `${MOCK_PASSWORD}${Array(MAX_PASSWORD_LENGTH + 1 - MOCK_PASSWORD.length)
        .fill('a')
        .join('')}`,
    );
    await userEvent.click(submitButton);

    expect(invalidFormatError).toBeInTheDocument();

    // no errors
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, MOCK_PASSWORD);
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('validates terms field', async () => {
    const { termsCheckbox, submitButton } = await renderRegisterForm({
      prefilledValues: {
        firstName: 'Mock first name',
        lastName: 'Mock last name',
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
      },
    });

    // required
    await userEvent.click(submitButton);

    const requiredError = screen.getByText('identity.register.terms.errors.required');

    expect(requiredError).toBeInTheDocument();

    // no errors
    await userEvent.click(termsCheckbox);
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('form has success notification on submit', async () => {
    const { submitButton } = await renderRegisterForm({
      prefilledValues: {
        email: MOCK_EMAIL,
        firstName: 'Mock first name',
        lastName: 'Mock last name',
        password: MOCK_PASSWORD,
        terms: true,
      },
      attachNotificationsSystem: true,
    });

    await userEvent.click(submitButton);

    const successNotification = await screen.findByText('identity.register.notification.success');

    expect(successNotification).toBeInTheDocument();
  });
});
