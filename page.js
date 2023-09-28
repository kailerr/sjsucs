'use client'
import Image from 'next/image'
import Header from '@/components/Header'
import React, {useState , useEffect } from 'react'

function PostalCode(postalCode, regex) {
  if (typeof postalCode === 'string' && regex) {
    const r = new RegExp(regex);
    const match = postalCode.match(r);
    return match ? match[0] : 'none';
  }
  return 'none';
}
export default function Home() {
  const [data, setData] = useState([]);

  useEffect (() => {
  fetch ('https://restcountries.com/v3.1/all')
  .then ((response) => response.json() )
  .then(data => setData(data))
    

  
  });
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#f5f8f1]">
      <Header />
      <h1> Fetch Example </h1>
      <ul>
        {data.map((item, id) => (
          <li key = {id}>{item.name.common} 
          {item.flag && item.flags.svg && (
          <Image 
            src = {item.flags.svg}
            width = {120}
            height = {80}
          />
          )}
          <p>Population Number: {item.population}</p>
          <p>TimeZones: {item.timezones}</p> 
          <p>Continents: {item.continents}</p>
          <Image 
            src = {item.coatOfArms.svg}
            width = {120}
            height = {80}
          />
             {item.capitalInfo && item.capitalInfo.latlng && (
              <p>
                Capital Latitude: {item.capitalInfo.latlng[0]}, Capital Longitude: {item.capitalInfo.latlng[1]}
              </p>
          
             )
             
             }
             <p>StartOfWeek: {item.startOfWeek}</p>
             <p>Postal Code: {PostalCode(item.postalCode, '^\d{2}')}</p>

          </li>
        ))


        }
      </ul>
    </main>
  )
}
