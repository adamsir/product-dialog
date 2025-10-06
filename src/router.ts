import Navigo from 'navigo';

const router = new Navigo('/', { strategy: 'ALL'});

router.on({
  '/': () => {
    console.log('Home');
  },
});

router.on({
  '/about': () => {
    console.log('About');
  },
});

router.resolve();