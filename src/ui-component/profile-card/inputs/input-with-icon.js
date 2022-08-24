import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Remove from '@mui/icons-material/Remove';
import { useState, useEffect, useRef } from 'react';

export default function InputWithIcon({ id, label, value, onChange, onClick, children }) {
    /**
     * hay que resolver un problema acá. la primera vez que carga, y cuando agregamos un social item nuevo está todo ok.
     * El problema aparece cuando borramos un input del medio. El input desaparece pero su valor se re-asigna al input
     * que reemplaza al borrado (el que estaba abajo).
     * Hay algo ahi con el defaultValue de TextField, porque si lo cambio por value={value} funciona bien cuando hago
     * un delete de field, pero anda mal al agregar uno nuevo (no aparece lo que se escribe)
     */

    return (
        <>
            {label && (
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        {children}
                        <TextField
                            id={id}
                            label={label}
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            sx={{ width: '100%' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start" sx={{ cursor: 'pointer', color: 'red' }}>
                                        <Remove onClick={onClick} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
}
