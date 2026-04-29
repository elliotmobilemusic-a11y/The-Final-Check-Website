/**
 * The Final Check Portfolio Gallery
 * Add your portfolio images here
 * Gallery will automatically render all items added to this array
 */

const galleryItems = [
  {
    src: "assets/images/portfolio/1F16E228-7923-4131-A5D2-CA2AD1C9B6FD.JPG",
    title: "Fine dining dish",
    category: "Dishes",
    description: "",
    alt: "Gourmet plated restaurant dish"
  },
  {
    src: "assets/images/portfolio/206E0BCD-91B3-449F-8346-17B04327F370.JPG",
    title: "Award winning food",
    category: "Menu Development",
    description: "",
    alt: "Pub food presentation"
  },
  {
    src: "assets/images/portfolio/325d096b-e2b4-4d47-b63c-0299443bee0b.jpg",
    title: "Kitchen work",
    category: "Kitchens",
    description: "",
    alt: "Commercial kitchen"
  },
  {
    src: "assets/images/portfolio/6157DB36-EF5B-4086-AB87-E65B01E818B5.JPG",
    title: "Seasonal dish",
    category: "Dishes",
    description: "",
    alt: "Restaurant dish"
  },
  {
    src: "assets/images/portfolio/DF01AD4F-FCBB-4488-A7FD-859BFC7BE411.JPG",
    title: "Kitchen operations",
    category: "Kitchens",
    description: "",
    alt: "Professional kitchen"
  },
  {
    src: "assets/images/portfolio/IMG_0302.JPG",
    title: "New opening",
    category: "New Openings",
    description: "",
    alt: "New venue opening"
  },
  {
    src: "assets/images/portfolio/IMG_4774.JPG",
    title: "Fine dining",
    category: "Menu Development",
    description: "",
    alt: "Fine dining presentation"
  },
  {
    src: "assets/images/portfolio/IMG_8464.JPG",
    title: "Seasonal dining",
    category: "Dishes",
    description: "",
    alt: "Seasonal restaurant dish"
  },
  {
    src: "assets/images/portfolio/IMG_8843.HEIC",
    title: "Hospitality work",
    category: "Consultancy Work",
    description: "",
    alt: "Hospitality venue"
  }
];

/**
 * Gallery Render and Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initLightbox();
});

function renderGallery() {
  const galleryContainer = document.getElementById('portfolio-gallery');
  if (!galleryContainer) return;

  const galleryGrid = document.createElement('div');
  galleryGrid.className = 'gallery-grid';

  galleryItems.forEach((item, index) => {
    const galleryCard = document.createElement('div');
    galleryCard.className = `gallery-card`;
    galleryCard.dataset.category = item.category;
    galleryCard.dataset.index = index;

    galleryCard.innerHTML = `
      <div class="gallery-image-wrapper">
        <img 
          src="${item.src}" 
          alt="${item.alt}"
          loading="lazy"
          decoding="async"
          class="gallery-image"
          width="600"
          height="400"
        >
        <div class="gallery-overlay"></div>
      </div>
    `;

    galleryCard.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(galleryCard);
  });

  galleryContainer.appendChild(galleryGrid);
}

function initGalleryFilters() {
  const filterContainer = document.getElementById('gallery-filters');
  if (!filterContainer) return;

  // Get unique categories
  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];

  categories.forEach(category => {
    const filterButton = document.createElement('button');
    filterButton.className = `gallery-filter-btn ${category === 'All' ? 'active' : ''}`;
    filterButton.textContent = category;

    filterButton.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.gallery-filter-btn').forEach(btn => btn.classList.remove('active'));
      filterButton.classList.add('active');

      // Filter items
      document.querySelectorAll('.gallery-card').forEach(card => {
        card.style.display = category === 'All' || card.dataset.category === category 
          ? 'block' 
          : 'none';
      });
    });

    filterContainer.appendChild(filterButton);
  });
}

function initLightbox() {
  // Create lightbox container
  const lightbox = document.createElement('div');
  lightbox.id = 'gallery-lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <img src="" alt="" class="lightbox-image">
      <div class="lightbox-caption">
        <span class="lightbox-category"></span>
        <h3 class="lightbox-title"></h3>
        <p class="lightbox-description"></p>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Close events
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(index) {
  const item = galleryItems[index];
  const lightbox = document.getElementById('gallery-lightbox');
  
  lightbox.querySelector('.lightbox-image').src = item.src;
  lightbox.querySelector('.lightbox-image').alt = item.alt;
  lightbox.querySelector('.lightbox-category').textContent = item.category;
  lightbox.querySelector('.lightbox-title').textContent = item.title;
  lightbox.querySelector('.lightbox-description').textContent = item.description;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}