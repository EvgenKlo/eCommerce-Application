import { Breadcrumbs, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { type Category } from '@commercetools/platform-sdk';
import { setCategory, resetFilter, setSearch } from '@/store/slices/productSlice';

export const BreadCrumbs: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.products.categoriesNotTransfromed);
  const activeCat = useAppSelector((state) => state.products.filters.catId);
  const [path, setPath] = useState(() => buildPath(categories, activeCat ? activeCat : ''));

  useEffect(() => {
    setPath(buildPath(categories, activeCat ? activeCat : ''));
  }, [activeCat, categories]);

  function buildPath(cats: Category[], cat: string): Array<{ name: string; action: () => void }> {
    const path = [] as Array<{ name: string; action: () => void }>;
    path.push({
      name: 'Catalog',
      action: () => {
        dispatch(resetFilter());
        dispatch(setSearch(''));
      },
    });

    if (cat) {
      const currentNode = cats.find((node) => node.id === cat) as Category;
      currentNode?.ancestors.reverse().forEach((node) => {
        path.push({
          name: cats.find((parent) => parent.id == node.id)?.name.en as string,
          action: () => {
            dispatch(resetFilter());
            dispatch(setSearch(''));
            dispatch(setCategory({ categoryId: node.id }));
          },
        });
      });
      path.push({
        name: currentNode.name.en,
        action: () => {
          dispatch(resetFilter());
          dispatch(setSearch(''));
          dispatch(setCategory({ categoryId: currentNode.id }));
        },
      });
    }

    return path;
  }
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ ml: 3, margin: 1 }}
    >
      {path.map((route: { name: string; action: () => void }) => (
        <Link
          sx={{ '&:hover': { cursor: 'pointer' } }}
          key={route.name}
          onClick={() => route.action()}
          underline="hover"
          color="inherit"
        >
          {route.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
