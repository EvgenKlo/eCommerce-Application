import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type TokenStore,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { type clientType } from '@/types/apiClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

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

export const getApiRoot = (
  type: clientType,
  params: { token?: string; email?: string; password?: string } = {}
): ByProjectKeyRequestBuilder => {
  switch (type) {
    case 'anonimous': {
      const options: AnonymousAuthMiddlewareOptions = {
        host: AUTH_URL,
        projectKey: projectKey,
        credentials: {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
        },
        scopes: scopes,
        fetch,
      };
      const ctpClient = new ClientBuilder()
        .withProjectKey(projectKey)
        .withAnonymousSessionFlow(options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
      return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
        projectKey: PROJECT_KEY,
      });
    }
    case 'password': {
      const options: PasswordAuthMiddlewareOptions = {
        host: AUTH_URL,
        projectKey: projectKey,
        credentials: {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          user: {
            username: params.email!,
            password: params.password!,
          },
        },
        tokenCache: {
          get: () => {
            return JSON.parse(localStorage.getItem('tokendata')!) as TokenStore;
          },
          set: (value: { token: string; expirationTime: number }) => {
            localStorage.setItem('tokendata', JSON.stringify(value));
          },
        },
        scopes: scopes,
        fetch,
      };
      const ctpClient = new ClientBuilder()
        .withProjectKey(projectKey)
        .withPasswordFlow(options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
      return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
        projectKey: PROJECT_KEY,
      });
    }
    case 'token': {
      const options: RefreshAuthMiddlewareOptions = {
        host: AUTH_URL,
        projectKey: projectKey,
        credentials: {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
        },
        refreshToken: params.token!,
        tokenCache: {
          get: () => {
            return JSON.parse(localStorage.getItem('tokendata')!) as TokenStore;
          },
          set: (value: { token: string; expirationTime: number }) => {
            localStorage.setItem('tokendata', JSON.stringify(value));
          },
        },
        fetch,
      };
      const ctpClient = new ClientBuilder()
        .withProjectKey(projectKey)
        .withRefreshTokenFlow(options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
      return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
        projectKey: PROJECT_KEY,
      });
    }
    default: {
      return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
        projectKey: PROJECT_KEY,
      });
    }
  }
};

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_KEY,
});
