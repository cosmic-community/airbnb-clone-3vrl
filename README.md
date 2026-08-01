# Nestly

![App Preview](https://imgix.cosmicjs.com/b926c200-8d6e-11f1-864b-f99e7eefd4ec-autopilot-photo-1523531294919-4bcd7c65e216-1785564211735.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, Airbnb-style vacation rental marketplace built with Next.js and [Cosmic](https://www.cosmicjs.com).

## Features

- 🔍 Hero search area with destination search
- 🏷️ Category filter row with emoji icons
- 🏡 Responsive listing grid (featured image, location, property type, price, rating)
- 🖼️ Listing detail pages with image gallery, description, amenities, and specs
- 👤 Host profile cards with Superhost badge, member since, and response rate
- ⭐ Guest reviews with star ratings
- 📂 Category browse pages
- 🧑‍🤝‍🧑 Hosts directory and individual host pages listing their properties
- 📱 Fully mobile responsive design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a6d8bb28d34f1b6b9898bbc&clone_repository=6a6d8e0b8d34f1b6b9898c9c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: Create an Airbnb clone
>
> The user is rebuilding an existing website and provided these design notes: Style exactly like Airbnb. Factor these preferences into the content structure."

### Code Generation Prompt

> Build a Next.js application for an online business called "Airbnb Clone". The content is managed in Cosmic CMS with the following object types: categories, hosts, listings, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An Airbnb-style vacation rental marketplace site. Home page with a hero search area, category filter row (using Categories with emoji icons), and a responsive grid of listing cards showing featured image, location, property type, price per night, and average rating. Listing detail pages with an image gallery, full description, amenities list, bedrooms/beds/bathrooms/max guests specs, host profile card (photo, bio, superhost badge, member since, response rate), and guest reviews with star ratings. Category browse pages filtering listings by category. A hosts directory and host profile pages listing their properties. Clean modern design with rounded cards, soft shadows, and a coral accent color, fully mobile responsive.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic account with a bucket containing `categories`, `hosts`, `listings`, and `reviews` object types

### Installation

```bash
bun install
```

Create your environment variables (see Environment Variables section) then run:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all listings with connected category and host
const { objects: listings } = await cosmic.objects
  .find({ type: 'listings' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch listings for a specific category
const { objects: categoryListings } = await cosmic.objects
  .find({ type: 'listings', 'metadata.category': categoryId })
  .depth(1)

// Fetch reviews for a listing
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.listing': listingId })
```

## Cosmic CMS Integration

This app reads directly from your Cosmic bucket's content model:

- **categories** — `name`, `icon_emoji`, `description`
- **hosts** — `name`, `bio`, `profile_photo`, `member_since`, `is_superhost`, `response_rate`
- **listings** — `description`, `price_per_night`, `location`, `property_type`, `max_guests`, `bedrooms`, `beds`, `bathrooms`, `amenities`, `featured_image`, `gallery`, `category`, `host`, `is_featured`, `average_rating`
- **reviews** — `guest_name`, `rating`, `comment`, `review_date`, `listing`

Add or edit content in your [Cosmic dashboard](https://www.cosmicjs.com) and it will automatically appear in the app.

## Deployment Options

### Vercel
1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify
1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables in the Netlify dashboard
5. Deploy

Set these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->