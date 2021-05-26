import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Country = ({name, capital, population, area, languages, currencies, flag}) =>
  <div className={styles.container}>
    <Head>
      <title>{name}</title>
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>{name}</h1>

      <div className={styles.card}>
        <dl>
          <dt>Capital</dt>
          <dd>{capital}</dd>

          <dt>Population</dt>
          <dd>{population}</dd>

          <dt>Area</dt>
          <dd>{area * 1000} square km</dd>

          <dt>Languages</dt>
          <dd>
            {languages.map(lang => lang.name).join(', ')}
          </dd>

          <dt>Currencies</dt>
          <dd>
            {currencies.map(curr => curr.name).join(', ')}
          </dd>

          <dt>Flag</dt>
          <dd>
            <Image src={flag} width="256" height="128"/>
          </dd>
        </dl>
      </div>
    </main>

  </div>

export async function getStaticProps({ params }) {
  const { alpha3Code: code } = params
  console.log("Going to fetch country:", code)
  const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
  if (!response.ok) {
    console.log("fetch with code was unsuccessful")
    return
  }

  const result = await response.json()

  return {
    props: result
  }
}

export async function getStaticPaths() {
  console.log("Getting list of all countries")
  const response = await fetch("https://restcountries.eu/rest/v2/all")
  if (!response.ok) {
    console.log("fetch was unsuccessful")
    return
  }
  const result = await response.json()

  console.log("Got countries:", result.length)

  const paths = result.map(c => ({ params: {alpha3Code: c.alpha3Code} }))
  return {
    paths,
    fallback: false
  }

}

export default Country
