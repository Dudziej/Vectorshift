import { useMemo } from 'react';

import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { extractTemplateVariables, getTextNodeDimensions } from './nodeUtils';

const DEFAULT_TEXT = '{{input}}';

export const TextNode = ({ id, data = {} }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const text = data.text ?? DEFAULT_TEXT;

  const variables = useMemo(() => extractTemplateVariables(text), [text]);
  const dimensions = useMemo(() => getTextNodeDimensions(text), [text]);

  const inputHandles = variables.map((variableName) => ({
    id: variableName,
    label: variableName,
    color: '#d97706',
  }));

  const handleTextChange = (event) => {
    updateNodeField(id, 'text', event.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      description="Static or templated text"
      accent="amber"
      inputs={inputHandles}
      outputs={[{ id: 'output', label: 'Output' }]}
      width={dimensions.width}
      minHeight={dimensions.minHeight}
    >
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          fontSize: 11,
          fontWeight: 600,
          color: '#334155',
        }}
      >
        Text

        <textarea
          value={text}
          placeholder="Enter text..."
          onChange={handleTextChange}
          style={{
            width: '100%',
            height: dimensions.textareaHeight,
            boxSizing: 'border-box',
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            padding: '8px 9px',
            fontSize: 12,
            lineHeight: 1.45,
            outline: 'none',
            background: '#fff',
            color: '#0f172a',
            resize: 'none',
            transition: 'height 120ms ease',
          }}
        />
      </label>

      <div
        style={{
          fontSize: 11,
          lineHeight: 1.4,
          color: '#64748b',
        }}
      >
        Use {'{{ variableName }}'} to create input handles.
      </div>

      {variables.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#334155',
            }}
          >
            Variables
          </span>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            {variables.map((variableName) => (
              <span
                key={variableName}
                style={{
                  padding: '3px 7px',
                  borderRadius: 999,
                  background: '#fef3c7',
                  border: '1px solid #f59e0b',
                  color: '#92400e',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {variableName}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};