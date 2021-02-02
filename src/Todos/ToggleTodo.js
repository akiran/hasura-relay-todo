import { useMutation } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { fromGlobalId } from "graphql-relay";

const toggleTodoMutation = graphql`
  mutation ToggleTodo_Mutation(
    $set: todos_set_input
    $pk_columns: todos_pk_columns_input!
  ) {
    update_todos_by_pk(_set: $set, pk_columns: $pk_columns) {
      id
      completed
    }
  }
`;

export default function ToggleTodo({ id, completed }) {
  console.log(id, completed);
  const [commit, isInFlight] = useMutation(toggleTodoMutation);
  function changeHandler(e) {
    console.log(e.target.checked);
    const gid = fromGlobalId(id);
    const uuid = JSON.parse(gid.id)[3];
    commit({
      variables: {
        set: {
          completed: e.target.checked,
        },
        pk_columns: { id: uuid },
      },
      onCompleted(data) {
        console.log(data, "!!!");
      },
    });
  }
  return (
    <input
      className="toggle"
      type="checkbox"
      checked={completed}
      onChange={changeHandler}
    ></input>
  );
}
