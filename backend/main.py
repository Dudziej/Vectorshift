from collections import deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class PipelineNode(BaseModel):
    id: str
    type: str | None = None
    data: dict[str, Any] | None = None
    position: dict[str, Any] | None = None


class PipelineEdge(BaseModel):
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelinePayload(BaseModel):
    nodes: list[PipelineNode]
    edges: list[PipelineEdge]


app = FastAPI(title="VectorShift Technical Assessment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload):
    return {
        "num_nodes": len(payload.nodes),
        "num_edges": len(payload.edges),
        "is_dag": is_directed_acyclic_graph(payload.nodes, payload.edges),
    }


def is_directed_acyclic_graph(
    nodes: list[PipelineNode],
    edges: list[PipelineEdge],
) -> bool:
    node_ids = {node.id for node in nodes}

    if not node_ids:
        return True

    adjacency_list = {node_id: [] for node_id in node_ids}
    incoming_edges_count = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            return False

        adjacency_list[edge.source].append(edge.target)
        incoming_edges_count[edge.target] += 1

    nodes_without_incoming_edges = deque(
        node_id
        for node_id, count in incoming_edges_count.items()
        if count == 0
    )

    visited_count = 0

    while nodes_without_incoming_edges:
        current_node_id = nodes_without_incoming_edges.popleft()
        visited_count += 1

        for target_node_id in adjacency_list[current_node_id]:
            incoming_edges_count[target_node_id] -= 1

            if incoming_edges_count[target_node_id] == 0:
                nodes_without_incoming_edges.append(target_node_id)

    return visited_count == len(node_ids)