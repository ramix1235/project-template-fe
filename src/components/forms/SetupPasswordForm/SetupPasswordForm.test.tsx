import { notifications } from '@mantine/notifications';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as mockApi from '#/mocks/api';
import { MAX_PASSWORD_LENGTH } from '#/services/auth';
import { MOCK_PASSWORD, spyMutationHook, attachMantine, hasFormAnyErrors } from '#/tests';

import SetupPasswordForm from './SetupPasswordForm';
import { SetupPasswordFormType } from './SetupPasswordForm.constants';
import { ChangePasswordFormValues, SetupPasswordFormValues } from './SetupPasswordForm.schema';

interface RenderSetupPasswordForm {
  prefilledValues?: Partial<SetupPasswordFormValues> | Partial<ChangePasswordFormValues>;
  attachNotificationsSystem?: boolean;
  type?: SetupPasswordFormType;
}

interface RenderSetupPasswordFormResult {
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  currentPasswordInput?: HTMLInputElement;
  submitButton: HTMLInputElement;
}

const renderSetupPasswordForm = async ({
  prefilledValues = {},
  attachNotificationsSystem = false,
  type = SetupPasswordFormType.Setup,
}: RenderSetupPasswordForm = {}) => {
  const { mantineWrapper } = attachMantine({ attachNotificationsSystem });

  render(<SetupPasswordForm type={type} />, {
    wrapper: ({ children }) => mantineWrapper(<MemoryRouter>{children}</MemoryRouter>),
  });

  const passwordInput = screen.getByLabelText<HTMLInputElement>('user.password');
  const confirmPasswordInput = screen.getByLabelText<HTMLInputElement>(
    'identity.setupPassword.confirmPassword',
  );

  const { password, confirmPassword } = prefilledValues;

  if (password) {
    await userEvent.type(passwordInput, password);
  }

  if (confirmPassword) {
    await userEvent.type(confirmPasswordInput, confirmPassword);
  }

  const result: RenderSetupPasswordFormResult = {
    passwordInput,
    confirmPasswordInput,
    currentPasswordInput: undefined,
    submitButton: screen.getByRole('button', { name: 'common.send' }),
  };

  if (type == SetupPasswordFormType.Change) {
    const currentPasswordInput = screen.getByLabelText<HTMLInputElement>(
      'identity.setupPassword.currentPassword',
    );

    if ('currentPassword' in prefilledValues) {
      const { currentPassword } = prefilledValues;

      if (currentPassword) {
        await userEvent.type(currentPasswordInput, currentPassword);
      }
    }

    result.currentPasswordInput = currentPasswordInput;

    return result;
  }

  return result;
};

describe('component: SetupPasswordForm', () => {
  beforeEach(() => {
    spyMutationHook(mockApi, 'useMockPostSetupPasswordMutation', {
      isSuccess: true,
    });
    spyMutationHook(mockApi, 'useMockPostChangePasswordMutation', {
      isSuccess: true,
    });
    spyMutationHook(mockApi, 'useMockPostResetPasswordMutation', {
      isSuccess: true,
    });
  });

  afterEach(() => {
    act(() => {
      notifications.clean();
    });
  });

  it('validates password field', async () => {
    const { passwordInput, submitButton } = await renderSetupPasswordForm({
      prefilledValues: { confirmPassword: MOCK_PASSWORD },
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

    // match
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Qwerty2!');
    await userEvent.click(submitButton);

    const matchError = screen.getByText('identity.setupPassword.confirmPassword.errors.match');

    expect(matchError).toBeInTheDocument();

    // no errors
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, MOCK_PASSWORD);
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('validates confirm password field', async () => {
    const { confirmPasswordInput, passwordInput, submitButton } = await renderSetupPasswordForm();

    // required
    const requiredInputsCount = 2;

    await userEvent.click(submitButton);

    const requiredErrors = screen.getAllByText('errors.required');

    expect(requiredErrors.length).toBe(requiredInputsCount);

    // match
    await userEvent.type(passwordInput, MOCK_PASSWORD);
    await userEvent.type(confirmPasswordInput, 'Qwerty2!');
    await userEvent.click(submitButton);

    const matchError = screen.getByText('identity.setupPassword.confirmPassword.errors.match');

    expect(matchError).toBeInTheDocument();

    // no errors
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, MOCK_PASSWORD);
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('validates current password field', async () => {
    const { currentPasswordInput, submitButton } = await renderSetupPasswordForm({
      prefilledValues: { confirmPassword: MOCK_PASSWORD, password: MOCK_PASSWORD },
      type: SetupPasswordFormType.Change,
    });

    // required
    await userEvent.click(submitButton);

    const requiredError = screen.getByText('errors.required');

    expect(requiredError).toBeInTheDocument();

    // no errors
    if (currentPasswordInput) {
      await userEvent.type(currentPasswordInput, MOCK_PASSWORD);
    }
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('setup form type has success notification on submit', async () => {
    const { submitButton } = await renderSetupPasswordForm({
      prefilledValues: { confirmPassword: MOCK_PASSWORD, password: MOCK_PASSWORD },
      attachNotificationsSystem: true,
    });

    await userEvent.click(submitButton);

    const successNotification = await screen.findByText(
      'identity.setupPassword.setup.notification.success',
    );

    expect(successNotification).toBeInTheDocument();
  });

  it('reset form type has success notification on submit', async () => {
    const { submitButton } = await renderSetupPasswordForm({
      prefilledValues: { confirmPassword: MOCK_PASSWORD, password: MOCK_PASSWORD },
      attachNotificationsSystem: true,
      type: SetupPasswordFormType.Reset,
    });

    await userEvent.click(submitButton);

    const successNotification = await screen.findByText(
      'identity.setupPassword.reset.notification.success',
    );

    expect(successNotification).toBeInTheDocument();
  });

  it('change form type has success notification on submit', async () => {
    const { submitButton } = await renderSetupPasswordForm({
      prefilledValues: {
        confirmPassword: MOCK_PASSWORD,
        password: MOCK_PASSWORD,
        currentPassword: MOCK_PASSWORD,
      },
      attachNotificationsSystem: true,
      type: SetupPasswordFormType.Change,
    });

    await userEvent.click(submitButton);

    const successNotification = await screen.findByText(
      'identity.setupPassword.change.notification.success',
    );

    expect(successNotification).toBeInTheDocument();
  });
});
