import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const resolveDefaultValue = (defaultValue, id) => {
  if (typeof defaultValue === 'function') {
    return defaultValue(id);
  }

  return defaultValue ?? '';
};

export const ConfigurableNode = ({ id, data = {}, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFieldChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      title={config.title}
      description={config.description}
      accent={config.accent}
      inputs={config.inputs}
      outputs={config.outputs}
      width={config.width}
      minHeight={config.minHeight}
    >
      {config.fields?.map((field) => {
        const value =
          data[field.name] ?? resolveDefaultValue(field.defaultValue, id);

        return (
          <NodeField
            key={field.name}
            field={field}
            value={value}
            onChange={(nextValue) => handleFieldChange(field.name, nextValue)}
          />
        );
      })}

      {config.content && (
        <div
          style={{
            fontSize: 12,
            lineHeight: 1.45,
            color: '#475569',
          }}
        >
          {config.content}
        </div>
      )}
    </BaseNode>
  );
};

const NodeField = ({ field, value, onChange }) => {
  const commonInputStyles = {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    padding: '7px 8px',
    fontSize: 12,
    outline: 'none',
    background: '#fff',
    color: '#0f172a',
  };

  return (
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
      {field.label}

      {field.type === 'select' ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={commonInputStyles}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          value={value}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          rows={field.rows || 3}
          style={{
            ...commonInputStyles,
            resize: 'vertical',
            minHeight: 72,
            lineHeight: 1.4,
          }}
        />
      ) : (
        <input
          type={field.type || 'text'}
          value={value}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          style={commonInputStyles}
        />
      )}
    </label>
  );
};