import React, {useState} from 'react'
import styles from "./Search.module.css";
import {useTodo} from "../../utils/contextes/useTodo";
import search from '../../images/search.png';



export const Search: React.FC = () => {

    const {searchTodo, searchTodoByStatus} = useTodo();
    const [selectedStatus, setSelectedStatus] = useState<string>('all');



    const handleSearchChange = (str: string) => {
        searchTodo(str);
    };


    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.value;
        setSelectedStatus(status);
        searchTodoByStatus(status);

    };


    return (
                <div className={styles.searchPanel}>
                <img src={search}/>
                <input className={styles.searchInput}
                    type="text"
                    id='search'
                    name='search'
                    onChange={(e) => handleSearchChange(e.target.value)}
                />


                    <div className={styles.radioGroup}>
                        <div className={styles.radioItem}>
                            <input
                                type="radio"
                                id="all"
                                name="status"
                                value="all"
                                checked={selectedStatus === 'all'}
                                onChange={handleStatusChange}
                            />
                            <label htmlFor="all">All</label>
                        </div>
                        <div className={styles.radioItem}>
                            <input
                                type="radio"
                                id="done"
                                name="status"
                                value="done"
                                checked={selectedStatus === 'done'}
                                onChange={handleStatusChange}
                            />
                            <label htmlFor="done">Done</label>
                        </div>
                        <div className={styles.radioItem}>
                            <input
                                type="radio"
                                id="undone"
                                name="status"
                                value="undone"
                                checked={selectedStatus === 'undone'}
                                onChange={handleStatusChange}
                            />
                            <label htmlFor="undone">Undone</label>
                        </div>
                    </div>

                </div>

    );
}