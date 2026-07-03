import { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';

import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ApiRequestNode } from './nodes/apiRequestNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { SummarizerNode } from './nodes/summarizerNode';
import { ConditionNode } from './nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const snapGrid = [gridSize, gridSize];
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  apiRequest: ApiRequestNode,
  transform: TransformNode,
  filter: FilterNode,
  summarizer: SummarizerNode,
  condition: ConditionNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const deleteEdge = useStore((state) => state.deleteEdge);

  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId);

  const renderedEdges = useMemo(
    () =>
      edges.map((edge) => {
        const isSelected = edge.id === selectedEdgeId;

        return {
          ...edge,
          animated: isSelected || edge.animated,
          style: {
            ...(edge.style || {}),
            stroke: isSelected ? '#0891b2' : '#334155',
            strokeWidth: isSelected ? 3.5 : 2.5,
          },
        };
      }),
    [edges, selectedEdgeId]
  );

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const rawData = event.dataTransfer.getData('application/reactflow');

      if (!rawData) {
        return;
      }

      const appData = JSON.parse(rawData);
      const type = appData?.nodeType;

      if (!type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setSelectedEdgeId(edge.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedEdgeId(null);
  }, []);

  const handleDeleteSelectedEdge = useCallback(() => {
    if (!selectedEdgeId) {
      return;
    }

    deleteEdge(selectedEdgeId);
    setSelectedEdgeId(null);
  }, [deleteEdge, selectedEdgeId]);

  return (
    <div ref={reactFlowWrapper} className="pipeline-canvas">
      {selectedEdge && (
        <div className="edge-action-panel">
          <div>
            <span>Selected connection</span>
            <strong>
              {selectedEdge.source} → {selectedEdge.target}
            </strong>
          </div>

          <button type="button" onClick={handleDeleteSelectedEdge}>
            Delete connection
          </button>
        </div>
      )}

      <ReactFlow
        className="pipeline-flow"
        nodes={nodes}
        edges={renderedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={snapGrid}
        connectionLineType="smoothstep"
        deleteKeyCode={['Backspace', 'Delete']}
        fitView
      >
        <Background color="#cbd5e1" gap={gridSize} />
        <Controls />
        <MiniMap
          pannable
          zoomable
          nodeColor={() => '#2563eb'}
          maskColor="rgba(226, 232, 240, 0.72)"
        />
      </ReactFlow>
    </div>
  );
};