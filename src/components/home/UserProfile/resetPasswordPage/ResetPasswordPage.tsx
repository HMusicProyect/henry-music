import { useState } from "react";
import PasswordCriteria from "../password/PasswordCriteria";
import ResetPasswordForm from "../password/ResetPasswordForm";
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

interface FormValues {
    email: string;
    password: string;
    newPassword: string;
}

interface ResetPasswordProps {
    id: string;
    token: string;
}



const ResetPassword: React.FC<ResetPasswordProps> = ({ id, token })=> {

    const [passwordError, setPasswordError] = useState<string>('');

    const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
        length: false,
        uppercase: false,
        number: false,
    });

    const {data: session} = useSession();
    const user = session?.user;
    const jwtToken = user?.token;

    const handleSubmit = async (formValues: FormValues) => {
        console.log(formValues)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/editPasword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${jwtToken}`,
            },
            body: JSON.stringify({
                email: formValues.email,
                password: formValues.password,
                newPassword: formValues.newPassword,
            
            }),
        });

        const data = await response.json();
        console.log(data)
    };

    return (
        <div>
            <div>
                {/* <p className="text-sm text-gray-600 mb-6">Update password htmlFor enhanced account security.</p> */}
                <ResetPasswordForm
                    onSubmit={handleSubmit}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                    passwordCriteria={passwordCriteria}
                />
            </div>
        </div>
    );
};

export default ResetPassword;