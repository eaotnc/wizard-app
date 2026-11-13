import {z} from 'zod';

export function requiredText(message: string) {
  return z.string().trim().min(1, message);
}

export function requiredChoice<
  U extends string,
  T extends readonly [U, ...U[]],
>(values: T, message: string) {
  return z
    .union([z.enum(values), z.literal('')])
    .refine(value => value !== '', {message});
}

export function requiredDigits(
  length: number,
  requiredMessage: string,
  formatMessage: string,
) {
  return z.string().trim().superRefine((value, ctx) => {
    if (value.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: requiredMessage,
      });
      return;
    }

    if (!new RegExp(`^\\d{${length}}$`).test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: formatMessage,
      });
    }
  });
}

export function optionalDigits(length: number, formatMessage: string) {
  return z
    .string()
    .trim()
    .refine(
      value => value.length === 0 || new RegExp(`^\\d{${length}}$`).test(value),
      formatMessage,
    );
}

export function requiredPositiveAmount(
  requiredMessage: string,
  formatMessage: string,
) {
  return z.string().trim().superRefine((value, ctx) => {
    if (value.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: requiredMessage,
      });
      return;
    }

    if (!/^\d+$/.test(value) || Number(value) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: formatMessage,
      });
    }
  });
}

export function requiredAcceptance(message: string) {
  return z
    .boolean({
      required_error: message,
      invalid_type_error: message,
    })
    .refine(value => value, {message});
}
