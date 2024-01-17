import { useState } from 'react';

function FindInput({ onChange }) {
  const [input, setInput] = useState('');

  function handleInput(event) {
    setInput(event.target.value);
    onChange(event.target.value.toLowerCase());
  }

  return (
    <input
      onChange={handleInput}
      value={input}
      type="text"
      placeholder="Введіть модель"
    />
  );
}

export default FindInput;
