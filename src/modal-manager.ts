import Modal from "./modal";
import type { Product } from "./api/types";

class ModalManager {
  private static instance: ModalManager;
  private currentModal: Modal | null = null;
  private currentProduct: Product | null = null;

  private constructor() {}

  static getInstance(): ModalManager {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager();
    }
    return ModalManager.instance;
  }

  /**
   * Gets or creates a modal for the given product
   */
  getModal(productId: string): Modal {
    // If we have a modal open for the same product, reuse it
    if (this.currentModal && this.currentProduct && this.currentProduct.id === productId) {
      return this.currentModal;
    }

    // Close existing modal if it's for a different product
    if (this.currentModal) {
      this.currentModal.close();
    }

    // Create new modal
    this.currentModal = new Modal("product-modal-detail");
    return this.currentModal;
  }

  /**
   * Sets the current product for the modal
   */
  setCurrentProduct(product: Product): void {
    this.currentProduct = product;
  }

  /**
   * Gets the current product
   */
  getCurrentProduct(): Product | null {
    return this.currentProduct;
  }

  /**
   * Closes the current modal and clears state
   */
  closeModal(): void {
    if (this.currentModal) {
      this.currentModal.close();
      this.currentModal = null;
      this.currentProduct = null;
    }
  }

  /**
   * Checks if a modal is currently open
   */
  isModalOpen(): boolean {
    return this.currentModal !== null && this.currentModal.getIsOpen();
  }

  /**
   * Gets the current modal instance
   */
  getCurrentModal(): Modal | null {
    return this.currentModal;
  }
}

export default ModalManager;
