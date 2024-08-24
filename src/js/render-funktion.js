export const createGalleryCardTemplate = imgInfo => {
  return `
  <li class="gallery-card">
    <a href="${imgInfo.largeImageURL}">
      <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
    </a>
    <p>likes ${imgInfo.likes}</p>
    <p>views ${imgInfo.views}</p>
    <p>comments ${imgInfo.comments}</p>
    <p>downloads ${imgInfo.downloads}</p>
  </li>
  `;
};
