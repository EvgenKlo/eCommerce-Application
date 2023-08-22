import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import { TreeView, TreeItem } from '@mui/lab';
import { CategoryInternal } from '@/types/products';

export const CategoriesTree: React.FC<{ categories: CategoryInternal[] }> = ({ categories }) => {
  const renderTree = (cats: CategoryInternal[]) =>
    cats.map((nodes) => (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name.en}
        onClick={() => console.log(nodes.id)}
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
      sx={{
        height: 510,
        maxWidth: 200,
        textAlign: 'start',
      }}
    >
      {renderTree(categories)}
    </TreeView>
  );
};
