import { useState } from 'react';

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function BackUpButton({ getQuery, name }) {
  const [isDisabled, setIsDisabled] = useState(false);

  function createName() {
    const today = new Date(Date.now());
    const fullName = `${name}_${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}_${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    return fullName;
  }

  const handleBackUp = () => {
    setIsDisabled(true);
    getQuery()
      .then(result => {
        downloadObjectAsJson(result, createName());
        setIsDisabled(false);
      })
      .catch(error => {
        console.log(error.message);
        setIsDisabled(false);
      });
  };

  return (
    <button disabled={isDisabled} onClick={handleBackUp} type="button">
      Бекап
    </button>
  );
}

export default BackUpButton;
