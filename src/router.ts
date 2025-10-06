import Navigo, { type Match } from "navigo";
import ModalManager from "./modal-manager";
import getProduct from "./api/functions/getProduct";
import ProductDetail from "./product-detail";

const router = new Navigo("/", { strategy: "ALL" });
const modalManager = ModalManager.getInstance();

// Helper function to handle product modal display
async function handleProductModal(id: string, activeTab: 'detail' | 'relatedProducts') {
  if (!id) {
    return;
  }

  // Check if we already have a modal open for this product
  const currentProduct = modalManager.getCurrentProduct();
  if (currentProduct && currentProduct.id === id && modalManager.isModalOpen()) {
    // Just switch the tab
    const modal = modalManager.getCurrentModal();
    if (modal) {
      modal.render(ProductDetail({ product: currentProduct, activeTab }));
    }
    return;
  }

  // Get or create modal
  const productModalDetail = modalManager.getModal(id);

  // Handle modal close by navigating back to home
  productModalDetail.onClose(() => {
    modalManager.closeModal();
    router.navigate("/");
  });

  productModalDetail.render('<div class="modal__loader"></div>');
  const product = await getProduct(id);
  console.log(product);

  if (product) {
    modalManager.setCurrentProduct(product);
    productModalDetail.render(ProductDetail({ product, activeTab }));
  } else {
    productModalDetail.render("<h1>Produkt nebyl nalezen</h1>");
  }
}

router.on({
  "/produkty/p/:id": async (match: Match) => {
    const { id } = match.data || {};
    await handleProductModal(id, 'detail');
  },
});

router.on({
  "/produkty/p/:id/related": async (match: Match) => {
    const { id } = match.data || {};
    await handleProductModal(id, 'relatedProducts');
  },
});

router.resolve();
