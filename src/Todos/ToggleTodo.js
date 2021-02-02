// import { useMutation } from "react-relay/hooks";
// import graphql from "babel-plugin-relay/macro";

// const toggleTodoMutation = graphql`
//   mutation ToggleTodo_Mutation($input: ToggleTodoInput!) {
//     toggleTodo(input: $input) {
//       todo {
//         id
//         completed
//       }
//     }
//   }
// `;

// export default function ToggleTodo({ id, completed }) {
//   console.log(id, completed);
//   const [commit, isInFlight] = useMutation(toggleTodoMutation);
//   function changeHandler(e) {
//     console.log(e.target.checked);
//     commit({
//       variables: {
//         input: {
//           todoId: id,
//         },
//       },
//       onCompleted(data) {
//         console.log(data, "!!!");
//       },
//     });
//   }
//   return (
//     <input
//       className="toggle"
//       type="checkbox"
//       checked={completed}
//       onChange={changeHandler}
//     ></input>
//   );
// }
