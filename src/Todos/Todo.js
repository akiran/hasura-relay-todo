import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import DeleteTodo from "./DeleteTodo";
import ToggleTodo from "./ToggleTodo";

const fragment = graphql`
  fragment Todo_Query on todos {
    id
    title
    completed
  }
`;

function Todo({ todo }) {
  const data = useFragment(fragment, todo);
  return (
    <li>
      <ToggleTodo id={data.id} completed={data.completed} />
      <label>{data.title}</label>
      <DeleteTodo id={todo.id} />
    </li>
  );
}

export default Todo;
