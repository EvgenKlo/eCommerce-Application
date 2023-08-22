import { type Category } from '@commercetools/platform-sdk';

export interface CategoryInternal extends Category {
  children?: CategoryInternal[];
}
