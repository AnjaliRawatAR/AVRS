export const extractPdfText = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // MUST be "file" to match multer field

  try {
    const response = await fetch('http://localhost:8000/api/summarizer/extract-pdf-text', {
      method: 'POST',
      body: formData,
      // ⚠️ DO NOT set Content-Type here – browser sets it automatically with boundary
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Error extracting text:', errorDetails);
      throw new Error('Failed to extract text');
    }

    return await response.json();
  } catch (error) {
    console.error('Network or server error:', error.message);
    throw new Error('Failed to extract text');
  }
};

export const generateSummary = async (text) => {
  try {
    const response = await fetch('http://localhost:8000/api/summarizer/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Error generating summary:', errorDetails);
      throw new Error('Failed to generate summary');
    }

    return await response.json();
  } catch (error) {
    console.error('Network or server error:', error.message);
    throw new Error('Failed to generate summary');
  }
};
