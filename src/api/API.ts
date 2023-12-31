import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
  MyCustomerChangePassword,
  BaseAddress,
  CartUpdate,
  CartDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { type returnType } from '@/types/apiClient';

export class API {
  private client: ByProjectKeyRequestBuilder;
  static limit = 100;
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
      const { body } = await this.client
        .categories()
        .get({
          queryArgs: {
            sort: 'orderHint asc',
          },
        })
        .execute();
      const result = body.results;
      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getProductsByCat(catId: string) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: API.limit,
            facet: ['variants.attributes.color.en', 'variants.price.centAmount'],
            filter: [`categories.id:subtree("${catId}")`],
          },
        })
        .execute();
      const result = respsone;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async getProductsWithFilter(
    filter: string[],
    sort: string,
    search: string = '',
    limit: number = 12,
    offset: number = 0
  ) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en': search,
            fuzzy: true,
            sort,
            limit,
            offset,
            'filter.query': filter,
          },
        })
        .execute();
      const result = respsone;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async getProductsBySearch(search: string) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en': search,
            limit: API.limit,
          },
        })
        .execute();
      const result = respsone;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getProducts() {
    let errorMsg = '';
    try {
      const { body } = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 1,
            facet: [
              'variants.attributes.color.en',
              'variants.attributes.size.en',
              'variants.attributes.gender.en',
              'variants.attributes.designer.en',
              'variants.price.centAmount',
            ],
          },
        })
        .execute();

      return { data: body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getProductsForSlider() {
    let errorMsg = '';
    try {
      const { body } = await this.client.productProjections().get().execute();
      return { data: body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
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
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async signIn(credentials: { email: string; password: string }): returnType<CustomerSignInResult> {
    let errorMsg = '';
    try {
      const { ...data } = { ...credentials };

      const result = await this.client.me().login().post({ body: data }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async signInWithCartMerge(credentials: {
    email: string;
    password: string;
  }): returnType<CustomerSignInResult> {
    let errorMsg = '';
    try {
      const { ...data } = { ...credentials, activeCartSignInMode: 'MergeWithExistingCustomerCart' };
      const result = await this.client.me().login().post({ body: data }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
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

  async setCustomerFirstName(firstName: string, version: number) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: { version, actions: [{ action: 'setFirstName', firstName: firstName }] },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async setCustomerLastName(lastName: string, version: number) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: { version, actions: [{ action: 'setLastName', lastName: lastName }] },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async setCustomerEmail(email: string, version = 1) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: { version, actions: [{ action: 'changeEmail', email: email }] },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async setCustomerDateOfBirth(date: string, version = 1) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: { version, actions: [{ action: 'setDateOfBirth', dateOfBirth: date }] },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async changeCustomerPassword(data: MyCustomerChangePassword) {
    let errorMsg = '';
    try {
      const result = await this.client.me().password().post({ body: data }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async addCustomerAddress(version: number, data: BaseAddress) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({ body: { version: version, actions: [{ action: 'addAddress', address: data }] } })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async removeCustomerAddress(version: number, id: string) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({ body: { version: version, actions: [{ action: 'removeAddress', addressId: id }] } })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async updateCustomerAddress(version: number, id: string, data: BaseAddress) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: {
            version: version,
            actions: [{ action: 'changeAddress', addressId: id, address: data }],
          },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async setDefaultShippingAddress(version: number, id: string) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: {
            version: version,
            actions: [{ action: 'setDefaultShippingAddress', addressId: id }],
          },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async setDefaultBillingAddress(version: number, id: string) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: {
            version: version,
            actions: [{ action: 'setDefaultBillingAddress', addressId: id }],
          },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async addShippingAddressId(version: number, id: string) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: {
            version: version,
            actions: [{ action: 'addShippingAddressId', addressId: id }],
          },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async removeShippingAddressId(version: number, id: string) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: {
            version: version,
            actions: [{ action: 'removeShippingAddressId', addressId: id }],
          },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async addBillingAddressId(version: number, id: string) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: {
            version: version,
            actions: [{ action: 'addBillingAddressId', addressId: id }],
          },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async removeBillingAddressId(version: number, id: string) {
    let errorMsg = '';
    try {
      const result = await this.client
        .me()
        .post({
          body: {
            version: version,
            actions: [{ action: 'removeBillingAddressId', addressId: id }],
          },
        })
        .execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getActiveCart() {
    let errorMsg = '';
    try {
      const response = await this.client.me().activeCart().get().execute();
      const result = response;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async createCart(cart: CartDraft) {
    let errorMsg = '';
    try {
      const response = await this.client.me().carts().post({ body: cart }).execute();
      const result = response;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async updateCart(ID: string, cartUpdate: CartUpdate) {
    let errorMsg = '';
    try {
      const response = await this.client
        .carts()
        .withId({ ID })
        .post({ body: cartUpdate })
        .execute();
      const result = response;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async getDiscountCodes() {
    let errorMsg = '';
    try {
      const response = await this.client.discountCodes().get().execute();
      const result = response;
      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
}
