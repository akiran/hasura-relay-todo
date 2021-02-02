import "todomvc-app-css/index.css";
import "./App.css";
import React from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Suspense } from "react";

import environment from "./environment";
import Todos from "./Todos/Todos";

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    // Set some state derived from the caught error
    console.log("error", error);
    return { error: error };
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ErrorBoundary fallback={(error) => <div>{error.message}</div>}>
        <Suspense fallback={"Loading..."}>
          <Todos />
        </Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

export default App;
