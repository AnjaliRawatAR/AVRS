import React from 'react';
import { useSummarization } from '../../contexts/SummarizationContext';
import PdfUploadBox from '../summarization/PdfUploadBox';
import SummaryDisplay from '../summarization/SummaryDisplay';
import '../../styles/Summarization/results.css';

const Summarization = () => {
  const { state } = useSummarization();

  return (
    <div className="summarization-container">
      <h1>PDF Summarizer</h1>
      <div className="summarization-grid">
        <PdfUploadBox />
        <SummaryDisplay 
          summary={state.summary} 
          isLoading={state.isLoading} 
          error={state.error} 
        />
      </div>
    </div>
  );
};

export default Summarization;