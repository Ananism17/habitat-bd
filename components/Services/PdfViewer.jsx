import React from "react";
import { Document, Page } from "react-pdf";

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
