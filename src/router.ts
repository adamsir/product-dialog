import Navigo, { type Match } from 'navigo';
import Modal from './modal';

const router = new Navigo('/', { strategy: 'ALL'});

router.on({
  '/': () => {
    console.log('Home');
  },
});

router.on({
  '/produkty/p/:slug': (match: Match) => {
    console.log('About', match);
    const productModalDetail = new Modal('product-modal-detail')
    productModalDetail.render('<h1>Product Modal Detail</h1>')
  },
});

router.resolve();