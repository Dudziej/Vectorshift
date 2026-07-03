import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const ConditionNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.condition} />
);