// src/components/PasswordGenerator.tsx

import React, { useState } from 'react';
import './PasswordGenerator.scss';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>(''),
    [length, setLength] = useState<number>(8),
    [includeLowercase, setIncludeLowercase] = useState<boolean>(true),
    [includeUppercase, setIncludeUppercase] = useState<boolean>(false),
    [includeNumbers, setIncludeNumbers] = useState<boolean>(false),
    [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

    const generatePassword = () => {
        const lowerLetters = 'abcdefghijklmnopqrstuvwxyz',
        upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers = '0123456789',
        symbols = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/';

        let validChars = '';
        
        if (includeLowercase) {
            validChars += lowerLetters;
        }
        
        if (includeUppercase) {
            validChars += upperLetters;
        }
        
        if (includeNumbers) {
            validChars += numbers;
        }
        if (includeSymbols) {
            validChars += symbols;
        }

        let generatedPassword = '';
        
        for (let i = 0; i < length; i++) {
            generatedPassword += validChars.charAt(Math.floor(Math.random() * validChars.length));
        }

        setPassword(generatedPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        });
    };

    return (
        <div className="password-generator">
            <input type="text" value={password} readOnly />
            <button onClick={copyToClipboard}>Copy</button>
            <div>
                <input type="range" min="4" max="20" value={length} onChange={(event) => setLength(parseInt(event.target.value, 10))} />
            </div>
            <div>    
                Charachter length {length}
            </div>
            
            <ul className='password-generator-settings'>
                <li>
                    <label>
                        <input type="checkbox" checked={includeLowercase} onChange={(event) => setIncludeLowercase(event.target.checked)} />
                        <span>Include Lowercase</span>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" checked={includeUppercase} onChange={(event) => setIncludeUppercase(event.target.checked)} />
                        <span>Include Uppercase</span>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" checked={includeNumbers} onChange={(event) => setIncludeNumbers(event.target.checked)} />
                        <span>Include Numbers</span>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" checked={includeSymbols} onChange={(event) => setIncludeSymbols(event.target.checked)} />
                        <span>Include Symbols</span>
                    </label>
                </li>
            </ul>

            <button className="light-green"  onClick={generatePassword}>Generate</button>
        </div>
    );
};

export default PasswordGenerator;