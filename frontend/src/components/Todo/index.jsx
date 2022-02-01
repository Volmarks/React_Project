import styles from "./styles.module.css";

import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const Todo = () => {
    return (
        <main className="App">
            <div className="container">
                <TodoForm />
                <TodoList />
            </div>
        </main>
    );
};

export default Todo;