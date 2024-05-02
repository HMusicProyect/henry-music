// components/ResetPasswordForm.tsx
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import InputField from './InputField';
import PasswordCriteria from './PasswordCriteria';

interface FormValues {
    email: string;
    password: string;
    newPassword: string;
}

interface ResetPasswordFormProps {
    onSubmit: (formValues: FormValues) => void;
    passwordError: string;
    setPasswordError: React.Dispatch<React.SetStateAction<string>>;
    passwordCriteria: {
        length: boolean;
        uppercase: boolean;
        number: boolean;
    };
    setPasswordCriteria: React.Dispatch<React.SetStateAction<{
        length: boolean;
        uppercase: boolean;
        number: boolean;
    }>>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, passwordError, setPasswordError, passwordCriteria, setPasswordCriteria }) => {
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
        newPassword: '',
    });

    const [confirmPassword, setConfirmPassword] = useState<string>('');

    useEffect(() => {
        setPasswordError(formValues.newPassword !== confirmPassword ? 'Las contraseñas no coinciden' : '');
    }, [formValues.newPassword, confirmPassword, setPasswordError]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        if (name === 'newPassword') {
            checkPasswordCriteria(value);
        }
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const checkPasswordCriteria = (password: string) => {
        setPasswordCriteria({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
        });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form id="changePasswordForm" className="space-y-6" onSubmit={handleSubmit}>
            <InputField id="email" type="email" name="email" value={formValues.email} onChange={handleChange} required />
            <InputField id="password" type="password" name="password" value={formValues.password} onChange={handleChange} required />
            <InputField id="newPassword" type="password" name="newPassword" value={formValues.newPassword} onChange={handleChange} placeholder="••••••••" required />
            <InputField id="confirm-password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="••••••••" required />
            {passwordError && <p className='text-red-500 text-xs'>{passwordError}</p>}
            <PasswordCriteria criteria={passwordCriteria} />
            <div className="flex justify-center">
                <button 
                    type="submit" 
                    className="px-2 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mt-[-20px]"
                >
                    Apply Changes
                </button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
