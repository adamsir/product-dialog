import {getProducts} from "../../api/functions/getProduct";
import type { Product } from "../../api/types";
import { router } from "../../router";

type ActiveTab = 'detail' | 'relatedProducts';

function RelatedProducts(props: { products: Product[] }) {
  const { products } = props;
  if (!products) {
    return null;
  }

  const renderProductCard = (product: Product) => {
    return `
      <a class="product-card" href="/produkty/p/${product.id}" data-navigo>
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-card__content">
          <h3 class="product-card__title">${product.name}</h3>
          <p>${product.price} ${product.currency}</p>
        </div>
      </a>
    `;
  }

  return `
    <div class="product-related-products">
      ${products.map(renderProductCard).join('')}
    </div>
  `;
}

function ProductDetail(props: { product: Product, relatedProducts: Product[], activeTab: ActiveTab }) {
  const { product, relatedProducts } = props;
  const activeTab = props.activeTab ?? 'detail';

  // Function to handle tab switching
  const handleTabSwitch = async (newTab: ActiveTab) => {
    // Update URL without page reload
    const newUrl = newTab === 'detail' 
      ? `/produkty/p/${product.id}` 
      : `/produkty/p/${product.id}/related`;
    
    // Use router to update URL
    router.navigate(newUrl)
    
    // Re-render the component with the new tab
    const modalContent = document.querySelector('.modal__content');
    if (modalContent) {
      modalContent.innerHTML = ProductDetail({ product, relatedProducts, activeTab: newTab });
    }
  };

  // Add event listeners after the DOM is rendered
  setTimeout(() => {
    const tabs = document.querySelectorAll('.product-detail__tabs .product-tab-box') as NodeListOf<HTMLDivElement>;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        const tabType = tab.getAttribute('data-tab') as ActiveTab;
        if (tabType && tabType !== activeTab) {
          handleTabSwitch(tabType);
        }
      });
    });
  }, 0);

  return `
  <div class="product-detail">
    <div class="product-detail__image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-detail__info">
      <h1>${product.name}</h1>
      <p>${product.price} ${product.currency}</p>
    </div>
  </div>
  <div class="product-tabs product-detail__tabs">
    <div class="product-tab-box ${activeTab === 'detail' ? 'active' : ''}" data-tab="detail">
      <a href="/produkty/p/${product.id}" data-navigo>
        Popis
      </a>
    </div>
    <div class="product-tab-box ${activeTab === 'relatedProducts' ? 'active' : ''}" data-tab="relatedProducts">
      <a href="/produkty/p/${product.id}/related" data-navigo>
        Podobné produkty
      </a>
    </div>
  </div>
  <div class="product-detail__content">
    ${activeTab === 'detail' ? `
      <p>${product.description}</p>
    ` : `
      <div class="product-related-products">
        ${RelatedProducts({ products: relatedProducts })}
      </div>
    `}
  </div>
  `;
}

export default ProductDetail;
