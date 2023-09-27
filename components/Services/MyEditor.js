// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const MyEditor = ({ value, onChange }) => {
  return (
    
    <CKEditor
      editor={Editor}
      // data={value}
      onReady={(editor) => {
        editor.setData(value);
        // You can store the "editor" and use when it is needed.
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default MyEditor;
