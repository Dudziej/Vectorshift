import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

import './index.css';

function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">VectorShift technical assessment</p>
          <h1>AI workflow builder</h1>
          <p className="hero-copy">
            Build a pipeline by dragging nodes onto the canvas, connecting them,
            and submitting the graph for backend validation.
          </p>
        </div>

        <div className="hero-badge">
          <span className="status-dot" />
          Local development mode
        </div>
      </section>

      <section className="workflow-window">
        <div className="window-header">
          <div className="window-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div>
            <h2>Pipeline canvas</h2>
            <p>Drag nodes, connect handles, validate the graph.</p>
          </div>
        </div>

        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </section>
    </main>
  );
}

export default App;