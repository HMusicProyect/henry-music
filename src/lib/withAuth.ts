import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const isSessionLoading = status === 'loading';
    const router = useRouter();

    useEffect(() => {
      if (!isSessionLoading && !session) {
        router.push('/login');
      }
    }, [session, isSessionLoading, router]);

    if (isSessionLoading || !session) {
      return <div>Cargando...</div>;
    }

    return <Component {...props} />;
  }
}