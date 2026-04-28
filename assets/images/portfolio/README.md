# The Final Check Portfolio Gallery Images

## Folder Location
`assets/images/portfolio/`

This is where you add all portfolio images for the gallery.

---

## Recommended Image Specifications

| Property | Recommendation |
|----------|----------------|
| Format | WebP preferred, JPG acceptable |
| Width | 1200px - 1600px |
| Aspect Ratio | Any (masonry layout handles all ratios) |
| Quality | 80-85% compression |
| File Size | < 500KB ideally |

---

## File Naming Convention

Use clear, consistent naming:
```
dish-01.jpg
dish-02.jpg
kitchen-01.jpg
opening-01.jpg
menu-development-01.jpg
consultancy-01.jpg
```

✅ Good: `seasonal-dish-provenance-inns.jpg`
❌ Bad: `IMG1234_final_edited_v3.jpg`

---

## Adding New Images To The Gallery

1. Upload your image file to this folder
2. Open `/js/gallery.js`
3. Add a new item to the `galleryItems` array:

```javascript
{
  src: "assets/images/portfolio/your-image.jpg",
  title: "Image title here",
  category: "Category Name",
  description: "Short 1 line description",
  alt: "Accessibility alt text"
}
```

4. Save the file. The gallery will automatically include the new image.

---

## Available Categories

- Dishes
- Menu Development
- New Openings
- Kitchens
- Consultancy Work

You can add new categories at any time, they will automatically appear in the filter options.

---

## Gallery File Location

The gallery is rendered on the **About page** (`/about.html`) after the About Jason section.