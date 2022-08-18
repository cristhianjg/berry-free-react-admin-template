import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function InputWithIcon({ label, value, children }) {
    console.log('value : ', value);
    return (
        <>
            {label && (
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        {children}
                        <TextField id="input-with-sx" label={label} variant="standard" defaultValue={value} sx={{ width: '100%' }} />
                    </Box>
                </Box>
            )}
        </>
    );
}
