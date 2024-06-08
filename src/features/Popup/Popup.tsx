import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//componnets
import TodoItem from '../../components/TodoItem/TodoItem';
//styles
import styles from './Popup.module.scss';
//types
import { LocalStorageType, TodoItemType } from './types';

type PopupProps = {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    date: string;
};

function Popup({ setShowPopup, date }: PopupProps) {
    const [value, setValue] = useState<string>('');
    const [dayData, setDayData] = useState<TodoItemType[]>([]);
    const [userLocalStorage, setUserLocalStorage] = useState<LocalStorageType>({});

    //add todo
    const handleAddNewTodo = () => {
        const newTodo = {
            id: uuidv4(),
            title: value,
            completed: false,
        };

        const newLocalStorage: LocalStorageType = { ...userLocalStorage };

        if (newLocalStorage[date]) {
            newLocalStorage[date] = [...userLocalStorage[date], newTodo];
        } else {
            newLocalStorage[date] = [newTodo];
        }

        localStorage.setItem('user-todo', JSON.stringify(newLocalStorage));
        setUserLocalStorage(newLocalStorage);
        setDayData((prev) => [...prev, newTodo]);
        setValue('');
    };

    useEffect(() => {
        const localStorageData = localStorage.getItem('user-todo');
        if (localStorageData) {
            const parsedStorage = JSON.parse(localStorageData);
            if (parsedStorage[date]) {
                setDayData(parsedStorage[date]);
            }

            setUserLocalStorage(parsedStorage);
        }
    }, [date]);

    return (
        <div className={styles.popupWrapper}>
            <div className={styles.popup}>
                <div className={styles.popupBody}>
                    <div className={styles.createNewToDo}>
                        <input
                            className={styles.todoInput}
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Добавить новую задачу"
                        />
                        <button onClick={handleAddNewTodo} className={styles.addNewTodo}>
                            Добавить
                        </button>
                    </div>
                    <div className={styles.todoList}>
                        {dayData.map((item) => (
                            <TodoItem
                                key={item.id}
                                item={item}
                                userLocalStorage={userLocalStorage}
                                setUserLocalStorage={setUserLocalStorage}
                                setDayData={setDayData}
                                date={date}
                            />
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => setShowPopup(false)}
                    className={styles.closeBtn}
                ></button>
            </div>
        </div>
    );
}

export default Popup;
