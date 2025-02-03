import React from 'react'
import { useState, useEffect } from 'react'

const priceApiUrl = 'https://interview.switcheo.com/prices.json'

const usePrices = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true)
      try {
        const response = await fetch(priceApiUrl)
        const prices = await response.json()

        setData(prices)
      } catch (error) {
        console.log('error:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPrices()
  }, [])

  return { data, loading, error }
}

export default usePrices
