
import CurrencyInput from "./components/CurrencyInput";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  const [amountFirst, setAmountFirst] = useState(1)
  const [amountSecond, setAmountSecond] = useState(1)
  const [currencyFirst, setCurrencyFirst] = useState('USD')
  const [currencySecond, setCurrencySecond] = useState('UAH')
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
      handleAmountFirstChange(1)
    }
  }, [results])

  const format = (number) => {
    return number.toFixed(2)
  }

  const handleAmountFirstChange = (amountFirst) => {
    setAmountSecond(format(amountFirst * results[currencySecond] / results[currencyFirst]))
    setAmountFirst(amountFirst)
  }

  const handleCurrencyFirstChange = (currencyFirst) => {
    setAmountSecond(format(amountFirst * results[currencySecond] / results[currencyFirst]))
    setCurrencyFirst(currencyFirst)
  }

  const handleAmountSecondChange = (amountSecond) => {
    setAmountFirst(format(amountSecond * results[currencyFirst] / results[currencySecond]))
    setAmountSecond(amountSecond)
  }

  const handleCurrencySecondChange = (currencySecond) => {
    setAmountFirst(format(amountSecond * results[currencyFirst] / results[currencySecond]))
    setCurrencySecond(currencySecond)
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
            onAmountChange={handleAmountFirstChange}
            onCurrencyChange={handleCurrencyFirstChange}
            currencies={Object.keys(results)}
            amount={amountFirst}
            currency={currencyFirst} />
          <CurrencyInput
            onAmountChange={handleAmountSecondChange}
            onCurrencyChange={handleCurrencySecondChange}
            currencies={Object.keys(results)}
            amount={amountSecond}
            currency={currencySecond} />
        </Box>
      </Box>

    </>
  )
}

export default App;