// pages/reset-password.tsx
'use client';
import { useSearchParams, useRouter } from 'next/navigation';


const ResetPasswordPage = () => {
    const searchParams = useSearchParams();

    const id = searchParams.get('id');
    const token = searchParams.get('token');

    return (
        <div>
            {id && token ? (
                <>
                    {/* <ResetPassword
                        id={id}
                        token={token}
                    /> */}
                </>
            ):(
                <div className="flex items-center justify-center min-h-screen text-center">
                    <p>Invalid link</p>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordPage;