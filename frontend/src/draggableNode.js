export const DraggableNode = ({ type, label, accent = 'blue' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
  };

  return (
    <div
      className={`draggable-node draggable-node--${accent}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      <span className="draggable-node__spark" />
      <span>{label}</span>
    </div>
  );
};