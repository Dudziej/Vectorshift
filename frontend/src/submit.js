import { useState } from 'react';

import { useStore } from './store';

const PIPELINE_PARSE_URL = 'http://127.0.0.1:8000/pipelines/parse';

export const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const getPipelinePayload = useStore((state) => state.getPipelinePayload);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = getPipelinePayload();

      const response = await fetch(PIPELINE_PARSE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Failed to submit pipeline:', error);
      setSubmitError(
        'Please make sure the backend is running on http://127.0.0.1:8000 and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setAnalysisResult(null);
    setSubmitError(null);
  };

  return (
    <>
      <div className="submit-bar">
        <div>
          <span>Ready to validate?</span>
          <strong>Submit your workflow to the FastAPI backend.</strong>
        </div>

        <button
          className="submit-button"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Analyzing...' : 'Submit pipeline'}
        </button>
      </div>

      {(analysisResult || submitError) && (
        <div className="modal-backdrop" role="presentation">
          <div className="analysis-modal" role="dialog" aria-modal="true">
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>

            {analysisResult ? (
              <>
                <div className="modal-icon modal-icon--success">✓</div>
                <p className="eyebrow">Pipeline analysis complete</p>
                <h3>Your workflow was parsed successfully</h3>

                <div className="analysis-grid">
                  <ResultCard label="Nodes" value={analysisResult.num_nodes} />
                  <ResultCard label="Edges" value={analysisResult.num_edges} />
                  <ResultCard
                    label="Valid DAG"
                    value={analysisResult.is_dag ? 'Yes' : 'No'}
                    tone={analysisResult.is_dag ? 'success' : 'danger'}
                  />
                </div>

                <p className="modal-copy">
                  A valid DAG means your pipeline does not contain circular
                  dependencies and can be executed safely in topological order.
                </p>
              </>
            ) : (
              <>
                <div className="modal-icon modal-icon--danger">!</div>
                <p className="eyebrow">Backend unavailable</p>
                <h3>Could not analyze the pipeline</h3>
                <p className="modal-copy">{submitError}</p>
              </>
            )}

            <button type="button" className="modal-action" onClick={closeModal}>
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ResultCard = ({ label, value, tone = 'default' }) => {
  return (
    <div className={`result-card result-card--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
};