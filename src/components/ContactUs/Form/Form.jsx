import { useEffect, useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function Form({ onSubmit }) {
  const [name, setName] = useLocalStorage('name', '');
  const [phone, setPhone] = useLocalStorage('phone', '');
  const [email, setEmail] = useLocalStorage('email', '');
  const [message, setMessage] = useLocalStorage('message', '');

  const handleInput = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        alert('Wrong input name');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name, phone, email, message);
    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <form class="contact-us__form" onSubmit={handleSubmit}>
      <label class="contact-us__input-label">
        <input
          required
          class="contact-us__input"
          type="text"
          name="name"
          placeholder="Введіть ім'я"
          value={name}
          onInput={handleInput}
        />
        <svg class="contact-us__icon" width="20px" height="26px">
          <use href="./images/icons_sprite.svg#icon-form-name"></use>
        </svg>
      </label>
      <label class="contact-us__input-label">
        <input
          required
          class="contact-us__input"
          type="tel"
          // pattern="^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}"
          name="phone"
          placeholder="Введіть телефон"
          value={phone}
          onInput={handleInput}
        />
        <svg class="contact-us__icon" width="16px" height="25px">
          <use href="./images/icons_sprite.svg#icon-form-phone"></use>
        </svg>
      </label>
      <label class="contact-us__input-label">
        <input
          required
          class="contact-us__input"
          type="email"
          name="email"
          placeholder="Введіть пошту"
          value={email}
          onInput={handleInput}
        />
        <svg class="contact-us__icon" width="23px" height="16px">
          <use href="./images/icons_sprite.svg#icon-form-email"></use>
        </svg>
      </label>

      <textarea
        required
        class="contact-us__comment"
        type="text"
        name="message"
        placeholder="Повідомлення"
        value={message}
        onInput={handleInput}
      ></textarea>

      <button class="contact-us__button" type="submit">
        Надіслати
      </button>
    </form>
  );
}

export default Form;
