import styles from './Button.module.css';

function Button({ children, onClick, disabled, variant = 'primary', type = 'button' }) {
  const className = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
