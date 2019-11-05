import {GraphQLClient} from "graphql-hooks";
import memCache from "graphql-hooks-memcache";
import unfetch from "isomorphic-unfetch";
import {message} from "antd";

let graphQLClient = null;

function create(initialState, token) {
    const isBrowser = typeof window !== "undefined";
    return new GraphQLClient({
        connectToDevTools: isBrowser,
        headers: {
            "CLIENT-ID": process.env.CLIENT_ID
        },
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        url: `${process.env.API_BASE_URL}${process.env.GRAPHQL_PATH}`, // Server URL (must be absolute)
        fetch: typeof window !== "undefined" ? fetch.bind() : unfetch, // eslint-disable-line
        cache: memCache({initialState}),
        onError: ({operation, result}) => {
            console.log("operation", operation);
            console.log("result", result);
            if (!isBrowser) return;
            if (result.httpError) {
                message.error(result.httpError.statusText);
            } else if (result.fetchError) {
                message.error(result.fetchError.message);
            } else if (result.graphQLErrors) {
                result.graphQLErrors.forEach((error) => {
                    message.error(error.message);
                });
            }
        }
    });
}

export default function initGraphQL(initialState, token) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === "undefined") {
        return create(initialState, token);
    }

    // Reuse client on the client-side
    if (!graphQLClient) {
        graphQLClient = create(initialState, token);
    }

    return graphQLClient;
}
