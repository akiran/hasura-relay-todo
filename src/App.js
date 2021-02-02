import "todomvc-app-css/index.css";
import "./App.css";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Suspense } from "react";

import environment from "./environment";
import Todos from "./Todos/Todos";

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={"Loading..."}>
        <Todos />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default App;
