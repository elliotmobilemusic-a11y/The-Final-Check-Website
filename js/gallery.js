/**
 * The Final Check Portfolio Gallery
 * Add your portfolio images here
 * Gallery will automatically render all items added to this array
 */

const galleryItems = [
  {
    src: "assets/images/hero-right.png",
    title: "Restaurant operational standards",
    category: "Consultancy Work",
    description: "Practical operational support delivered at senior level",
    alt: "Restaurant interior"
  },
  {
    src: "assets/images/hero-left.png",
    title: "Premium food presentation",
    category: "Menu Development",
    description: "Refined dishes built around quality ingredients",
    alt: "Plated fine dining dish"
  },
  {
    src: "assets/images/Jason-Wardill.jpg",
    title: "Kitchen leadership",
    category: "Kitchens",
    description: "Executive Chef experience across multiple award winning sites",
    alt: "Jason Wardill in professional kitchen"
  },
  {
    src: "assets/images/hero-right-2.png",
    title: "New venue opening",
    category: "New Openings",
    description: "Complete support from concept through to successful launch",
    alt: "New restaurant opening"
  },
  {
    src: "assets/images/hero-left-2.png",
    title: "Seasonal menu engineering",
    category: "Dishes",
    description: "Menu development focused on margin, quality and consistency",
    alt: "Seasonal restaurant dish presentation"
  },
  {
    src: "assets/images/hero-right-3.png",
    title: "Hospitality operations",
    category: "Consultancy Work",
    description: "Operational audits and performance improvement",
    alt: "Hospitality venue interior"
  }
];

/**
 * Gallery Render and Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initGalleryFilters();
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
        <div class="gallery-overlay">
          <div class="gallery-caption">
            <span class="gallery-category">${item.category}</span>
            <h3 class="gallery-title">${item.title}</h3>
            <p class="gallery-description">${item.description}</p>
          </div>
        </div>
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