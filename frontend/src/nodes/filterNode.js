import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const FilterNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.filter} />
);