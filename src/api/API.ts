import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { type returnType } from '@/types/apiClient';
export class API {
  private client: ByProjectKeyRequestBuilder;

  constructor(client: ByProjectKeyRequestBuilder) {
    this.client = client;
  }
  async getProject() {
    let result = {} as Project;
    try {
      const { body } = await this.client.get().execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async getCategories() {
    let errorMsg = '';
    try {
      const { body } = await this.client.categories().get().execute();
      const result = body.results;
      console.log(result);
      return { data: result, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getCustomers(ID: string) {
    let result = {} as Customer;
    try {
      const { body } = await this.client.customers().withId({ ID }).get().execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async createCustomer(customer: CustomerDraft): returnType<CustomerSignInResult> {
    let errorMsg = '';
    try {
      const result = await this.client.customers().post({ body: customer }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async signIn(credentials: { email: string; password: string }): returnType<CustomerSignInResult> {
    let errorMsg = '';
    try {
      const result = await this.client.me().login().post({ body: credentials }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async signInByToken() {
    const result: Customer = {} as Customer;
    try {
      const result = await this.client.me().get().execute();
      return result.body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async createCart() {
    let result = {};
    try {
      const { body } = await this.client
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async setCustomername(ID: string, name: string, version = 1) {
    let result = {};
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID })
        .post({
          body: { version, actions: [{ action: 'setFirstName', firstName: name }] },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
