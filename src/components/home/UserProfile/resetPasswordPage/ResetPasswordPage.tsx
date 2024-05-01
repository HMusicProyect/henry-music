import { Dispatch, SetStateAction, useState } from "react";
import PasswordCriteria from "../password/PasswordCriteria";
import ResetPasswordForm from "../password/ResetPasswordForm";

interface FormValues {
    email: string;
    password: string;
    newPassword: string;
}

interface ResetPasswordProps {
    id: string;
    token: string;
    setSuccessMessage?: Dispatch<SetStateAction<string[]>>;
    setIsModalOpen?: (isOpen: boolean) => void;
    setMessageType?: Dispatch<SetStateAction<'success' | 'error' | ''>>;
}



const ResetPassword: React.FC<ResetPasswordProps> = ({ 
    id, 
    token, 
    setSuccessMessage, 
    setIsModalOpen, 
    setMessageType 
})=> {

    const [passwordError, setPasswordError] = useState<string>('');

    const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
        length: false,
        uppercase: false,
        number: false,
    });


    const handleSubmit = async (formValues: FormValues) => {
        console.log(formValues)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/editPasword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({
                email: formValues.email,
                password: formValues.password,
                newPassword: formValues.newPassword,
            
            }),
        });

        const data = await response.json();
        if (response.ok) {
            setSuccessMessage(['Contraseña cambiada con éxito']);
            setMessageType('success');
            setIsModalOpen(true);
        } else {
            setSuccessMessage(['Error al cambiar la contraseña']);
            setMessageType('error');
            setIsModalOpen(true);
        }
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
                    setPasswordCriteria={setPasswordCriteria}
                />
            </div>
            
        </div>
    );
};

export default ResetPassword;