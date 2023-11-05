import {alpha_spaces, confirmed, digits, email, max, max_value, min, min_value, not_one_of, required} from '@vee-validate/rules';
import {configure, defineRule, FieldValidationMetaInfo} from 'vee-validate';

export function setupValidation() {
   defineRule('required', required);
   defineRule('termsOfService', required);
   defineRule('min', min);
   defineRule('max', max);
   defineRule('alphaSpaces', alpha_spaces);
   defineRule('email', email);
   defineRule('digits', digits);
   defineRule('maxValue', max_value);
   defineRule('minValue', min_value);
   defineRule('confirm', confirmed);
   defineRule('exclude', not_one_of);
   defineRule('country_exclude', not_one_of);

   configure({
      generateMessage(ctx) {
         const possibleMessages = getValidationErrorMessage(ctx);
         const ruleName = ctx.rule?.name;

         return ruleName ? possibleMessages[ruleName] : `Field ${ctx.field} is invalid`
      },
      validateOnBlur: true,

   })
}

function getValidationErrorMessage({field: fieldName, value, rule}: FieldValidationMetaInfo): Record<string, string> {
    const params = (rule?.params ?? ['no params']) as string[];
   return {
      required: `${fieldName} is required`,
      min: `${fieldName} is too short (${params[0]} characters minimum)`,
      max: `${fieldName} is too long (${params[0]} characters maximum)`,
      alphaSpaces: `${fieldName} should contain only letters and spaces`,
      email: `${fieldName} should be a valid email`,
      digits: `${fieldName} should contain only digits`,
      maxValue: `${fieldName} value is too high (max ${params[0]})`,
      minValue: `${fieldName} value is too low (min ${params[0]})`,
      exclude: `${fieldName} value is not allowed`,
      country_exclude: `Due to legal restrictions we cannot accept users from ${value}`,
      confirm: `${fieldName?.replace(/_/g, ' ')} should have a match with previous field`,
      termsOfService: `You must accept the terms of service`,
   }
}
