import {message} from "antd";

export function handleGraphQLAPIErrors(errors) {
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) return;
    if (errors.httpError) {
        message.error(errors.httpError.statusText);
    } else if (errors.fetchError) {
        message.error(errors.fetchError.message);
    } else if (errors.graphQLErrors) {
        errors.graphQLErrors.forEach((error) => {
            message.error(error.message);
        });
    }
}
