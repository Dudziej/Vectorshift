# VectorShift Frontend Technical Assessment

This project is a polished implementation of the VectorShift frontend technical assessment.

It includes a React-based workflow builder with reusable node abstractions, improved styling, dynamic text-node behavior, and a FastAPI backend integration that validates submitted pipelines.

## Tech Stack

Frontend:
- React
- React Flow
- Zustand
- JavaScript
- CSS

Backend:
- Python
- FastAPI
- Pydantic

## Setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

On Windows PowerShell:

```powershell
cd backend
.\.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

The backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

## Implemented Features

### 1. Reusable Node Abstraction

The original node components were refactored into a reusable abstraction:

- `BaseNode` handles shared layout, handles, header, sizing, and base visual structure.
- `ConfigurableNode` renders form fields and content from configuration.
- `nodeConfigs` defines the shape and behavior of configurable nodes.

This makes it easy to add new nodes without duplicating component code.

### 2. Additional Nodes

Five additional workflow nodes were added to demonstrate the flexibility of the abstraction:

- API Request
- Transform
- Filter
- Summarizer
- Condition

These nodes are configuration-driven and use the shared node rendering system.

### 3. Improved Styling

The UI was redesigned into a more polished workflow-builder experience:

- Dark application shell
- Product-style workflow window
- Readable canvas area
- Improved node library toolbar
- Styled node cards
- Better visible handles and connections
- Custom submit result modal

### 4. Text Node Logic

The Text node now supports:

- Automatic width/height adjustment based on text content
- Multiline input
- Template variables using double curly braces
- Dynamic input handles for valid JavaScript variable names

Example:

```text
Hello {{ userName }}, your order is {{ orderId }}.
```

This creates dynamic input handles for:

```text
userName
orderId
```

Duplicate variables are ignored, and invalid JavaScript variable names are not converted into handles.

### 5. Backend Integration

The frontend submit action sends the current nodes and edges to:

```text
POST /pipelines/parse
```

The backend returns:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

The frontend displays the result in a custom modal.

### 6. DAG Validation

The backend checks whether the submitted pipeline forms a Directed Acyclic Graph.

The implementation uses Kahn's algorithm:

- Build an adjacency list.
- Count incoming edges.
- Process nodes with zero incoming edges.
- If all nodes are processed, the graph is a DAG.
- If not, the graph contains a cycle.

### 7. Connection Deletion

Connections can be selected and removed from the canvas.

A selected connection is highlighted and can be deleted using the connection action panel or the keyboard delete key.

## Notes

The implementation prioritizes clarity, maintainability, and product quality over unnecessary complexity. The goal was to make the assessment feel like a small but complete workflow-builder product.
