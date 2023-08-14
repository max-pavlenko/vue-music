import {LOGIN_SCHEMA, REGISTER_SCHEMA} from "@/app/features/auth/constants/schemas";

export function isRegisterForm(form: unknown): form is typeof REGISTER_SCHEMA {
   const MANDATORY_PROPS = ['displayName', 'age', 'password_confirm', 'country',]
   return isLoginForm(form) && MANDATORY_PROPS.every(prop => prop in form);
}

export function isLoginForm(form: unknown): form is typeof LOGIN_SCHEMA {
   const MANDATORY_PROPS = ['password', 'email'];
   return typeof form === 'object' && MANDATORY_PROPS.every(prop => prop in form);
}
