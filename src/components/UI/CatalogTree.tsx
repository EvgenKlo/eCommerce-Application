import {
  LabelOutlined as LabelOutlinedIcon,
  BeenhereOutlined as BeenhereOutlinedIcon,
} from '@mui/icons-material';
import { TreeView, TreeItem } from '@mui/lab';
import { CategoryInternal } from '@/types/products';
import { SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setCategory, resetFilter, setSearch } from '@/store/slices/productSlice';

const treeSX = {
  Maxheight: 400,
  maxWidth: 200,
  textAlign: 'start',
  m: 1,
};

export const CategoriesTree: React.FC<{
  categories: CategoryInternal[];
  handleClick: (id: string) => void;
  selected: string;
  setSelected: (id: string) => void;
}> = ({ categories, handleClick, selected, setSelected }) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState([] as string[]);

  useEffect(() => {
    const node = categories.find((node) => node.id === selected);
    if (node) {
      if (node.children?.length) setExpanded([node.id]);
    }
    if (selected == '') setExpanded([]);
  }, [selected, categories]);

  const renderTree = (cats: CategoryInternal[]) =>
    cats.map((nodes) => (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name.en}
        onClick={() => {
          dispatch(resetFilter());
          dispatch(setSearch(''));
          dispatch(setCategory({ categoryId: nodes.id }));
          handleClick(nodes.id);
          if (nodes.children?.length) setExpanded([nodes.id]);
        }}
        sx={{ borderRadius: '5%' }}
      >
        {Array.isArray(nodes.children) ? renderTree(nodes.children) : null}
      </TreeItem>
    ));

  return (
    <TreeView
      aria-label="categories tree"
      defaultCollapseIcon={<BeenhereOutlinedIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<LabelOutlinedIcon />}
      sx={treeSX}
      selected={selected}
      onNodeSelect={(_event: SyntheticEvent<Element, Event>, nodeId: SetStateAction<string>) => {
        setSelected(nodeId as string);
      }}
      expanded={expanded}
    >
      {renderTree(categories)}
    </TreeView>
  );
};
