import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";
import Todo from "./Todo";

const query = graphql`
  query TodoList_Query {
    todos_connection(first: 2147483647)
      @connection(key: "TodoList_todos_connection") {
      edges {
        node {
          id
          ...Todo_Query
        }
      }
    }
  }
`;

function TodoList() {
  const data = useLazyLoadQuery(query);
  console.log(data);
  return (
    <section className="main">
      <ul className="todo-list">
        {data.todos_connection.edges.map((edge) => (
          <Todo key={edge.node.id} todo={edge.node} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
