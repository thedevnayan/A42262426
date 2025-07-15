# 📸 How to Add Her Photos to the Carousel

## 🎯 **Step-by-Step Guide:**

### 1. **Prepare Your Photos**
- Save her photos in the same folder as your HTML file
- Recommended format: JPG or PNG
- Recommended size: 400x500 pixels or similar ratio
- Name them something like: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`

### 2. **Replace the Placeholder Images**

In `index.html`, find the carousel section and replace the placeholder URLs:

```html
<!-- Replace these placeholder URLs with your actual photo files -->

<!-- Photo 1 -->
<img src="photo1.jpg" alt="Your Beautiful Photo" class="carousel-image">

<!-- Photo 2 -->
<img src="photo2.jpg" alt="Your Beautiful Photo" class="carousel-image">

<!-- Photo 3 -->
<img src="photo3.jpg" alt="Your Beautiful Photo" class="carousel-image">
```

### 3. **Customize the Captions**

Change the romantic captions under each photo:

```html
<!-- Photo 1 Caption -->
<div class="photo-caption">Every time I see this photo, my heart skips a beat 💕</div>

<!-- Photo 2 Caption -->
<div class="photo-caption">Your smile lights up my entire world ✨</div>

<!-- Photo 3 Caption -->
<div class="photo-caption">I can't stop looking at your beautiful eyes 👀</div>
```

### 4. **Add More Photos (Optional)**

To add more photos, copy this structure for each additional photo:

```html
<div class="carousel-slide">
    <div class="photo-frame">
        <img src="photo4.jpg" alt="Your Beautiful Photo" class="carousel-image">
        <div class="photo-caption">Your caption here 💖</div>
    </div>
</div>
```

And add a corresponding dot:

```html
<span class="dot" onclick="currentSlide(4)"></span>
```

### 5. **Photo Tips for Maximum Impact**

- **Choose her best photos** - ones where she looks happy and beautiful
- **Mix different styles** - casual, formal, candid shots
- **Include photos you took together** - if you have any
- **Add romantic captions** - make them personal and heartfelt
- **Keep file sizes reasonable** - under 1MB each for fast loading

### 6. **Example Personal Captions**

```html
<!-- Some romantic caption ideas -->
<div class="photo-caption">The day I first realized I was falling for you 💕</div>
<div class="photo-caption">Your laugh is the most beautiful sound I've ever heard ✨</div>
<div class="photo-caption">I could look at this photo forever 👀</div>
<div class="photo-caption">You make every moment magical 💖</div>
<div class="photo-caption">My favorite person in the world 🌍</div>
```

### 7. **File Structure Example**

Your folder should look like this:
```
your-folder/
├── index.html
├── style.css
├── script.js
├── photo1.jpg
├── photo2.jpg
├── photo3.jpg
└── README.md
```

## 🎨 **Carousel Features:**

- **Auto-slide**: Photos change automatically every 4 seconds
- **Manual navigation**: Click arrows or dots to navigate
- **Smooth transitions**: Beautiful fade effects between photos
- **Hover effects**: Photos slightly zoom when hovered
- **Responsive design**: Works on all devices
- **Romantic captions**: Personal messages under each photo

## 💡 **Pro Tips:**

1. **Test first**: Make sure all photos load properly
2. **Keep it personal**: Use photos that mean something to both of you
3. **Quality matters**: Use clear, high-quality photos
4. **Be genuine**: Write captions from your heart
5. **Don't overdo it**: 3-5 photos is perfect

## 🚀 **Ready to Impress!**

Once you've added her photos and personalized the captions, the carousel will create a beautiful, romantic moment that shows how much you care about her and notice her beauty in every photo.

**Good luck! 💕** 