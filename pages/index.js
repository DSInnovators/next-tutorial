import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";

const allCountries = [
  "Cambodia",
  "Russia",
  "Bolivia",
  "Mauritania",
]

function ActionItem({label, action, handleChange}) {
  return (
    <li>{label}
      <a href="#"
         onClick={function (e) {
           e.preventDefault()
           handleChange(label)
         }}
         style={{float: "right", marginLeft: "1rem"}}>
        {action}
      </a>
    </li>
  )
}

export default function Home() {
  const [selectedCountries, setSelectedCountries] = useState([])

  function handleAdd(country) {
    setSelectedCountries(selectedCountries.concat(country))
  }

  function handleRemove(country) {
    const updatedList = selectedCountries.filter(c => c !== country)
    setSelectedCountries(updatedList)
  }

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
              {selectedCountries.map(c =>
                <ActionItem key={c} label={c} action="-" handleChange={handleRemove}/>)}
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Choose From</h2>
            <ul>
              {allCountries.map(c =>
                <ActionItem key={c} label={c} action="+" handleChange={handleAdd}/>)}
            </ul>
          </div>
        </div>

      </main>
    </div>
  )
}
