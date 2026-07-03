import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const ApiRequestNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.apiRequest} />
);