// components/PasswordCriteria.tsx
import React from 'react';

interface PasswordCriteriaProps {
    criteria: PasswordCriteria;
}

interface PasswordCriteria {
    length: boolean;
    uppercase: boolean;
    number: boolean;
}

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({ criteria }) => (
    <div id="passwordCriteria" className="text-sm space-y-2">
        <p className={criteria.length && criteria.uppercase && criteria.number ? 'text-green-500' : 'text-red-500'}>
            {criteria.length && criteria.uppercase && criteria.number ? 'Strong password' : 'Weak password. Must contain:'}
        </p>
        <ul className="list-disc pl-5 space-y-1">
            <li className={criteria.uppercase ? 'text-green-500' : ''}>At least 1 uppercase</li>
            <li className={criteria.number ? 'text-green-500' : ''}>At least 1 number</li>
            <li className={criteria.length ? 'text-green-500' : ''}>At least 8 characters</li>
        </ul>
    </div>
);

export default PasswordCriteria;
