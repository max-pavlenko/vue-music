import {Schema, ValidationSchema} from '@/app/shared/types/validation';

const LOGIN = {
    email: 'required|email',
    password: 'required|min:9|max:20|exclude:password',
} satisfies Schema

export const AUTH_VALIDATION_SCHEMA = {
    LOGIN,
    REGISTER: {
        ...LOGIN,
        displayName: 'required|min:3|max:100|alphaSpaces',
        age: 'required|minValue:14|maxValue:150',
        password_confirm: 'confirm:@password',
        country: 'required|country_exclude:russia',
        terms_of_service: 'termsOfService',
    }
} satisfies ValidationSchema
