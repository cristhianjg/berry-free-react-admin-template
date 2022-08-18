import { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { CardHeader } from '@mui/material';
import { Stack } from '@mui/system';
import { profileCardVariants, profileCardStyles } from './styles';
import InputWithIcon from './inputs/input-with-icon';
import { convertArrayToObject } from 'utils/array-functions';
import SocialIcon from 'ui-component/social-icon';
import SelectionGrid from 'ui-component/selection-grid';
import { SOCIAL_ITEMS } from 'constants/socials';

const useStyles = profileCardStyles;

const ProfileCardEdit = forwardRef((props, ref) => {
    const { firstName, lastName, summary, picture, socialItems, variant } = props;
    const [socials, setSocials] = useState({});
    const [socialsGridOpen, setSocialsGridOpen] = useState(false);

    const styleProps = profileCardVariants[variant] || profileCardVariants.xxs;

    const classes = useStyles(styleProps);

    useEffect(() => {
        if (socialItems.length > Object.keys(socials).length) {
            setSocials(convertArrayToObject(socialItems, 'type'));
        }
    }, [socialItems, socials]);

    // add label and icon to use in each component
    for (const key in socials) {
        const name = key[0].toUpperCase() + key.substring(1);
        socials[key]['label'] = name;
        socials[key]['icon'] = name + 'Icon';
    }

    const handleAddSocialItem = () => {
        console.log('Handle add social item');
        const newSocial = {
            type: 'new',
            icon: 'AppRegistrationIcon',
            label: 'New',
            account: ''
        };

        socials['new'] = newSocial;

        setSocials({ ...socials, new: newSocial });

        console.log('socials : ', socials);
    };

    const RenderSocialItemsList = () => {
        return Object.keys(socials).map((item, $idx) => {
            const iconColor = socials[item].type != 'new' ? 'action.active' : 'blue';

            const iconProps = {
                name: socials[item].type,
                styles: { color: iconColor, mr: 1, my: 0.5 },
                onClickFunction: () => {
                    setSocialsGridOpen(true);
                    console.log('clicked');
                }
            };

            return (
                <InputWithIcon label={socials[item].label} value={socials[item].account} key={$idx}>
                    <SocialIcon {...iconProps} />
                </InputWithIcon>
            );
        });
    };

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

    const socialOptions = SOCIAL_ITEMS.map((item) => {
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
                    console.log(label);
                }}
            >
                {label}
            </Button>
        );
    });

    return (
        <>
            <Box className={classes.profileCardContainer} maxWidth="false" ref={ref}>
                {firstName && lastName && (
                    <Card className="profile-card">
                        <CardMedia
                            className="card-media"
                            component="img"
                            image="https://source.unsplash.com/random/600x300/?pattern"
                            alt="random"
                        />
                        <CardContent className="card-content">
                            <Container className="avatar-container">
                                <Box className="box-outer">
                                    <CircularProgress
                                        variant="determinate"
                                        size={styleProps.avatar.size}
                                        thickness={styleProps.avatar.thickness}
                                        value={styleProps.avatar.value}
                                        color={styleProps.avatar.color}
                                    />
                                    <Box className="box-inner">
                                        <Avatar className="avatar" alt="Remy Sharp" src={picture} />
                                    </Box>
                                </Box>
                            </Container>

                            <Stack>
                                <TextField variant="standard" label="First name" defaultValue={firstName} />
                                <TextField variant="standard" label="Last name" defaultValue={lastName} />
                                <TextField variant="standard" label="Summary" defaultValue={summary} />
                            </Stack>

                            <RenderSocialItemsList />
                        </CardContent>
                        <CardActions className="card-actions edit-card">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="outlined" color="primary" onClick={handleAddSocialItem} disableElevation>
                                        Add social item
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" color="primary" disableElevation>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
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

export default ProfileCardEdit;
