import { useForm } from '@mantine/form';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { attachMantine } from '#/tests';

import { useFormErrorHandler } from './forms.hooks';

const TestComponent: React.FC = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: {
      password: () => 'Invalid password',
      email: () => 'Invalid email',
    },
  });

  const { firstErrorFocus } = useFormErrorHandler(form);

  const handleSubmit = () => {};

  return (
    <form onSubmit={form.onSubmit(handleSubmit, firstErrorFocus)}>
      <input placeholder="email" {...form.getInputProps('email')} />
      <input placeholder="password" {...form.getInputProps('password')} />
      <button type="submit" />
    </form>
  );
};

describe('service: forms hooks', () => {
  it('focuses on the first invalid field according to the validation order (not render order)', async () => {
    const { mantineWrapper } = attachMantine();

    render(<TestComponent />, {
      wrapper: ({ children }) => mantineWrapper(children),
    });

    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button');

    await userEvent.click(submitButton);

    expect(passwordInput).toHaveFocus();
  });
});
