import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
/*import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';*/
import QrCodeIcon from '@mui/icons-material/QrCode';
import PersonAddIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Icon from '@mui/material/Icon';
import Modal from '@mui/material/Modal';

import { CardHeader } from '@mui/material';
import { Stack, width } from '@mui/system';

import { forwardRef } from 'react';

import { profileCardVariants, profileCardStyles } from './styles';

import InputWithIcon from './inputs/input-with-icon';

import { convertArrayToObject } from 'utils/array-functions';
import { getSocialIcon } from 'utils/icon-functions';

import SocialIcon from 'ui-component/social-icon';

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
});

export default ProfileCardEdit;
