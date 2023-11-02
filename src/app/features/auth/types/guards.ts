import {LOGIN_SCHEMA, REGISTER_SCHEMA} from '@/app/features/auth/constants/schemas';

export function isRegisterForm(form: unknown): form is typeof REGISTER_SCHEMA {
   const mandatoryProps = ['displayName', 'age', 'password_confirm', 'country']
   return isLoginForm(form) && mandatoryProps.every(prop => prop in form);
}

export function isLoginForm(form: unknown): form is typeof LOGIN_SCHEMA {
   const mandatoryProps = ['password', 'email'];
   return typeof form === 'object' && mandatoryProps.every(prop => prop in form);
}
