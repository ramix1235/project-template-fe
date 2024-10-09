import { notifications } from '@mantine/notifications';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as mockApi from '#/mocks/api';
import {
  MOCK_EMAIL,
  MOCK_PASSWORD,
  attachMantine,
  hasFormAnyErrors,
  spyMutationHook,
} from '#/tests';

import ChangeEmailForm from './ChangeEmailForm';
import { ChangeEmailFormValues } from './ChangeEmailForm.schema';

interface RenderChangeEmailForm {
  prefilledValues?: Partial<ChangeEmailFormValues>;
  attachNotificationsSystem?: boolean;
}

const renderChangeEmailForm = async ({
  prefilledValues = {},
  attachNotificationsSystem = false,
}: RenderChangeEmailForm = {}) => {
  const { mantineWrapper } = attachMantine({ attachNotificationsSystem });

  render(<ChangeEmailForm />, {
    wrapper: ({ children }) => mantineWrapper(<MemoryRouter>{children}</MemoryRouter>),
  });

  const emailInput = screen.getByLabelText<HTMLInputElement>('user.email');
  const passwordInput = screen.getByLabelText<HTMLInputElement>(
    'identity.setupPassword.currentPassword',
  );

  const { email, password } = prefilledValues;

  if (email) {
    await userEvent.type(emailInput, email);
  }

  if (password) {
    await userEvent.type(passwordInput, password);
  }

  return {
    emailInput,
    passwordInput,
    submitButton: screen.getByRole('button', { name: 'common.send' }),
  };
};

describe('component: ChangeEmailForm', () => {
  beforeEach(() => {
    spyMutationHook(mockApi, 'useMockPostChangeEmailRequestMutation', { isSuccess: true });
  });

  afterEach(() => {
    act(() => {
      notifications.clean();
    });
  });

  it('validates email field', async () => {
    const { emailInput, submitButton } = await renderChangeEmailForm({
      prefilledValues: { password: MOCK_PASSWORD },
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

    // no errors
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, MOCK_EMAIL);
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('validates password field', async () => {
    const { passwordInput, submitButton } = await renderChangeEmailForm({
      prefilledValues: { email: MOCK_EMAIL },
    });

    // required
    await userEvent.click(submitButton);

    const requiredError = screen.getByText('errors.required');

    expect(requiredError).toBeInTheDocument();

    // no errors
    await userEvent.type(passwordInput, MOCK_PASSWORD);
    await userEvent.click(submitButton);

    expect(hasFormAnyErrors()).toBe(false);
  });

  it('form has success notification on submit', async () => {
    const { submitButton } = await renderChangeEmailForm({
      prefilledValues: { email: MOCK_EMAIL, password: MOCK_PASSWORD },
      attachNotificationsSystem: true,
    });

    await userEvent.click(submitButton);

    const successNotification = await screen.findByText(
      'settings.changeEmail.notification.success',
    );

    expect(successNotification).toBeInTheDocument();
  });
});
