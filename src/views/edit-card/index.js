import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, MenuItem, Stack, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ProfileCardEdit from 'ui-component/profile-card/edit';

const EditCard = () => {
    let { id } = useParams();

    console.log('ID: ', id);

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

    const [profileCard, setProfileCard] = useState({});
    const [socialItems, setSocialItems] = useState([]);

    const urlProfile = `http://localhost:3022/api/v1/profiles/${id}`;

    async function initProfileCard() {
        await fetch(urlProfile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU5ODViZjlmMzQ0YjBmYTliMGYzNzQiLCJ1c2VyTmFtZSI6IkNyaXMiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2NTk3MDY5NzIsImV4cCI6MTY2MjI5ODk3Mn0.dRyWTfRPMRkyZjSGTYnrepiCUl58RAE2Jla1-XnGk0o'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setProfileCard({ ...response.profile });
                console.log('card fetch response : ', response.profile);
            })
            .catch((err) => console.error(err));
    }

    const urlSocialItems = `http://localhost:3022/api/v1/socialItems`;

    async function initSocialItems() {
        await fetch(urlSocialItems, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU5ODViZjlmMzQ0YjBmYTliMGYzNzQiLCJ1c2VyTmFtZSI6IkNyaXMiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2NTk3MDY5NzIsImV4cCI6MTY2MjI5ODk3Mn0.dRyWTfRPMRkyZjSGTYnrepiCUl58RAE2Jla1-XnGk0o'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setSocialItems([...response.items]);
                console.log('card fetch response : ', [...response.items]);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        initProfileCard();
        initSocialItems();
    }, []);

    return (
        <MainCard title="Edit card">
            <ProfileCardEdit {...profileCard} socialItems={socialItems} variant="sm" />

            <Container maxWidth="xs" sx={{ display: 'none', padding: '20px' }}>
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
