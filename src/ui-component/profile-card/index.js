import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PersonAddIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';

import { CardHeader } from '@mui/material';
import { Stack, width } from '@mui/system';

import { forwardRef } from 'react';

import { profileCardVariants, profileCardStyles } from './styles';

// New components
import { ProfileCard } from './profile-card.component';
import { ProfileCardMedia } from './profile-card-media.component';

const useStyles = profileCardStyles;

const ProfileCard_ = forwardRef((props, ref) => {
    const { firstName, lastName, summary, picture, background, socialItems, variant } = props;

    const styleProps = profileCardVariants[variant] || profileCardVariants.xxs;

    const classes = useStyles(styleProps);

    return (
        <Container className={classes.profileCardContainer} maxWidth="false" ref={ref}>
            <ProfileCard>
                <ProfileCardMedia imageSrc={background || picture} />
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
                                <Avatar className="avatar" alt="avatar" src={picture} />
                            </Box>
                        </Box>
                    </Container>

                    <Stack>
                        <Typography gutterBottom variant="h1" component="h3">
                            {firstName}
                        </Typography>
                        <Typography gutterBottom variant="h1" component="h4" sx={{ marginTop: '-22px' }}>
                            {lastName}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h5" sx={{ textAlign: 'justify' }}>
                            {summary}
                        </Typography>
                    </Stack>

                    <List className="social-networks">
                        <ListItemButton>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary="cristhianjg@gmail.com" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <WhatsappIcon />
                            </ListItemIcon>
                            <ListItemText primary="+54 1234 5678" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <InstagramIcon />
                            </ListItemIcon>
                            <ListItemText primary="cristhianjg" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <TwitterIcon />
                            </ListItemIcon>
                            <ListItemText primary="cristhianjg" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <FacebookIcon />
                            </ListItemIcon>
                            <ListItemText primary="cristhianjg873648713" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <QrCodeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Show QR code" />
                        </ListItemButton>
                    </List>
                </CardContent>
                <CardActions className="card-actions">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" color="primary" disableElevation startIcon={<EditIcon />}>
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" color="primary" disableElevation startIcon={<PersonAddIcon />}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </ProfileCard>
        </Container>
    );
});

// this fixes eslint error 'Component definition is missing display name'
ProfileCard_.displayName = 'ProfileCard_';

export default ProfileCard_;
