import localFont from 'next/font/local'

export const Garnett = localFont({
  src: [
    {
      path: '../public/fonts/garnett-light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/garnett-regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/garnett-medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/garnett-semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/garnett-bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/garnett-black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-garnett',
})

export const UniversalSans = localFont({
  src: [
    {
      path: '../public/fonts/universal-sans-500.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/universal-sans-600.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/universal-sans-850.ttf',
      weight: '850',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-universal',
})