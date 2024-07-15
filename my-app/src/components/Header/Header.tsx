import React from 'react';
import styles from './Header.module.css';
import { useTodo } from '../../utils/contextes/useTodo';
import doneImage from '../../images/done.png';
import waiting from '../../images/waiting.png';



export const Header: React.FC = () => {
    const { todos } = useTodo();
    const done = todos.filter((todo) => todo.checked === true).length;
    const undone = todos.length - done;

    return (
        <div className={styles.headerContainer}>
            <p className={styles.headerTitle}>
                Всего задач: <b>{todos.length}</b>
            </p>

            <div className={styles.headerInformation}>

                <div className={styles.infoBlock}>
                <img src={doneImage} alt="done" />
                    <p>: {done}</p></div>

                <div className={styles.infoBlock}>
                <img src={waiting} alt="undone" />
                    <p>: {undone}</p>
                </div>
        </div>
        </div>
    );
};
