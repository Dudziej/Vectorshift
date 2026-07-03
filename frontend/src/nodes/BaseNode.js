import { Handle, Position } from 'reactflow';

const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

const getAccentColor = (accent) => {
  const colors = {
    blue: '#2563eb',
    violet: '#7c3aed',
    emerald: '#059669',
    amber: '#d97706',
    rose: '#e11d48',
    cyan: '#0891b2',
    slate: '#475569',
  };

  return colors[accent] || colors.blue;
};

const handleLabelBaseStyles = {
  position: 'absolute',
  transform: 'translateY(-50%)',
  maxWidth: 120,
  padding: '3px 7px',
  borderRadius: 999,
  background: '#f8fafc',
  border: '1px solid #cbd5e1',
  color: '#475569',
  fontSize: 10,
  fontWeight: 700,
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  pointerEvents: 'none',
  boxShadow: '0 8px 18px rgba(15, 23, 42, 0.08)',
};

export const BaseNode = ({
  id,
  title,
  description,
  accent = 'blue',
  inputs = [],
  outputs = [],
  children,
  width = 240,
  minHeight = 120,
}) => {
  const accentColor = getAccentColor(accent);

  return (
    <div
      className={`base-node base-node--${accent}`}
      style={{
        width,
        minHeight,
        border: '1px solid #cbd5e1',
        borderRadius: 12,
        background: '#ffffff',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {inputs.map((input, index) => {
        const top = getHandleTop(index, inputs.length);

        return (
          <div key={input.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={{
                top,
                width: 10,
                height: 10,
                border: '2px solid #fff',
                background: input.color || accentColor,
              }}
            />

            {input.label && (
              <span
                style={{
                  ...handleLabelBaseStyles,
                  top,
                  right: 'calc(100% + 10px)',
                  textAlign: 'right',
                }}
                title={input.label}
              >
                {input.label}
              </span>
            )}
          </div>
        );
      })}

      <div
        style={{
          padding: '12px 14px 10px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: description ? 4 : 0,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: accentColor,
              flex: '0 0 auto',
            }}
          />

          <strong
            style={{
              fontSize: 13,
              lineHeight: 1.2,
              color: '#0f172a',
              letterSpacing: 0.1,
            }}
          >
            {title}
          </strong>
        </div>

        {description && (
          <div
            style={{
              fontSize: 11,
              lineHeight: 1.35,
              color: '#64748b',
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {children}
      </div>

      {outputs.map((output, index) => {
        const top = getHandleTop(index, outputs.length);

        return (
          <div key={output.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={{
                top,
                width: 10,
                height: 10,
                border: '2px solid #fff',
                background: output.color || accentColor,
              }}
            />

            {output.label && (
              <span
                style={{
                  ...handleLabelBaseStyles,
                  top,
                  left: 'calc(100% + 10px)',
                }}
                title={output.label}
              >
                {output.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};