import type { Product } from "./api/types";

function ProductDetail(props: { product: Product }) {
  return `
  <div class="product-detail">
    <div class="product-detail__image">
      <img src="${props.product.image}" alt="${props.product.name}" />
    </div>
    <div class="product-detail__info">
      <h1>${props.product.name} x x</h1>
      <p>${props.product.description}</p>
      <p>${props.product.price} ${props.product.currency}</p>
    </div>
  </div>
  `;
}

export default ProductDetail;
