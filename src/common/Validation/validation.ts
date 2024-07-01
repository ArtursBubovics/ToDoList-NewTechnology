import * as Yup from 'yup';

interface LoginData {
    name: string;
    password: string;
}

interface SignUpData {
    name: string;
    gmail: string;
    password: string;
}

export const loginSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    gmail: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const validateLoginData = async (data: LoginData) => {
    try {
        await loginSchema.validate(data, { abortEarly: false });
        return { valid: true, errors: null };
    } catch (error: any) {
        const firstError = error.errors[0];
        return { valid: false, errors: [firstError] };
    }
};

export const validateSignUpData = async (data: SignUpData) => {
    try {
        await signUpSchema.validate(data, { abortEarly: false });
        return { valid: true, errors: null };
    } catch (error: any) {
        const firstError = error.errors[0];
        return { valid: false, errors: [firstError] };
    }
};