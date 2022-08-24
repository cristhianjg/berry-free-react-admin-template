import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import ProfileCard from 'ui-component/profile-card';

const ProfileCardsList = () => {
    const [profileCards, setProfileCards] = useState([]);
    const url = 'http://localhost:3022/api/v1/profiles';

    async function initProfileCards() {
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU5ODViZjlmMzQ0YjBmYTliMGYzNzQiLCJ1c2VyTmFtZSI6IkNyaXMiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2NTk3MDY5NzIsImV4cCI6MTY2MjI5ODk3Mn0.dRyWTfRPMRkyZjSGTYnrepiCUl58RAE2Jla1-XnGk0o'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setProfileCards([...response.profiles]);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        initProfileCards();
    }, []);

    return (
        <MainCard title="Your cards">
            <Box sx={{ pb: 2 }}>
                <Button component={Link} to="/profile-cards/create" variant="outlined" startIcon={<AddIcon />}>
                    New card
                </Button>
            </Box>
            <Grid container spacing={2}>
                {profileCards.map((props) => (
                    <Grid item xs={3} key={props.id}>
                        <Link to={`../edit/${props.id}`}>
                            <ProfileCard {...props} variant="xxs" />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

export default ProfileCardsList;
