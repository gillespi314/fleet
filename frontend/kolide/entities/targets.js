import { appendTargetTypeToTargets } from "redux/nodes/entities/targets/helpers";
import endpoints from "kolide/endpoints";

const defaultSelected = {
  hosts: [],
  labels: [],
};

export default (client) => {
  return {
    // TODO consider whether true or false is the appropriate default value for include_observer parameter
    loadAll: (query, selected = defaultSelected, include_observer = true) => {
      const { TARGETS } = endpoints;

      return client
        .authenticatedPost(
          client._endpoint(TARGETS),
          JSON.stringify({ query, selected, include_observer })
        )
        .then((response) => {
          const { targets } = response;
          console.log("targets: ", targets)

          return {
            ...response,
            targets: [
              ...appendTargetTypeToTargets(targets.hosts, "hosts"),
              ...appendTargetTypeToTargets(targets.labels, "labels"),
            ],
          };
        });
    },
  };
};
