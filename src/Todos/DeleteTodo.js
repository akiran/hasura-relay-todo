import { useMutation } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { ConnectionHandler } from "relay-runtime";
import { fromGlobalId } from "graphql-relay";

const deleteTodoMutation = graphql`
  mutation DeleteTodo_Mutation($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;

export default function DeleteTodo({ id }) {
  const [commit, isInFlight] = useMutation(deleteTodoMutation);
  function clickHandler(e) {
    console.log("delete");
    e.preventDefault();
    const gid = fromGlobalId(id);
    const uuid = JSON.parse(gid.id)[3];
    commit({
      variables: {
        id: uuid,
      },
      onCompleted(data) {
        console.log(data, "!!!");
      },
      updater: (store) => {
        const proxy = store.getRoot();
        const conn = ConnectionHandler.getConnection(
          proxy,
          "TodoList_todos_connection"
        );
        ConnectionHandler.deleteNode(conn, id);
      },
    });
  }
  return <button className="destroy" onClick={clickHandler}></button>;
}
