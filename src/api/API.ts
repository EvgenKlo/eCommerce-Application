import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { Credentials } from '@/store/slices/customerSlice';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

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

  async createCustomer(customer: CustomerDraft) {
    let result: CustomerSignInResult = {} as CustomerSignInResult;
    try {
      const { body } = await this.client.customers().post({ body: customer }).execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async signIn(credentials: Credentials) {
    const result: CustomerSignInResult = {} as CustomerSignInResult;
    console.log('signin cred', credentials);
    try {
      const result = await this.client.me().login().post({ body: credentials }).execute();
      console.log('login success:', result);
      return result.body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async signInByToken() {
    const result: Customer = {} as Customer;
    console.log('signIn token');
    try {
      const result = await this.client.me().get().execute();
      console.log('login success:', result);
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
