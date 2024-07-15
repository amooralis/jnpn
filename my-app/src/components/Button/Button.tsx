import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    color: 'orange' | 'blue' | 'red' | 'green';
}

export const Button: React.FC<ButtonProps> = ({ color, children, onClick , ...props}) => {
    const className = `${styles.button} ${styles[`button_${color}`]}`;

    return (
        <button className={className} onClick={onClick} {...props}>
            {children}
        </button>
    );
};