import { useMutation } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { useState } from "react";
import { ConnectionHandler } from "relay-runtime";
import { v4 } from "uuid";

const createTodoMutation = graphql`
  mutation TodoInput_Mutation($object: todos_insert_input!) {
    insert_todos_one(object: $object) {
      id
      title
      completed
    }
  }
`;

function TodoInput() {
  const [title, setTitle] = useState("");
  const [commit, isInFlight] = useMutation(createTodoMutation);
  function keyHandler(e) {
    if (e.key === "Enter") {
      const newTodo = {
        id: v4(),
        title,
        completed: false,
      };
      commit({
        variables: {
          object: newTodo,
        },
        onCompleted(data) {
          console.log(data, "!!!");
        },
        updater: (store) => {
          console.log("updater");
          const payload = store.getRootField("insert_todos_one");
          console.log(payload);
          const proxy = store.getRoot();
          const conn = ConnectionHandler.getConnection(
            proxy,
            "TodoList_todos_connection"
          );
          console.log(conn, "conn");
          const todo = store.get(payload.getDataID());
          console.log(todo, "todo");
          const newEdge = ConnectionHandler.createEdge(
            proxy,
            conn,
            todo,
            "todos"
          );
          console.log(newEdge);
          // // console.log(payload.copyFieldsFrom());
          // // const newEdge = payload.getOrCreateLinkedRecord("todosEdge");
          // // newEdge.setValue(newTodo, "node");
          // // const proxy = store.getRoot();
          // // const conn = ConnectionHandler.getConnection(
          // //   proxy,
          // //   "TodoList_todos_connection"
          // // );
          // ConnectionHandler.insertEdgeAfter(conn, newEdge);
        },
      });
    }
  }
  function changeHandler(e) {
    setTitle(e.target.value);
  }

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onChange={changeHandler}
      onKeyPress={keyHandler}
      value={title}
    />
  );
}

export default TodoInput;
