import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const LLMNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.llm} />
);