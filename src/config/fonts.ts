import { Inter, Lusitana, Montserrat_Alternates } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const montserrat = Montserrat_Alternates({ 
  subsets: ['latin'],
  weight: ['500', '700'],
});


export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets:["latin"]
})