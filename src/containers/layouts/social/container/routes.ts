import {
  imageArticleList2Layout,
  imageFeed1Layout,
  imageFeed2Layout,
  imageProfile1Layout,
  imageProfileSettings1Layout,
  imageSettingsLayout,
} from '@src/assets/images';
import { SocialContainerData } from './type';

export const routes: SocialContainerData[] = [
  {
    title: 'Perfil',
    description: 'Option 1',
    image: imageProfile1Layout.imageSource,
    route: 'Profile 1',
  },
  {
    title: 'Ajuste Perfil',
    description: 'Option 1',
    image: imageProfileSettings1Layout.imageSource,
    route: 'Ajuste Perfil',
    /* route: 'Profile Settings 1', */
  },
  {
    title: 'Feed',
    description: 'Option 1',
    image: imageFeed1Layout.imageSource,
    route: 'Feed 1',
  },
  {
    title: 'Feed',
    description: 'Option 2',
    image: imageFeed2Layout.imageSource,
    route: 'Feed 2',
  },
  {
    title: 'Settings',
    description: 'Option 1',
    image: imageSettingsLayout.imageSource,
    route: 'Settings',
  },
];
