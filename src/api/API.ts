import {
  Project,
  Customer,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ICredentials, createCustomer } from '@/store/slices/customerSlice';
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

  async createCustomer(customer: createCustomer) {
    let result: CustomerSignInResult = {} as CustomerSignInResult;
    try {
      const { body } = await this.client.customers().post({ body: customer }).execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async signIn(credentials: ICredentials) {
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
}
