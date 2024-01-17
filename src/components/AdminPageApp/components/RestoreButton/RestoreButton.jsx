import { useState } from 'react';

function RestoreButton({ onChooseBackupFile }) {
  const [file, setFile] = useState(null);

  const handleInput = event => {
    setFile(event.target.files[0]);

    var reader = new FileReader();
    reader.onload = function () {
      const loadedModels = JSON.parse(reader.result);
      onChooseBackupFile(loadedModels);
    };

    reader.readAsText(event.target.files[0] || file);
  };

  return (
    <div>
      <label>
        Відновити
        <input
          type="file"
          accept="application/JSON"
          disabled={false}
          onChange={handleInput}
          hidden
        />
      </label>
    </div>
  );
}

export default RestoreButton;
