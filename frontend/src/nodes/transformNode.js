import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const TransformNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.transform} />
);