import { type CategoryInternal } from '@/types/products';
import { type Category } from '@commercetools/platform-sdk';

export const buildTree = (data: Category[]) => {
  const newData: CategoryInternal[] = data.map((node) => {
    (node as CategoryInternal).children = [] as CategoryInternal[];
    return node;
  });
  const rootNodes: CategoryInternal[] = newData.filter((node) => !node.ancestors.length);

  newData.forEach((node) => {
    if (!rootNodes.includes(node)) {
      node.ancestors.forEach(({ id }) => {
        const closestParentId = id;
        const parent = rootNodes.find((root) => root.id === closestParentId);
        parent!.children?.push(node);
      });
    }
  });
  return rootNodes;
};
