import React,{ useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function changePageBack(){
    changePage(-1)
  }

  function changePageNext(){
    changePage(+1)
  }

  return (
    <center>
      <div>
      <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page height="600" pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
        { pageNumber > 1 &&
        <button onClick={changePageBack}>Previous Page</button>
        }
        { pageNumber < numPages &&
          <button onClick={changePageNext}>Next Page</button>
        }
      </div>
      <div className='Scroll-view'>
        <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess} >
          {Array.from(
            new Array(numPages),
            (el,index) => (
              <Page 
              key={`page_${index+1}`}
              pageNumber={index+1}
              />
            )
          )}
        </Document>
      </div>
    </center>
  );
}

export default App;
