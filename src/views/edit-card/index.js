import { Button, Container, MenuItem, Stack, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';

const EditCard = () => {
    const [social, setSocial] = useState('');

    const socialNetworks = [
        {
            label: 'Instagram',
            value: 'instagram'
        },
        {
            label: 'Twitter',
            value: 'twitter'
        },
        {
            label: 'Facebook',
            value: 'facebook'
        }
    ];

    const handleChange = (event) => {
        console.log(event.target.value);
        setSocial(event.target.value);
    };

    return (
        <MainCard title="Edit card">
            <Container maxWidth="xs" sx={{ float: 'left', padding: '20px' }}>
                <Stack spacing={4}>
                    <TextField id="profile-firstName" label="First name" variant="standard" />
                    <TextField id="profile-lastName" label="Last name" variant="standard" />
                    <TextField
                        id="profile-social-network-1"
                        select
                        label="Social network"
                        value={social}
                        onChange={handleChange}
                        variant="standard"
                    >
                        {socialNetworks.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField id="profile-social-network-account-1" label="Social network account" variant="standard" />
                    <Button variant="contained" disableElevation>
                        Submit
                    </Button>
                </Stack>
            </Container>
        </MainCard>
    );
};

export default EditCard;
