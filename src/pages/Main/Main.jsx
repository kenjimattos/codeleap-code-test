import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import styles from './Main.module.css';
import Header from '../../components/posts/Header';

function Main() {
  
  return (
    <div className={styles.page}>
     <Header />
      <main className={styles.content}>
       
      </main>

    </div>
  );
}

export default Main;
