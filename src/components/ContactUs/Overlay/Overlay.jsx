import clsx from 'clsx';

import styles from './Overlay.module.css';

function Overlay({ children, message, type }) {
  return (
    <div className={clsx(styles.overlay, styles[type])}>
      {children}
      <h5>{message}</h5>
    </div>
  );
}

export default Overlay;
