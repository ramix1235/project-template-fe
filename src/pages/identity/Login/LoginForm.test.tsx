import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';

import * as mockApi from '#/mocks/api';
import * as auth from '#/services/auth';
import * as forms from '#/services/forms';
import {
  spyMutationHook,
  attachMantine,
  MOCK_PASSWORD,
  MOCK_EMAIL,
  MOCK_AUTH_ACCOUNT,
  hasFormAnyErrors,
} from '#/tests';

import LoginForm from './LoginForm';
import { LoginFormValues } from './LoginForm.schema';

interface RenderLoginForm {
  prefilledValues?: Partial<LoginFormValues>;
}

const renderLoginForm = async ({ prefilledValues = {} }: RenderLoginForm = {}) => {
  const { mantineWrapper } = attachMantine();

  render(<LoginForm />, {
    wrapper: ({ children }) => mantineWrapper(<MemoryRouter>{children}</MemoryRouter>),
  });

  const emailInput = screen.getByLabelText<HTMLInputElement>('user.email');
  const passwordInput = screen.getByLabelText<HTMLInputElement>('user.password');

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
    submitButton: screen.getByRole('button', { name: 'identity.login' }),
  };
};

describe('component: LoginForm', () => {
  beforeEach(() => {
    spyMutationHook(mockApi, 'useMockPostLoginMutation', {
      isSuccess: true,
      token: MOCK_AUTH_ACCOUNT.token,
      permissions: MOCK_AUTH_ACCOUNT.permissions,
    });
    vi.spyOn(auth, 'useAuth').mockReturnValue({
      authAccount: MOCK_AUTH_ACCOUNT,
      isGuest: false,
      authLogin: vi.fn(),
      authLogout: vi.fn(),
    });
    vi.spyOn(forms, 'useFormErrorHandler').mockReturnValue({
      firstErrorFocus: vi.fn(),
    });
  });

  it('prefills email filed according to the route state', () => {
    const { mantineWrapper } = attachMantine();

    const router = createMemoryRouter([
      {
        path: '/login',
        element: <LoginForm />,
      },
    ]);

    router.navigate('/login', { state: { email: MOCK_EMAIL } });

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const emailInput = screen.getByLabelText<HTMLInputElement>('user.email');

    expect(emailInput.value).toBe(MOCK_EMAIL);
  });

  it('validates email field', async () => {
    const { emailInput, submitButton } = await renderLoginForm({
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
    const { passwordInput, submitButton } = await renderLoginForm({
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
});
