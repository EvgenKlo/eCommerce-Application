import { Project } from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { apiRoot } from './lib/Client';

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
    try {
      const { body } = await apiRoot.customers().get().execute();
      return body;
    } catch (error) {
      console.log(error);
    }
  }
}
