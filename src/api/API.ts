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
      return { data: result, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getProductsByCat(catId: string) {
    console.log('catID', catId);

    let errorMsg = '';
    try {
      // const response = await this.client
      // .productProjections()
      // .search()
      // .get({
      //   queryArgs: {
      //     facet: 'categories.id',
      //   },
      // })
      // .execute();
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'filter.query': [
              `categories.id:subtree("${catId}")`,
              //'variants.price.centAmount:range ("5" to "9")',
            ],
          },
        })
        // const { body } = await this.client
        //   .products()
        //   .get({
        //     queryArgs: {
        //       'filter.query': `categories.id:subtree("${catId}")`,
        //     },
        //   })
        .execute();
      console.log('success', respsone);
      const result = respsone;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      console.log('error', error);
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getProducts() {
    let errorMsg = '';
    try {
      const { body } = await this.client.productProjections().get().execute();
      const result = body.results;
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
  async setCustomerFirstName(ID: string, firstName: string, version = 1) {
    let result = {};
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID })
        .post({
          body: { version, actions: [{ action: 'setFirstName', firstName: firstName }] },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async setCustomerLastName(ID: string, lastName: string, version = 1) {
    let result = {};
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID })
        .post({
          body: { version, actions: [{ action: 'setLastName', lastName: lastName }] },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    console.log(result);

    return result;
  }

  async getProduct(ID: string) {
    let errorMsg = '';
    try {
      const { body } = await this.client.productProjections().withId({ ID }).get().execute();
      const result = body;
      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
}
