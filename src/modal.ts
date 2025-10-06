const getBaseTemplate = (innerHTML: string | undefined) => {
  const wrapper = document.createElement("div");

  wrapper.className = "modal__content";

  if (innerHTML) {
    wrapper.innerHTML = innerHTML;
  }
  return wrapper;
};

class Modal {
  private id: string;
  private content: Node;

  constructor(id: string) {
    this.id = id;
    this.content = getBaseTemplate(undefined);
  }

  render(innerHTML: string) {
    this.content = getBaseTemplate(innerHTML);
    this.dangerouslySetInnerHTML();
  }

  private dangerouslySetInnerHTML() {
    const wrapper = document.createElement("div");
    const backdrop = document.createElement("div");

    backdrop.className = "modal__backdrop";
    wrapper.setAttribute("id", this.id);
    wrapper.className = "modal";

    wrapper.appendChild(this.content);
    wrapper.appendChild(backdrop);

    document.body.appendChild(wrapper);
  }
}

export default Modal;
