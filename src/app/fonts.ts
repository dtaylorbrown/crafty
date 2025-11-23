import { Bebas_Neue, Open_Sans } from 'next/font/google';

// Base 
export const base = Open_Sans({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-base',
  display: 'swap'
});

// Title
export const title = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-title',
  display: 'swap',
})