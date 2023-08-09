import {
  Project,
  Customer,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { apiRoot } from './lib/Client';
import { createCustomer } from '@/store/slices/customerSlice';

export class API {
  static async getProject() {
    let result = {} as Project;
    try {
      const { body } = await apiRoot.get().execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  static async getCustomers() {
    let result = {} as Customer;
    try {
      const { body } = await apiRoot
        .customers()
        .withId({ ID: '057f1155-2b8a-4295-bd94-1ca97fe10b30' })
        .get()
        .execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  static async createCustomer(customer: createCustomer) {
    let result = {} as CustomerSignInResult;
    try {
      const { body } = await apiRoot.customers().post({ body: customer }).execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
