import { Stack, TextField } from '@mui/material';

export const ProfileCardInputFields = ({ inputFields }) => {
    return (
        <Stack>
            {inputFields.map((inputField, idx) => (
                <TextField
                    key={idx}
                    id={inputField.id}
                    variant={inputField.variant}
                    label={inputField.label}
                    defaultValue={inputField.defaultValue}
                    onChange={inputField.onChange}
                />
            ))}
        </Stack>
    );
};
