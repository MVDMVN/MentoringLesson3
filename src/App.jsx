import React from "react";
import TodoItem from "./components/TodoItem";

const colors = ["grey", "red", "blue", "orange", "green"];

function App() {
  const searchInput = React.useRef(null);

  const [inputValue, setInputValue] = React.useState("");
  const [isTaskCompleted, setIsTaskCompleted] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      text: "Попробовать создать ToDo",
      completed: false,
      color: "yellow",
    },
    {
      id: 2,
      text: "Сохранить задачи в массив стейта",
      completed: false,
      color: "blue",
    },
  ]);

  function addTask(selectedColor) {
    const newTasksItem = [
      {
        id: tasks.length + 1,
        text: inputValue,
        completed: false,
        color: selectedColor,
      },
    ];
    setTasks([...tasks, ...newTasksItem]);
    searchInput.current.focus();
    setInputValue("");
  }

  function onEditTask(id, text) {
    const taskEditText = prompt(
      "А сразу подумать и нечего не менять потом?",
      text
    );
    const taskId = tasks.findIndex((arg) => arg.id === id);
    const editedTask = { ...tasks[taskId], text: taskEditText };
    const newTasksList = [
      ...tasks.slice(0, taskId),
      editedTask,
      ...tasks.slice(taskId + 1),
    ];
    setTasks(newTasksList);
  }

  function onRemoveTask(id) {
    const newList = tasks.filter((item) => item.id !== id);
    setTasks(newList);
  }

  function setCompletedTask(id) {
    setIsTaskCompleted(true);
    const taskId = tasks.findIndex((arg) => arg.id === id);
    const completedTask = { ...tasks[taskId], completed: true };
    const newTasksList = [
      ...tasks.slice(0, taskId),
      completedTask,
      ...tasks.slice(taskId + 1),
    ];
    setTasks(newTasksList);
  }

  React.useEffect(() => {
    searchInput.current.focus();
    if (!tasks.length) {
      const localStorageData = JSON.parse(localStorage.getItem("TasksList"));
      setTasks(localStorageData);
    }
    localStorage.setItem("TasksList", JSON.stringify(tasks));
  }, [tasks.length]);

  const onSelectColor = (event) => {
    setSelectedColor(event.target.id);
  };

  return (
    <div className="App">
      <div className="todo">
        <h2>Список задач</h2>
        {tasks.map((obj) => (
          <TodoItem
            key={obj.id}
            id={obj.id}
            color={obj.color}
            text={obj.text}
            completed={obj.completed}
            onEditTask={onEditTask}
            onRemoveTask={onRemoveTask}
            setIsTaskCompleted={setCompletedTask}
          />
        ))}
        <div className="todo-input">
          <input
            ref={searchInput}
            value={inputValue}
            type="text"
            placeholder="Текст задачи..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="color-selector">
            {colors.map((color) => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label className="color-selector__item" key={color}>
                <input
                  checked={color === selectedColor}
                  className={color}
                  id={color}
                  name="color"
                  onChange={onSelectColor}
                  type="radio"
                  value={color}
                />
                <span className={`checkmark ${color}`} />
              </label>
            ))}
            <button
              onClick={() => {
                addTask(selectedColor);
              }}
              className="todo-add"
            >
              Добавить задачу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
