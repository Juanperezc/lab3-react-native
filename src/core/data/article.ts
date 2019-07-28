import { Article } from '@src/core/model';
import {
  profile2,
  profile3,
  profile4,
  profile5,
} from './profile';
import { comments } from './comment';
import {
  imageArticle1Bg,
  imageArticle3Bg,
  imageArticle2Bg,
  imageArticle4Bg,
} from '@src/assets/images';

/* tslint:disable */

export const articles: Article[] = [
  {
    image: imageArticle1Bg,
    title: 'Tu paquete esta a la vuelta de la esquina!',
    description: 'Asegura tu compra aprovechando las ofertas de verano',
    content: 'Prime Day 2019 contará con más de un millón de ofertas en todo el mundo y los clientes Prime de Amazon podrán encontrar algunas de las mayores ofertas de Prime Day de la historia en dispositivos Amazon, entre muchas otras No te pierdas los lanzamientos de miles de productos y ofertas. Prueba Amazon Prime: 30 días gratis. Y si quieres estar a la última y recibir las ofertas de Prime Day directamente en tu correo, suscríbete ahora a nuestro boletín de ofertas.',
    author: profile2,
    date: 'Hoy 12:35 pm',
    tips: 10,
    comments: comments,
    likes: 320,
  },
  {
    image: imageArticle2Bg,
    title: 'Que nada te detenga! Mantén tu negocio operativo',
    description: 'Lleva tu generador electrico por solo 360$',
    content: 'There\'s a lot of advice out there on how to eat healthy, and if we\'re being honest, it can sometimes feel like too much to think about. Especially when you\'re hungry. Remember when you were a kid and eating was as simple as open, chew, enjoy? Yes, those were simpler times. Now, knowing how to eat healthy doesn\'t seem quite as straightforward. Between the diet fads, gourmet trends, and a rotating roster of superfoods, eating well has gotten, well, complicated.',
    author: profile3,
    date: 'Hoy 12:35 pm',
    tips: 10,
    comments: [],
    likes: 320,
  },
/*   {
    image: imageArticle3Bg,
    title: 'The 5 Rules Of Morning Workouts',
    description: 'This one has to do more with habit than anything. You create the expectation...',
    content: 'There\'s a lot of advice out there on how to eat healthy, and if we\'re being honest, it can sometimes feel like too much to think about. Especially when you\'re hungry. Remember when you were a kid and eating was as simple as open, chew, enjoy? Yes, those were simpler times. Now, knowing how to eat healthy doesn\'t seem quite as straightforward. Between the diet fads, gourmet trends, and a rotating roster of superfoods, eating well has gotten, well, complicated.',
    author: profile4,
    date: 'Hoy 11:10 am',
    tips: 5,
    comments: [comments[0], comments[1]],
    likes: 245,
  }, */
/*   {
    image: imageArticle4Bg,
    title: 'Light & Easy Breakfasts',
    description: 'This one has to do more with habit than anything. You create the expectation...',
    content: 'There\'s a lot of advice out there on how to eat healthy, and if we\'re being honest, it can sometimes feel like too much to think about. Especially when you\'re hungry. Remember when you were a kid and eating was as simple as open, chew, enjoy? Yes, those were simpler times. Now, knowing how to eat healthy doesn\'t seem quite as straightforward. Between the diet fads, gourmet trends, and a rotating roster of superfoods, eating well has gotten, well, complicated.',
    author: profile5,
    date: 'Hoy 11:10 am',
    tips: 5,
    comments: [comments[1], comments[2]],
    likes: 125,
  }, */
];
