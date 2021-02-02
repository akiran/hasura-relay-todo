import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchQuery(operation, variables) {
  const response = await fetch("http://localhost:8080/v1beta1/relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default modernEnvironment;
