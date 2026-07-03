import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const OutputNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.customOutput} />
);