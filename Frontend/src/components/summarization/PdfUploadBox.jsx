import React from 'react';
import { useSummarization } from '../../contexts/SummarizationContext';
import pdfIcon from '../../assets/images/pdf-icon.svg';
import '../../Styles/Summarization/upload.css';

const PdfUploadBox = () => {
  const { handleFileUpload } = useSummarization();

  return (
    <div className="upload-container">
      <div className="upload-box">
        <input
          type="file"
          id="pdf-upload"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="file-input"
        />
        <label htmlFor="pdf-upload" className="upload-label">
          <img src={pdfIcon} alt="PDF Icon" className="pdf-icon" />
          <p>Upload your PDF here</p>
          <span className="browse-button">Browse Files</span>
        </label>
      </div>
      <button 
        className="summarize-button"
        onClick={() => {} /* Handled in context */}
      >
        Summarize
      </button>
    </div>
  );
};

export default PdfUploadBox;