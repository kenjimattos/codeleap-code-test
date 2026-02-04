import { useState } from 'react';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import styles from './Login.module.css';

function Login() {
  const [name, setName] = useState('');

  const isDisabled = !name.trim();

  return (
    <div className={styles.container}>
      <form className={styles.card}>
        <h1 className={styles.title}>Welcome to CodeLeap network!</h1>
        <TextInput
          label="Please enter your username"
          value={name}
          onChange={setName}
          placeholder="John doe"
        />
        <div className={styles.actions}>
          <Button type="submit" disabled={isDisabled}>
            ENTER
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
