// PasswordChangeForm.tsx
import React from 'react';
import ResetPasswordForm from './password/ResetPasswordForm';

type PasswordChangeFormProps = {
    handleSubmit: (formValues: any) => void;
    passwordError: string;
    setPasswordError: (passwordError: string) => void;
    passwordCriteria: any;
};

export const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
    handleSubmit,
    passwordError,
    setPasswordError,
    passwordCriteria,
    
}) => (
        <div className="bg-black flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <p className="text-sm text-gray-600 mb-6">Update password htmlFor enhanced account security.</p>
                <ResetPasswordForm
                    onSubmit={handleSubmit}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                    passwordCriteria={passwordCriteria}
                />
            </div>
        </div>
);