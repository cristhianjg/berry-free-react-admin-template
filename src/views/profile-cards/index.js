import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import ProfileCard from 'ui-component/profile-card';
import { Link } from 'react-router-dom';

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
                console.log('card fetch response : ', [...response.profiles]);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        initProfileCards();
    }, []);

    return (
        <MainCard title="Your cards">
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
