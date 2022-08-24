import { CardMedia } from '@mui/material';

// "https://source.unsplash.com/random/600x300/?pattern"
export const ProfileCardMedia = ({ imageSrc }) => {
    return <CardMedia className="card-media" component="img" image={imageSrc} alt="random" />;
};
