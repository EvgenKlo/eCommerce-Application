import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY as string;
const projectKey = PROJECT_KEY;
const HOST = import.meta.env.VITE_HOST as string;
const AUTH_URL = import.meta.env.VITE_AUTH_URL as string;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET as string;
const scopes = [import.meta.env.VITE_SCOPES as string];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: HOST,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_KEY,
});
