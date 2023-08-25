import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import { TreeView, TreeItem } from '@mui/lab';
import { CategoryInternal } from '@/types/products';
import { SetStateAction, SyntheticEvent } from 'react';

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
  const renderTree = (cats: CategoryInternal[]) =>
    cats.map((nodes) => (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name.en}
        onClick={() => {
          handleClick(nodes.id);
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
      onNodeSelect={(event: SyntheticEvent<Element, Event>, nodeId: SetStateAction<string>) => {
        setSelected(nodeId as string);
      }}
    >
      {renderTree(categories)}
    </TreeView>
  );
};
