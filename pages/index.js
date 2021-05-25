import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Lab</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Tour Master!
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Selected</h2>
            <ul>
              <li>Afghanistan</li>
              <li>Guyana</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Choose From</h2>
            <ul>
              <li>Cambodia</li>
              <li>Russia</li>
              <li>Brazil</li>
              <li>Canada</li>
              <li>Mexico</li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  )
}
