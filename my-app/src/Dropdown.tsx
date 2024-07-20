import React from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {
    options: number[];
    onChange: (e: React.ChangeEvent) => void;
    label: string;
    dropdownName: string;
}

function HoursDropdown(props: Props) {
    const { options, onChange, label, dropdownName } = props;
    return (
        <div>
            <label htmlFor={dropdownName}>{label}</label>
            <select name={dropdownName} id={dropdownName} onChange={(e) => onChange(e)}>
                <option value={undefined}>Select...</option>
                { options.map((option) => {
                    return <option key={option} value={option}>{option/60} hours</option>
                })}
            </select>
        </div>
    );
}

export default HoursDropdown;
