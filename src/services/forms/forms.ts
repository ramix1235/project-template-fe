import { zodResolver } from 'mantine-form-zod-resolver';
import { ZodType } from 'zod';

export const getDefaultFormConfig = (schema: ZodType) => ({
  validate: zodResolver(schema),
  validateInputOnBlur: true,
  clearInputErrorOnChange: false,
});
