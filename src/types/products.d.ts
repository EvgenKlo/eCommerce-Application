import { type Category } from '@commercetools/platform-sdk';

export interface CategoryInternal extends Category {
  children?: CategoryInternal[];
}

export type FilterProducts = {
  category?: string;
  price: {
    operand: string;
    upper: number;
    lower: number;
  };
  colors?: string[];
  size?: string[];
  manufacturer?: string[];
  gender?: string[];
};