import { zodResolver } from 'mantine-form-zod-resolver';
import { ZodType } from 'zod';

import { FormMode } from './forms.constants';

export const getDefaultFormConfig = (schema: ZodType) => ({
  validate: zodResolver(schema),
  validateInputOnBlur: true,
  clearInputErrorOnChange: false,
  mode: FormMode.Uncontrolled, // https://mantine.dev/form/uncontrolled/#uncontrolled-mode
});
