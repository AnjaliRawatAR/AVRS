import React, { createContext, useContext, useReducer } from 'react';
import { extractPdfText, generateSummary } from '../services/summarizerService';

const initialState = {
  pdfFile: null,
  extractedText: '',
  summary: '',
  isLoading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PDF_FILE':
      return { ...state, pdfFile: action.payload };
    case 'SET_EXTRACTED_TEXT':
      return { ...state, extractedText: action.payload };
    case 'SET_SUMMARY':
      return { ...state, summary: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const SummarizationContext = createContext();

export const SummarizationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('Uploaded File:', file);
    dispatch({ type: 'SET_PDF_FILE', payload: file });
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const { extractedText } = await extractPdfText(file);
      dispatch({ type: 'SET_EXTRACTED_TEXT', payload: extractedText });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to extract text from PDF' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleSummarize = async () => {
    if (!state.extractedText) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const { summary } = await generateSummary(state.extractedText);
      dispatch({ type: 'SET_SUMMARY', payload: summary });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to generate summary' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <SummarizationContext.Provider
      value={{
        state,
        handleFileUpload,
        handleSummarize
      }}
    >
      {children}
    </SummarizationContext.Provider>
  );
};

export const useSummarization = () => useContext(SummarizationContext);