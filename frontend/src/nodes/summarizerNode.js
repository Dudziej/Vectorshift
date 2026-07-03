import { ConfigurableNode } from './ConfigurableNode';
import { nodeConfigs } from './nodeConfigs';

export const SummarizerNode = (props) => (
  <ConfigurableNode {...props} config={nodeConfigs.summarizer} />
);