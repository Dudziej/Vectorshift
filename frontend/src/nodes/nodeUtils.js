export const extractTemplateVariables = (text = '') => {
  const pattern = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
  const variables = [];
  const seen = new Set();

  let match = pattern.exec(text);

  while (match) {
    const variableName = match[1];

    if (!seen.has(variableName)) {
      variables.push(variableName);
      seen.add(variableName);
    }

    match = pattern.exec(text);
  }

  return variables;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getTextNodeDimensions = (text = '') => {
  const lines = text.split('\n');
  const longestLineLength = Math.max(...lines.map((line) => line.length), 0);

  const approximateWrappedLines = lines.reduce((total, line) => {
    return total + Math.max(1, Math.ceil(line.length / 45));
  }, 0);

  const width = clamp(260 + longestLineLength * 4.5, 260, 520);
  const minHeight = clamp(150 + approximateWrappedLines * 18, 150, 420);
  const textareaHeight = clamp(72 + approximateWrappedLines * 16, 72, 280);

  return {
    width,
    minHeight,
    textareaHeight,
  };
};