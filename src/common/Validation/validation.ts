import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  gmail: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const validateLoginData = async (data: { name: string; password: string }) => {
  try {
    await loginSchema.validate(data);
    console.log('Validation passed');
  } catch (error) {
    console.error('Validation failed:', error);
  }
};

export const validateSignUpData = async (data: { name: string; password: string; gmail: string }) => {
  try {
    await signUpSchema.validate(data);
    console.log('Validation passed');
  } catch (error) {
    console.error('Validation failed:', error);
  }
};
