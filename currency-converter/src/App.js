import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CircularProgress from '@mui/material/CircularProgress';

import CurrencyInput from "./components/CurrencyInput";


function App() {
  const [amountFrom, setAmountFrom] = useState(1)
  const [amountTo, setAmountTo] = useState(1)
  const [currencyFrom, setCurrencyFrom] = useState('USD')
  const [currencyTo, setCurrencyTo] = useState('UAH')
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://api.fastforex.io/fetch-all?api_key=7cf6ed9ab7-29cc6668bc-rfiwxz')
      .then(response => {
        setResults(response.data.results)
        setLoading(false)
      })

  }, [])

  useEffect(() => {
    if (!!results) {
      handleAmountFromChange(1)
    }
  }, [results])

  const format = (number) => {
    return number.toFixed(2)
  }

  const handleAmountFromChange = (amountFrom) => {
    setAmountTo(format(amountFrom * results[currencyTo] / results[currencyFrom]))
    setAmountFrom(amountFrom)
  }

  const handleCurrencyFromChange = (currencyFrom) => {
    setAmountTo(format(amountFrom * results[currencyTo] / results[currencyFrom]))
    setCurrencyFrom(currencyFrom)
  }

  const handleAmountToChange = (amountTo) => {
    setAmountFrom(format(amountTo * results[currencyFrom] / results[currencyTo]))
    setAmountTo(amountTo)
  }

  const handleCurrencyToChange = (currencyTo) => {
    setAmountFrom(format(amountTo * results[currencyFrom] / results[currencyTo]))
    setCurrencyTo(currencyTo)
  }

  if (isLoading) {
    return (
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{
        p: 3,
        display: 'flex',
        justifyContent: "space-between",
        bgcolor: '#cfe8fc',
        height: '10vh',
        alignItems: "center",
        boxShadow: 3,
      }}>
        <CurrencyExchangeIcon sx={{ ml: 25, fontSize: 70 }} />
        <Typography sx={{
          fontWeight: "bold",
          fontSize: "35px"
        }}>
          Currency convertor</Typography>
        <Box sx={{ display: 'flex', mr: 40 }}>
          <CurrencyInput
            onAmountChange={handleAmountFromChange}
            onCurrencyChange={handleCurrencyFromChange}
            currencies={Object.keys(results)}
            amount={amountFrom}
            currency={currencyFrom} />
          <CurrencyInput
            onAmountChange={handleAmountToChange}
            onCurrencyChange={handleCurrencyToChange}
            currencies={Object.keys(results)}
            amount={amountTo}
            currency={currencyTo} />
        </Box>
      </Box>

    </>
  )
}

export default App;