import React from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ url }) => {
  return (
    <div>
      <Document file={url}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfViewer;
