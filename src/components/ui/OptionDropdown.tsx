"use client"

import { List, Grid } from 'lucide-react';
import { useOptionsStore } from '@/store/hooks/useOptions';


const OptionsDropdown: React.FC = () => {
    const { showOptions, selectedOption, toggleOptions, handleOptionClick } = useOptionsStore();

    return (
        <div className="relative inline-block">
            <div className='flex gap-x-2 transition hover:bg-neutral-400/5 px-4 py-2 cursor-pointer rounded-md bg-neutral-900' onClick={toggleOptions}>
                View as:
                <span className="ml-1">
                    {selectedOption === 'list' ? <List /> : <Grid />}
                </span>
            </div>
            {showOptions && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-neutral-800 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        <div className={`flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-400/5 ${selectedOption === 'list' ? 'bg-neutral-500' : ''}`} onClick={() => handleOptionClick('list')}>
                            <List className="mr-2" />
                            List
                        </div>
                        <div className={`flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-400/5 ${selectedOption === 'compact' ? 'bg-neutral-500' : ''}`} onClick={() => handleOptionClick('compact')}>
                            <Grid className="mr-2" />
                            Compact
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionsDropdown;