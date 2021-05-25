import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";

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

const SelectedCountryCard = ({countryList, removeHandler}) =>
  <div className={styles.card}>
    <h2>Selected</h2>
    <ul>
      {countryList.map(c =>
        <ActionItem key={c} label={c} action="-" handleChange={removeHandler}/>)}
    </ul>
  </div>

const AvailableCountryCard = ({countryList, alreadyAddedList, addHandler}) =>
  <div className={styles.card}>
    <h2>Choose From</h2>
    <ul>
      {countryList
        .filter(c => !alreadyAddedList.includes(c))
        .map(c =>
          <ActionItem key={c} label={c} action="+" handleChange={addHandler}/>)}
    </ul>
  </div>


export default function Home({ allCountries }) {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Tour Master!
        </h1>

        <div className={styles.grid}>
          <SelectedCountryCard
            countryList={selectedCountries}
            removeHandler={handleRemove}/>

          <AvailableCountryCard countryList={allCountries}
                                alreadyAddedList={selectedCountries}
                                addHandler={handleAdd}/>
        </div>

      </main>
    </div>
  )
}

export async function getServerSideProps() {
  console.log("Going to fetch...")
  const response = await fetch("https://restcountries.eu/rest/v2/all")
  if (!response.ok) {
    console.log("fetch was unsuccessful")
    return
  }

  const result = await response.json()
  console.log("result.length", result.length)

  const countryNames = result.map(item => item.name)

  return {
    props: {
      allCountries: countryNames
    }
  }
}
