import { notifications } from '@mantine/notifications';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import * as mockApi from '#/mocks/api';
import { spyMutationHook, attachMantine, MOCK_EMAIL, hasFormAnyErrors } from '#/tests';

import ResetPasswordForm from './ResetPasswordForm';
import { ResetPasswordFormValues } from './ResetPasswordForm.schema';

interface RenderResetPasswordForm {
  prefilledValues?: Partial<ResetPasswordFormValues>;
  attachNotificationsSystem?: boolean;
}

const renderResetPasswordForm = async ({
  prefilledValues = {},
  attachNotificationsSystem = false,
}: RenderResetPasswordForm = {}) => {
  const { mantineWrapper } = attachMantine({ attachNotificationsSystem });

  render(<ResetPasswordForm />, {
    wrapper: ({ children }) => mantineWrapper(<MemoryRouter>{children}</MemoryRouter>),
  });

  const emailInput = screen.getByLabelText<HTMLInputElement>('user.email');

  const { email } = prefilledValues;

  if (email) {
    await userEvent.type(emailInput, email);
  }

  return {
    emailInput,
    submitButton: screen.getByRole('button', { name: 'common.send' }),
  };
};

describe('component: ResetPasswordForm', () => {
  beforeEach(() => {
    spyMutationHook(mockApi, 'useMockPostResetPasswordRequestMutation', { isSuccess: true });
  });

  afterEach(() => {
    act(() => {
      notifications.clean();
    });
  });

  it('validates email field', async () => {
    const { emailInput, submitButton } = await renderResetPasswordForm();

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

  it('form has success notification on submit', async () => {
    const { submitButton } = await renderResetPasswordForm({
      prefilledValues: {
        email: MOCK_EMAIL,
      },
      attachNotificationsSystem: true,
    });

    await userEvent.click(submitButton);

    const successNotification = await screen.findByText(
      'identity.resetPassword.notification.success',
    );

    expect(successNotification).toBeInTheDocument();
  });
});
