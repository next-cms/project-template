import React, { useEffect } from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout';
import { useQuery } from "graphql-hooks";
import { handleGraphQLAPIErrors } from "../utils/helpers";

export const DATA_OBJECT = `
query dataObjectsBySlug($projectId: String!, $slug: String!) {
  dataObjectsBySlug(projectId: $projectId, slug: $slug) {
    id
    title
    slug
    projectId
    type
    templateTypeId
    fields
    contents
    createdAt
    modifiedAt
  }
}`;

const Home = () => {
    const projectId = process.env.PROJECT_ID || "5da060c61eda6430cc4c4e4d";
    // const router = useRouter();

    const {loading, error, data, refetch} = useQuery(DATA_OBJECT, {
        variables: {projectId, slug: "home"}
    });

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
    }, [error]);

    if (error || !data) return null;
    const { dataObjectsBySlug } = data;

    if (loading) return null;

    return (
        <DefaultLayout className="layout">
            <div className="container">
                Hello
            </div>
        </DefaultLayout>
    );
};


export default Home
