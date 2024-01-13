import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key":  process.env.REACT_APP_RAPIDAPI_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
};

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",

  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({token, batchSize}) => createRequest(`/v2/crypto?token=${token}&batchSize=${batchSize}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

// const options = {
//     method: 'GET',
//     url: 'https://news67.p.rapidapi.com/v2/crypto',
//     headers: {
//       'X-RapidAPI-Key': '3d71ac4757msh814efb70fead244p15dac7jsnc159b4892b8d',
//       'X-RapidAPI-Host': 'news67.p.rapidapi.com'
//     }
//   };
