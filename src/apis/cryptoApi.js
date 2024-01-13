// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST
}

console.log(process.env)

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoHeaders });

// Define our single API slice object
export const cryptoApi = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'cryptoApi',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({ baseUrl }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
      // The `getPosts` endpoint is a "query" operation that returns data
      getCryptos: builder.query({
        // The URL for the request is '/exchanges'
        query: (count) => createRequest(`/coins?limit=${count}`),
      }),
      getCryptoDetails: builder.query({
        query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
      getCryptoHistory: builder.query({
        query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
      }),
      getExchanges: builder.query({
        query: () => createRequest(`coin/Qwsogvtv82FCd/exchanges`),
      }),
    })
  })

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoApi

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       limit: '50',
//       offset: '0',
//       orderBy: '24hVolume',
//       orderDirection: 'desc'
//     },
//     headers: {
//       'X-RapidAPI-Key': '3d71ac4757msh814efb70fead244p15dac7jsnc159b4892b8d',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };