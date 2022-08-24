import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import ProfileCardEdit from 'ui-component/profile-card/edit';

const CreateEditCard = () => {
    let { id } = useParams();
    const pageTitle = id ? 'Edit card' : 'Create card';

    const [profileCard, setProfileCard] = useState({});

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
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        initProfileCard();
    }, []);

    return (
        <MainCard title={pageTitle}>
            <ProfileCardEdit {...profileCard} variant="sm" />
        </MainCard>
    );
};

export default CreateEditCard;
