class Modal {
  private id: string;
  private wrapper: HTMLElement | null;
  private content: HTMLElement;
  private contentWrapper: HTMLElement;
  private backdrop: HTMLElement;
  private closeButton: HTMLElement;
  private isOpen: boolean;
  private closeCallbacks: Array<() => void>;

  constructor(id: string) {
    this.id = id;
    this.wrapper = null;
    this.isOpen = false;
    this.closeCallbacks = [];

    // Create elements but don't add to DOM yet
    this.content = document.createElement("div");
    this.content.className = "modal__content";
    this.contentWrapper = document.createElement("div");
    this.contentWrapper.className = "modal__content-wrapper";
    this.backdrop = document.createElement("div");
    this.backdrop.className = "modal__backdrop";
    this.backdrop.addEventListener("click", () => this.close());

    this.closeButton = document.createElement("div");
    this.closeButton.className = "modal__close";
    this.closeButton.addEventListener("click", () => this.close());

    // Auto-open the modal on instantiation
    this.open();
  }

  /**
   * Opens the modal and adds it to the DOM
   */
  open(): void {
    if (this.isOpen) return;

    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("id", this.id);
    this.wrapper.className = "modal";

    this.wrapper.appendChild(this.backdrop);
    this.wrapper.appendChild(this.contentWrapper);

    this.contentWrapper.appendChild(this.content);
    this.contentWrapper.appendChild(this.closeButton);

    document.body.appendChild(this.wrapper);
    this.isOpen = true;
    this.setBodyScroll(true);
  }

  /**
   * Closes the modal and removes it from the DOM
   */
  close(): void {
    if (!this.isOpen || !this.wrapper) return;

    this.wrapper.remove();
    this.wrapper = null;
    this.isOpen = false;

    // Execute all registered close callbacks
    this.closeCallbacks.forEach((callback) => callback());
    this.setBodyScroll(false);
  }

  /**
   * Renders HTML content into the modal
   */
  render(innerHTML: string): void {
    this.content.innerHTML = innerHTML;
  }

  /**
   * Registers a callback to be executed when the modal closes
   */
  onClose(callback: () => void): void {
    this.closeCallbacks.push(callback);
  }

  /**
   * Returns whether the modal is currently open
   */
  getIsOpen(): boolean {
    return this.isOpen;
  }

  /**
   * Set body scroll
   */
  setBodyScroll(scroll: boolean): void {
    document.body.style.overflow = scroll ? "hidden" : "auto";
  }
}

export default Modal;
