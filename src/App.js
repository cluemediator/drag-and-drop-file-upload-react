import React from 'react';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

// preview component
const Preview = ({ meta }) => {
  const { name, percent, status, previewUrl } = meta;
  return (
    <div className="preview-box">
      <img src={previewUrl} /> <span className="name">{name}</span> - <span className="status">{status}</span>{status !== "done" && <span className="percent">&nbsp;({Math.round(percent)}%)</span>}
    </div>
  )
}

function App() {

  // specify upload params and API url to file upload
  const getUploadParams = ({ file }) => {
    const body = new FormData();
    body.append('dataFiles', file);
    return { url: 'http://localhost:4000/uploadmultifile', body }
  }

  // handle the status of the file upload
  const handleChangeStatus = ({ xhr }) => {
    if (xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          console.log(result);
        }
      }
    }
  }

  return (
    <div className="App">
      <h3>Drag and Drop file upload - <a href="https://www.cluemediator.com" target="_blank">Clue Mediator</a></h3>
      <div>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          styles={{
            dropzone: { overflow: 'auto', border: '1px solid #999', background: '#f5f5f5' },
            inputLabelWithFiles: { margin: '20px 3%' }
          }}
          canRemove={false}
          PreviewComponent={Preview}
          accept="image/*,audio/*,video/*"
        />
      </div>
    </div>
  );
}

export default App;
