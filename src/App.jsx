import React from 'react';
import TodoItem from './components/TodoItem';

const colors = ['grey', 'red', 'blue', 'orange', 'green'];

function App() {
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      text: 'Попробовать создать ToDo',
    },
    {
      id: 2,
      text: 'Сохранить задачи в массив стейта',
    },
  ]);

  return (
    <div className="App">
      <div className="todo">
        <h2>Список задач</h2>
        {tasks.map((obj) => (
          <TodoItem key={obj.id} text={obj.text} />
        ))}
        <div className="todo-input">
          <input type="text" placeholder="Текст задачи..." />
          <ul>
            {colors.map((color) => (
              <li className={`todo-color ${color}`}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
