import React from 'react';
import '../../styles/Summarization/results.css';

const SummaryDisplay = ({ summary, isLoading, error }) => {
  return (
    <div className="summary-container">
      <h2>Summary</h2>
      <div className="summary-content">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : summary ? (
          <p>{summary}</p>
        ) : (
          <div className="placeholder">
            Your summary will appear here after processing
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDisplay;