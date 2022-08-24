import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
import { maxWidth, Stack, width } from '@mui/system';
import { makeStyles } from '@mui/styles';

import { forwardRef } from 'react';

const useStyles = makeStyles({
    profileCardContainer: (props) => ({
        maxWidth: props.profileCard.maxWidth,

        '& .profile-card': {
            borderRadius: '8px',
            border: '1px solid red',

            '& .card-media': {
                border: '1px solid blue',
                width: props.cardMedia.width,
                height: props.cardMedia.height
            },

            '& .card-content': {
                flexGrow: 1,
                textAlign: 'left',
                height: props.cardContent.height,

                '& .container': {
                    position: 'relative',
                    marginTop: props.cardContent.container.marginTop,
                    textAlign: 'center',

                    '& .box-outer': {
                        position: 'relative',
                        display: 'inline-flex',
                        width: props.boxOuter.width,
                        height: props.boxOuter.height
                    },

                    '& .box-inner': {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },

                    '& .avatar': {
                        width: props.avatar.width,
                        height: props.avatar.height
                    }
                }
            },

            '& .card-actions': {
                padding: '0px 16px 16px'
            }
        }
    })
});

const profileCardVariants = {
    xxs: {
        profileCard: {
            maxWidth: '333px'
        },
        cardMedia: {
            width: '600px',
            height: '150px'
        },
        cardContent: {
            height: '150px',

            container: {
                marginTop: '-100px'
            }
        },
        boxOuter: {
            width: 120,
            height: 120
        },
        avatar: {
            width: 100,
            height: 100,
            size: 120,
            thickness: 3,
            value: 100,
            color: 'secondary'
        }
    },
    xs: {
        profileCard: {
            maxWidth: '444px'
        },
        cardMedia: {
            width: '600px',
            height: '300px'
        },
        cardContent: {
            height: '150px',

            container: {
                marginTop: '-100px'
            }
        },
        boxOuter: {
            width: 150,
            height: 150
        },
        avatar: {
            width: 120,
            height: 120,
            size: 150,
            thickness: 3,
            value: 100,
            color: 'secondary'
        }
    }
};

const ProfileCardThumbnail = forwardRef((props, ref) => {
    const { firstName, lastName, picture, variant } = props;
    const styleProps = profileCardVariants[variant] || profileCardVariants.xxs;
    const classes = useStyles(styleProps);

    return (
        <Container className={classes.profileCardContainer} maxWidth="false" ref={ref}>
            <Card className="profile-card">
                <CardMedia
                    className="card-media"
                    component="img"
                    image="https://source.unsplash.com/random/600x300/?pattern"
                    alt="random"
                />
                <CardContent className="card-content">
                    <Container className="container">
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

                    <Stack sx={{ padding: '8px 16px' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {firstName}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h3">
                            {lastName}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions className="card-actions">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" color="primary" disableElevation startIcon={<EditIcon />}>
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Container>
    );
});

export default ProfileCardThumbnail;
