import React from 'react';
import styles from './App.module.css';
import {TodoPanel} from "./components/TodoPanel/TodoPanel";
import {Header} from "./components/Header/Header";
import {TodoList} from "./components/TodoList/TodoList";
import {TodoProvider} from "./utils/contextes/TodoProvider";
import {Search} from "./components/Search/Search";


function App() {
    return (
        <TodoProvider>
            <div className={styles.App}>
                    <Header/>
                    <Search/>
                    <TodoPanel mode='add'/>
                    <TodoList/>
            </div>

        </TodoProvider>
    );
}

export default App;
