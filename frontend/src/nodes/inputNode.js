import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const InputNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.customInput} />
);