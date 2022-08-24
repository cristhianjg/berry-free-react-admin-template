import { Container, Box, CircularProgress, Avatar } from '@mui/material';

export const ProfileCardAvatar = ({ styleProps, picture }) => {
    return (
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
    );
};
