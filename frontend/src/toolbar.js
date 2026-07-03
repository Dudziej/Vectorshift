import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <div className="toolbar-copy">
        <span>Node library</span>
        <strong>Drag blocks into the canvas</strong>
      </div>

      <div className="toolbar-nodes">
        <DraggableNode type="customInput" label="Input" accent="blue" />
        <DraggableNode type="text" label="Text" accent="amber" />
        <DraggableNode type="llm" label="LLM" accent="violet" />
        <DraggableNode type="customOutput" label="Output" accent="emerald" />

        <DraggableNode type="apiRequest" label="API Request" accent="cyan" />
        <DraggableNode type="transform" label="Transform" accent="slate" />
        <DraggableNode type="filter" label="Filter" accent="rose" />
        <DraggableNode type="summarizer" label="Summarizer" accent="violet" />
        <DraggableNode type="condition" label="Condition" accent="amber" />
      </div>
    </div>
  );
};