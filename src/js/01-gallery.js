import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

// Create and render gallery items
const createGalleryItem = ({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}" data-original-img=${original}>
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
  </li>
`;

galleryList.innerHTML = galleryItems.map(createGalleryItem).join("");

// Store instances in an array
const instances = [];

// Show corresponding instance when image is clicked
galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  const original = event.target
    .closest(".gallery__link")
    .getAttribute("data-original-img");
  const instance = basicLightbox.create(`
    <img src="${original}" width="800" height="600">
  `);
  instances.push(instance); // Add instance to array
  instance.show();
  document.addEventListener("keydown", onEscPress);
});

// Close instance on Esc key press
const onEscPress = (event) => {
  const ESC_KEYCODE = "Escape";
  if (event.code === ESC_KEYCODE) {
    instances[0].close();
    instances.length = 0; // Remove instance from array
    document.removeEventListener("keydown",
      onEscPress
    );
  }
};