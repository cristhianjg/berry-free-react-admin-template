import { useEffect, useState, forwardRef } from 'react';

// New components
import { ProfileCard } from './profile-card.component';
import { ProfileCardMedia } from './profile-card-media.component';
import { ProfileCardContent } from './profile-card-content.component';
import { ProfileCardAvatar } from './profile-card-avatar.component';
import { ProfileCardInputFields } from './profile-card-input-fields.component';
import { ProfileCardSocialItems } from './profile-card-social-items.component';

// Old components
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Modal from '@mui/material/Modal';
import { profileCardVariants, profileCardStyles } from './styles';
import { convertArrayToObject } from 'utils/array-functions';
import SocialIcon from 'ui-component/social-icon';
import SelectionGrid from 'ui-component/selection-grid';
import { SOCIAL_ITEMS } from 'constants/socials';

const useStyles = profileCardStyles;

const ProfileCardEdit = forwardRef((props, ref) => {
    const { id, firstName, lastName, summary, picture, background, socialItems, variant } = props;
    const [socialItemInputs, setSocialItemInputs] = useState({});
    const [socialInputsLoaded, setSocialInputsLoaded] = useState(false);
    const [socialsGridOpen, setSocialsGridOpen] = useState(false);
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);
    const [pendingSave, setPendingSave] = useState('none');
    const [newData, setNewData] = useState({});

    const styleProps = profileCardVariants[variant] || profileCardVariants.xxs;

    const classes = useStyles(styleProps);

    useEffect(() => {
        if (!socialInputsLoaded) {
            if (socialItems?.length > Object.keys(socialItemInputs)?.length) {
                setSocialItemInputs(convertArrayToObject(socialItems, 'type'));
            }
            if (socialItems?.length === Object.keys(socialItemInputs)?.length) {
                setSocialInputsLoaded(true);
            }
        }
    }, [socialItems, socialItemInputs, socialInputsLoaded]);

    const handleUpdateField = (event) => {
        const { id, value } = event.target;

        // IMPORTANT!!!!
        // const socialItemInputsCopy = Object.assign({}, socialItemInputs);
        // the line below does the same as using Object.assign({}, ...). It makes a copy of the object by value not by reference. Very important to update a state on REACT!!!
        /*const socialItemInputsCopy = { ...socialItemInputs };
        socialItemInputsCopy[id].account = value;
        setSocialItemInputs(socialItemInputsCopy);*/

        if (SOCIAL_ITEMS.includes(id)) {
            // updates socialItemInputs to show changes on UI
            const socialItemInputsCopy = { ...socialItemInputs };
            socialItemInputsCopy[id].account = value;
            setSocialItemInputs(socialItemInputsCopy);

            // updates newData to save changes to API
            const newDataCopy = { ...newData };

            if (!newDataCopy.hasOwnProperty('socialItems')) {
                newDataCopy.socialItems = [];
            }

            /*if (!newDataCopy.socialItems.hasOwnProperty(id)) {
                newDataCopy.socialItems = [];
            }
            
            newDataCopy.socialItems.push(socialItemInputs[id]);*/

            if (newDataCopy.socialItems.length) {
                newDataCopy.socialItems = newData.socialItems.filter((socialItem) => socialItem.type != id);
            }
            /*    newDataCopy.socialItems.push(socialItemInputs[id]);
            } else {
                newDataCopy.socialItems.push(socialItemInputs[id]);
            }*/

            newDataCopy.socialItems.push(socialItemInputs[id]);

            setNewData(newDataCopy);
        } else {
            // updates newData to save changes to API
            const newDataCopy = { ...newData };
            newDataCopy[id] = value;
            setNewData({ ...newDataCopy });
        }

        setPendingSave('block');
    };

    const inputFields = [
        {
            id: 'firstName',
            variant: 'standard',
            label: 'First name',
            defaultValue: firstName,
            onChange: handleUpdateField
        },
        {
            id: 'lastName',
            variant: 'standard',
            label: 'Last name',
            defaultValue: lastName,
            onChange: handleUpdateField
        },
        {
            id: 'summary',
            variant: 'standard',
            label: 'Summary',
            defaultValue: summary,
            onChange: handleUpdateField
        }
    ];

    // add label and icon to use in each component
    for (const key in socialItemInputs) {
        const name = key[0].toUpperCase() + key.substring(1);
        socialItemInputs[key]['label'] = name;
        socialItemInputs[key]['icon'] = name + 'Icon';
    }

    // add input to enter a new selected social item
    const handleAddSocialItem = (type) => {
        const name = type[0].toUpperCase() + type.substring(1);

        const newSocial = {
            type: type.toLowerCase(),
            icon: name + 'Icon',
            label: name,
            account: ''
        };

        // check if profile already has a social item of the same type
        if (Object.keys(socialItemInputs).find((socialItemKey) => socialItemKey === newSocial.type)) {
            alert(`You already have an ${type} account`);
        } else {
            setSocialItemInputs({ ...socialItemInputs, [newSocial.type]: newSocial });
            setPendingSave('block');
        }
    };

    const handleDeleteField = async (socialItemType) => {
        const socialItemInputsCopy = { ...socialItemInputs };

        // update UI
        delete socialItemInputsCopy[socialItemType];
        setSocialItemInputs(socialItemInputsCopy);

        // update API payload
        const itemToDelete = socialItemInputs[socialItemType];

        // if itemToDelete does not have 'id' it doesn´t exist on DB and we don´t have to update it
        if (itemToDelete.hasOwnProperty('id')) {
            itemToDelete.delete = true;

            const newDataCopy = { ...newData };

            if (!newDataCopy.hasOwnProperty('socialItems')) {
                newDataCopy.socialItems = [];
            }

            newDataCopy.socialItems.push(itemToDelete);
            setNewData({ ...newDataCopy });
        }

        setPendingSave('block');
    };

    const handleSubmit = async () => {
        const url = `http://localhost:3022/api/v1/profiles/${id}`;

        await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU5ODViZjlmMzQ0YjBmYTliMGYzNzQiLCJ1c2VyTmFtZSI6IkNyaXMiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2NTk3MDY5NzIsImV4cCI6MTY2MjI5ODk3Mn0.dRyWTfRPMRkyZjSGTYnrepiCUl58RAE2Jla1-XnGk0o'
            },
            body: JSON.stringify(newData)
        })
            .then((response) => response.json())
            .then(() => {
                setSavedSuccessfully(true);
                setPendingSave('none');
            })
            .catch((err) => console.error(err));
    };

    // modal to add a new social item
    const modalStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };

    const socialOptions = SOCIAL_ITEMS.map((item, idx) => {
        const iconColor = '#999';
        const label = item[0].toUpperCase() + item.substring(1);
        const itemProps = {
            name: item,
            styles: { color: iconColor, mr: 1, my: 0.5 }
        };

        return (
            <Button
                startIcon={<SocialIcon {...itemProps} />}
                onClick={() => {
                    handleAddSocialItem(label);
                    setSocialsGridOpen(false);
                }}
                key={idx}
            >
                {label}
            </Button>
        );
    });

    return (
        <>
            <Box className={classes.profileCardContainer} maxWidth="false" ref={ref}>
                {firstName && lastName && (
                    <ProfileCard>
                        <ProfileCardMedia imageSrc={background || picture} />
                        <ProfileCardContent className="card-content">
                            <ProfileCardAvatar styleProps={styleProps} picture={picture} />
                            <ProfileCardInputFields inputFields={inputFields} />
                            <ProfileCardSocialItems
                                socialItemInputs={socialItemInputs}
                                onInputChange={handleUpdateField}
                                onInputClick={handleDeleteField}
                            />
                        </ProfileCardContent>
                        <CardActions className="card-actions edit-card">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            setSocialsGridOpen(true);
                                        }}
                                        disableElevation
                                    >
                                        Add social item
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        onClick={handleSubmit}
                                        sx={{ display: pendingSave }}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </ProfileCard>
                )}
            </Box>
            <Modal
                open={socialsGridOpen}
                onClose={() => setSocialsGridOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyles}>
                    <SelectionGrid items={socialOptions} />
                </Box>
            </Modal>
        </>
    );
});

// this fixes eslint error 'Component definition is missing display name'
ProfileCardEdit.displayName = 'ProfileCardEdit';

export default ProfileCardEdit;
