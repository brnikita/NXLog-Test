// src/components/PasswordGenerator.tsx

import React, { useState } from 'react';
import './PasswordGenerator.scss';
import { ReactComponent as CopyIcon } from '../assets/icons/copy-icon.svg';

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
    const copyToClipboard = (): void => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(password).then(() => {
                alert('Password copied to clipboard!');
            }).catch((err: any) => {
                // If the Clipboard API fails, fallback to another method
                console.error('Failed to copy password to clipboard', err);
                fallbackCopyToClipboard(password);
            });
        } else {
            // Fallback method for environments where navigator.clipboard is not available
            fallbackCopyToClipboard(password);
        }
    };
    
    const fallbackCopyToClipboard = (textToCopy: string): void => {
        const textArea: HTMLTextAreaElement = document.createElement("textarea");
        textArea.value = textToCopy;
    
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
            const successful: boolean = document.execCommand('copy');
            const msg: string = successful ? 'successful' : 'unsuccessful';
            console.log(`Fallback: Copying text command was ${msg}`);
            alert('Password copied to clipboard (fallback method)!');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
    
        document.body.removeChild(textArea);
    };

    return (
        <div className="password-generator">
            <div className="password-input">
                <input type="text" value={password} readOnly />
                <button onClick={copyToClipboard} title="Copy to clipboard">
                    <CopyIcon />
                </button>
            </div>

            <div>    
                Charachter length {length}
            </div>
            <div className="password-generator-range">
                <input type="range" min="4" max="20" value={length} onChange={(event) => setLength(parseInt(event.target.value, 10))} />
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

            <button type="submit" className="light-green"  onClick={generatePassword}>Generate</button>
        </div>
    );
};

export default PasswordGenerator;