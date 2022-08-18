import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const socialIcons = {
    facebook: FacebookIcon,
    email: EmailIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    new: AddCircleOutlineIcon,
    phone: PhoneIcon,
    twitter: TwitterIcon,
    youtube: YouTubeIcon,
    whatsapp: WhatsappIcon
};

const SocialIcon = ({ name, styles, onClickFunction }) => {
    let icon;

    const options = {
        sx: styles,
        onClick: onClickFunction
    };

    if (socialIcons[name]) {
        icon = React.createElement(socialIcons[name], options);
    }

    return icon;
};

export default SocialIcon;
