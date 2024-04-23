import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    
}

const Card: React.FC<CardProps> = ({ children, className }) => {
    const cardClasses = twMerge(
        'bg-gray-800', 
        'border-gray-700', 
        'rounded-lg', 
        'p-4', 
        'shadow-lg', 
        className 
    );
const clic = ()=>{
    alert("abrir listas")
}
    return (
        <div className={cardClasses}>
            <Link href="/home/lists/">
                {children}
            </Link>
        </div>
    );
}

export default Card;
