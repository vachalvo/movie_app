import React, {FC} from 'react';

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button: FC<ButtonProps> = ({onClick, text}) => {
    return (
        <div className="button-container">
            <button onClick={onClick} >{text} </button>
        </div>
    );
};

export default Button;