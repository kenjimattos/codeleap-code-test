import styles from './TextInput.module.css';

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 4,
  maxLength
}) {
  const inputProps = {
    className: styles.input,
    value,
    onChange: (e) => onChange(e.target.value),
    placeholder,
    type,
    maxLength
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      {multiline ? (
        <textarea {...inputProps} rows={rows} />
      ) : (
        <input {...inputProps} />
      )}
    </div>
  );
}

export default TextInput;
