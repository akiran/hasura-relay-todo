import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

function Todos() {
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput />
        </header>
      </section>
      <TodoList />
    </div>
  );
}

export default Todos;
