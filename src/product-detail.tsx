import type { Product } from "./api/types";

type ActiveTab = 'detail' | 'relatedProducts';

function ProductDetail(props: { product: Product, activeTab: ActiveTab }) {
  let activeTab = props.activeTab ?? 'detail';

  const tab = document.querySelectorAll('.product-detail__tabs .product-tab-box') as NodeListOf<HTMLDivElement>;

  tab.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      activeTab = tab.getAttribute('data-tab') ?? 'detail';
    });
  });
  
  
  /* tab.addEventListener('click', (event) => {
    activeTab = tab.getAttribute('data-tab') ?? 'detail';
  }); */
  
  /* const relatedProducts = props.product.relatedProducts?.map(product => `
    <div class="product-related-product">
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>${product.price} ${product.currency}</p>
    </div>
  `); */

  return `
  <div class="product-detail">
    <div class="product-detail__image">
      <img src="${props.product.image}" alt="${props.product.name}" />
    </div>
    <div class="product-detail__info">
      <h1>${props.product.name}</h1>
      <p>${props.product.price} ${props.product.currency}</p>
    </div>
  </div>
  <div class="product-tabs product-detail__tabs">
    <div class="product-tab-box ${activeTab === 'detail' ? 'active' : ''}" data-tab="detail">
      <a href="/produkty/p/${props.product.id}" data-navigo>
        Popis
      </a>
    </div>
    <div class="product-tab-box ${activeTab === 'relatedProducts' ? 'active' : ''}" data-tab="relatedProducts">
      <a href="/produkty/p/${props.product.id}/related" data-navigo>
        Podobné produkty
      </a>
    </div>
  </div>
  <div class="product-detail__content">
    ${activeTab === 'detail' ? `
      <p>${props.product.description}</p>
    ` : `
      <div class="product-related-products">
        tvoje mama
      </div>
    `}
  </div>
  `;
}

export default ProductDetail;
