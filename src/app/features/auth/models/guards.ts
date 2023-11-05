import {AuthValidationSchema} from '@/app/features/auth/models/validation';

export function isRegisterForm(form: unknown): form is AuthValidationSchema['REGISTER'] {
   const mandatoryProps = ['displayName', 'age', 'password_confirm', 'country']
   return isLoginForm(form) && mandatoryProps.every(prop => prop in form);
}

export function isLoginForm(form: unknown): form is AuthValidationSchema['LOGIN'] {
   const mandatoryProps = ['password', 'email'];
   return !!form && typeof form === 'object' && mandatoryProps.every(prop => prop in form);
}
