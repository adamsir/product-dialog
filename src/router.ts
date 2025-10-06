import Navigo, { type Match } from "navigo";
import Modal from "./modal";
import getProduct from "./api/functions/getProduct";
import ProductDetail from "./product-detail";

const router = new Navigo("/", { strategy: "ALL" });

router.on({
  "/produkty/p/:id": async (match: Match) => {
    const { id } = match.data || {};
    if (!id) {
      return;
    }

    const productModalDetail = new Modal("product-modal-detail");

    // Handle modal close by navigating back to home
    productModalDetail.onClose(() => {
      router.navigate("/");
    });

    productModalDetail.render('<div class="modal__loader"></div>');
    const product = await getProduct(id);
    console.log(product);

    if (product) {
      productModalDetail.render(ProductDetail({ product }));
    } else {
      productModalDetail.render("<h1>Produkt nebyl nalezen</h1>");
    }
  },
});

router.resolve();
