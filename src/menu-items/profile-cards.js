// assets
import { IconRectangleVertical } from '@tabler/icons';

// constant
const icons = {
    IconRectangleVertical
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const profileCards = {
    id: 'profile-cards',
    title: 'Profile cards',
    type: 'group',
    children: [
        {
            id: 'cards',
            title: 'Cards',
            type: 'item',
            icon: icons.IconRectangleVertical,
            url: '/profile-cards/default',
            breadcrumbs: false
        }
    ]
};

export default profileCards;
