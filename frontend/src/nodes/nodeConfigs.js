export const nodeConfigs = {
  customInput: {
    title: 'Input',
    description: 'Pipeline input value',
    accent: 'blue',
    width: 240,
    minHeight: 150,
    inputs: [],
    outputs: [{ id: 'value', label: 'Value' }],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: (id) => id.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ],
      },
    ],
  },

  llm: {
    title: 'LLM',
    description: 'Generate a response using a language model',
    accent: 'violet',
    width: 240,
    minHeight: 130,
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' },
    ],
    outputs: [{ id: 'response', label: 'Response' }],
    fields: [],
    content:
      'Connect system and prompt inputs, then pass the generated response downstream.',
  },

  customOutput: {
    title: 'Output',
    description: 'Final pipeline output',
    accent: 'emerald',
    width: 240,
    minHeight: 150,
    inputs: [{ id: 'value', label: 'Value' }],
    outputs: [],
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: (id) => id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
        ],
      },
    ],
  },

  text: {
    title: 'Text',
    description: 'Static or templated text',
    accent: 'amber',
    width: 260,
    minHeight: 145,
    inputs: [],
    outputs: [{ id: 'output', label: 'Output' }],
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'text',
        defaultValue: '{{input}}',
        placeholder: 'Enter text...',
      },
    ],
  },

  apiRequest: {
    title: 'API Request',
    description: 'Call an external API endpoint',
    accent: 'cyan',
    width: 260,
    minHeight: 180,
    inputs: [{ id: 'body', label: 'Body' }],
    outputs: [
      { id: 'response', label: 'Response' },
      { id: 'error', label: 'Error' },
    ],
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'PATCH', label: 'PATCH' },
          { value: 'DELETE', label: 'DELETE' },
        ],
      },
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        defaultValue: 'https://api.example.com/data',
        placeholder: 'https://api.example.com/data',
      },
    ],
  },

  transform: {
    title: 'Transform',
    description: 'Transform data before the next step',
    accent: 'slate',
    width: 260,
    minHeight: 170,
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [{ id: 'output', label: 'Output' }],
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'Map',
        options: [
          { value: 'Map', label: 'Map' },
          { value: 'Normalize', label: 'Normalize' },
          { value: 'Extract JSON', label: 'Extract JSON' },
          { value: 'Format Text', label: 'Format Text' },
        ],
      },
    ],
    content:
      'Use this node to reshape incoming data before passing it further in the pipeline.',
  },

  filter: {
    title: 'Filter',
    description: 'Keep only matching records',
    accent: 'rose',
    width: 260,
    minHeight: 170,
    inputs: [{ id: 'items', label: 'Items' }],
    outputs: [
      { id: 'matched', label: 'Matched' },
      { id: 'rejected', label: 'Rejected' },
    ],
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        defaultValue: 'item.score > 0.8',
        placeholder: 'item.score > 0.8',
      },
    ],
  },

  summarizer: {
    title: 'Summarizer',
    description: 'Summarize long text with AI',
    accent: 'violet',
    width: 260,
    minHeight: 170,
    inputs: [{ id: 'text', label: 'Text' }],
    outputs: [{ id: 'summary', label: 'Summary' }],
    fields: [
      {
        name: 'style',
        label: 'Style',
        type: 'select',
        defaultValue: 'Concise',
        options: [
          { value: 'Concise', label: 'Concise' },
          { value: 'Detailed', label: 'Detailed' },
          { value: 'Bullet points', label: 'Bullet points' },
          { value: 'Executive summary', label: 'Executive summary' },
        ],
      },
    ],
  },

  condition: {
    title: 'Condition',
    description: 'Branch the workflow based on a rule',
    accent: 'amber',
    width: 260,
    minHeight: 175,
    inputs: [{ id: 'value', label: 'Value' }],
    outputs: [
      { id: 'true', label: 'True' },
      { id: 'false', label: 'False' },
    ],
    fields: [
      {
        name: 'expression',
        label: 'Expression',
        type: 'text',
        defaultValue: 'value.isValid === true',
        placeholder: 'value.isValid === true',
      },
    ],
  },
};