import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "./slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */
// TODO: Update the routes array to match your project's route structure.
const routes = [
  {
  	type: "homepage",
  	path: "/",
  },
  {
    type: "marketing_page",
    path: "/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param {prismicNext.CreateClientConfig} config - Configuration for the Prismic client.
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
