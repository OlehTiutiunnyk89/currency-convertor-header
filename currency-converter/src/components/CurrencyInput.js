import PropTypes from "prop-types";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const CurrencyInput = ({ amount, currency, currencies, onAmountChange, onCurrencyChange }) => {
    return (
        <>
            <Box sx={{ m: 2 }}>
                <Box>
                    <TextField type='number'
                        value={amount}
                        onChange={ev => onAmountChange(ev.target.value)}
                        />
                    <Select value={currency} onChange={ev => onCurrencyChange(ev.target.value)}>
                        {currencies.map((currency) =>
                            <MenuItem value={currency}>{currency}</MenuItem>)}
                    </Select>
                </Box>
            </Box>
        </>
    )
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func
}

export default CurrencyInput;