import * as Yup from 'yup';

interface LoginData {
    name: string;
    gmail: string;
    currentPassword: string;
    newPassword: string;
}

export const profileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    gmail: Yup.string().email('Invalid email').required('Email is required'),
    currentPassword: Yup.string().min(6, 'Current password must be at least 6 characters').required('Password is required'),
    newPassword: Yup.string().min(6, 'New password must be at least 6 characters').required('Password is required'),
});

export const ValidateProfileData = async (data: LoginData) => {
    try {
        await profileSchema.validate(data, { abortEarly: false });
        return { valid: true, errors: null };
    } catch (error: any) {
        const firstError = error.errors[0];
        return { valid: false, errors: [firstError] };
    }
};