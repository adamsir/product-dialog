import type { Product } from "../../api/types";

type ActiveTab = 'detail' | 'relatedProducts';

function ProductDetail(props: { product: Product, activeTab: ActiveTab }) {
  const activeTab = props.activeTab ?? 'detail';

  // Function to handle tab switching
  const handleTabSwitch = (newTab: ActiveTab) => {
    // Update URL without page reload
    const newUrl = newTab === 'detail' 
      ? `/produkty/p/${props.product.id}` 
      : `/produkty/p/${props.product.id}/related`;
    
    // Use history API to update URL
    window.history.pushState({}, '', newUrl);
    
    // Re-render the component with the new tab
    const modalContent = document.querySelector('.modal__content');
    if (modalContent) {
      modalContent.innerHTML = ProductDetail({ product: props.product, activeTab: newTab });
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
