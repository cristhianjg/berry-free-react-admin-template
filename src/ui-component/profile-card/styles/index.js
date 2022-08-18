import { NoEncryption, NordicWalking } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

export const profileCardStyles = makeStyles({
    profileCardContainer: (props) => ({
        maxWidth: props.profileCard.maxWidth,

        '& .profile-card': {
            borderRadius: '8px',
            border: '1px solid #eee',

            '& .card-media': {
                width: props.cardMedia.width,
                height: props.cardMedia.height
            },

            '& .card-content': {
                flexGrow: 1,
                textAlign: 'left',
                height: props.cardContent.height,

                '& .avatar-container': {
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
                },

                '& .summary': {
                    display: props.summary.display
                },

                '& .social-networks': {
                    display: props.socialNetworks.display
                }
            },

            '& .card-actions': {
                display: props.cardActions.default.display,
                padding: '0px 16px 16px',

                '&.edit-card': {
                    display: props.cardActions.editCard.display
                }
            }
        }
    })
});

export const profileCardVariants = {
    xxs: {
        profileCard: {
            maxWidth: 1200 / 4
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
        },
        summary: {
            display: 'none'
        },
        socialNetworks: {
            display: 'none'
        },
        cardActions: {
            default: {
                display: 'none'
            },
            editCard: {
                display: 'none'
            }
        }
    },
    xs: {
        profileCard: {
            maxWidth: 1200 / 3
        },
        cardMedia: {
            width: '600px',
            height: '300px'
        },
        cardContent: {
            height: 'auto',

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
        },
        summary: {
            display: 'block',
            padding: '8px 16px'
        },
        socialNetworks: {
            display: 'block'
        },
        cardActions: {
            default: {
                display: 'none'
            },
            editCard: {
                display: 'block'
            }
        }
    },
    sm: {
        profileCard: {
            maxWidth: 1200 / 2.05
        },
        cardMedia: {
            width: '600px',
            height: '300px'
        },
        cardContent: {
            height: 'auto',

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
        },
        summary: {
            display: 'block',
            padding: '8px 16px'
        },
        socialNetworks: {
            display: 'block'
        },
        cardActions: {
            default: {
                display: 'none'
            },
            editCard: {
                display: 'block'
            }
        }
    }
};
