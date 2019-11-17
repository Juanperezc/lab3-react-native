import {
  imageArticleList2Layout,
  imageForgotPasswordLayout,
  imageSignIn1Layout,
  imageSignUp1Layout,
} from '@src/assets/images';
import { AuthContainerData } from './type';

export const routes: AuthContainerData[] = [
  {
    title: 'Sign In',
    description: 'Option 1',
    image: imageSignIn1Layout.imageSource,
    route: 'Sign In 1',
  },
  {
    title: 'Sign Up',
    description: 'Option 1',
    image: imageSignUp1Layout.imageSource,
    route: 'Sign Up 1',
  },
  {
    title: 'Forgot Password',
    description: 'Option 1',
    image: imageForgotPasswordLayout.imageSource,
    route: 'Forgot Password',
  },
];
