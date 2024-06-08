//types
import { LocalStorageType, TodoItemType } from '../../features/Popup/types';
//styles
import styles from './TodoItem.module.scss';

type ItemProps = {
    item: TodoItemType;
    date: string;
    userLocalStorage: LocalStorageType;
    setDayData: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
    setUserLocalStorage: React.Dispatch<React.SetStateAction<LocalStorageType>>;
};

function TodoItem({
    item,
    date,
    userLocalStorage,
    setDayData,
    setUserLocalStorage,
}: ItemProps) {
    const { id, completed, title } = item;
    //remove todo
    const handleRemoveTodo = (id: TodoItemType['id']) => {
        const dayTodos = userLocalStorage[date];
        if (dayTodos) {
            const newDayData = dayTodos.filter((todo) => todo.id !== id);
            setDayData(newDayData);
            const newLocalStorage = {
                ...userLocalStorage,
                [date]: newDayData,
            };
            setUserLocalStorage(newLocalStorage);
            localStorage.setItem('user-todo', JSON.stringify(newLocalStorage));
        }
    };
    //change completed todo
    const handleCompletedTodo = (id: TodoItemType['id']) => {
        const dayTodos = userLocalStorage[date];

        if (dayTodos) {
            const newDayData = dayTodos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });

            setDayData(newDayData);

            const newLocalStorage = {
                ...userLocalStorage,
                [date]: newDayData,
            };

            setUserLocalStorage(newLocalStorage);
            localStorage.setItem('user-todo', JSON.stringify(newLocalStorage));
        }
    };
    return (
        <div className={`${styles.toDoItem} ${completed ? styles.completed : ''}`}>
            <label className={styles.itemCheckboxLabel}>
                <input
                    className={styles.itemCheckbox}
                    checked={completed}
                    onChange={() => handleCompletedTodo(id)}
                    type="checkbox"
                />
                <span className={styles.customCheckbox}></span>
            </label>
            <h2 className={styles.title}>{title}</h2>
            <button onClick={() => handleRemoveTodo(id)} className={styles.deleteBtn}>
                удалить
            </button>
        </div>
    );
}

export default TodoItem;
