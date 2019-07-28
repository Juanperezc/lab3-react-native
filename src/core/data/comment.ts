import { Comment } from '@src/core/model';
import {
  profile1,
  profile2,
  profile3,
  profile4,
} from './profile';

export const comments: Comment[] = [
  {
    author: profile1,
    text: 'Me encantan las ofertas de verano',
    likesCount: 245,
    date: 'Hoy 11:35 pm',
    comments: [
      {
        author: profile2,
        text: 'Gracias',
        likesCount: 1,
        date: 'Hoy 15:35 pm',
        comments: [],
      },
    ],
  },
  {
    author: profile3,
    text: 'Surtimos nuestras oficinas gracias a ustedes!',
    likesCount: 10,
    date: 'Hoy 10:36 pm',
    comments: [],
  },
/*   {
    author: profile4,
    text: 'This is very useful information for me. Thanks for your article!',
    likesCount: 2,
    date: 'Hoy 02:11 pm',
    comments: [],
  }, */
];
