import InputWithIcon from './inputs/input-with-icon';
import SocialIcon from 'ui-component/social-icon';

export const ProfileCardSocialItems = ({ socialItemInputs, onInputChange, onInputClick }) => {
    return Object.keys(socialItemInputs).map((item, $idx) => {
        const iconProps = {
            name: socialItemInputs[item].type,
            styles: { color: 'action.active', mr: 1, my: 0.5 }
        };

        return (
            <InputWithIcon
                id={socialItemInputs[item].type}
                label={socialItemInputs[item].label}
                value={socialItemInputs[item].account}
                onChange={onInputChange}
                onClick={() => onInputClick(socialItemInputs[item].type)}
                key={$idx}
            >
                <SocialIcon {...iconProps} />
            </InputWithIcon>
        );
    });
};
