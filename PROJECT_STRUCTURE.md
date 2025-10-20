# GDG-DIT Website - Complete Project Structure Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Component Organization](#component-organization)
5. [Data Management](#data-management)
6. [Utilities & Helpers](#utilities--helpers)
7. [Styling Guidelines](#styling-guidelines)
8. [Adding New Features](#adding-new-features)
9. [Best Practices](#best-practices)
10. [Import Conventions](#import-conventions)

---

## 📖 Project Overview

**Project Name:** GDG-DIT Website  
**Description:** Official website for Google Developer Groups - Dr DY Patil Institute of Technology Pimpri
**Framework:** Next.js 15.5.5 (App Router)  
**UI Library:** React 19.1.0  
**Styling:** Tailwind CSS 4.0.0  

### Purpose
A modern, responsive website to showcase GDG-DIT's community activities, events, team members, blog posts, and provide contact information.

---

## 🛠️ Technology Stack

### Core Technologies
- **Next.js 15.5.5** - React framework with App Router
- **React 19.1.0** - UI library
- **Tailwind CSS 4.0.0** - Utility-first CSS framework
- **JavaScript/JSX** - Programming language

### Fonts
- **Geist Sans** - Primary font
- **Geist Mono** - Monospace font for code

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

---

## 📁 Folder Structure

```
gdg-dit/
│
├── app/                          # Next.js App Router (Pages)
│   ├── layout.jsx               # Root layout (Navbar, Footer, fonts)
│   ├── page.jsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── favicon.ico              # Site favicon
│   │
│   ├── blog/                    # Blog section
│   │   ├── page.jsx            # Blog listing page
│   │   └── [slug]/             # Dynamic blog post pages
│   │       └── page.jsx        # Individual blog post
│   │
│   ├── events/                  # Events section
│   │   └── page.jsx            # Events listing page
│   │
│   ├── team/                    # Team section
│   │   └── page.jsx            # Team members page
│   │
│   ├── contact/                 # Contact section
│   │   └── page.jsx            # Contact form page
│   │
│   ├── join/                    # Join community section
│   │   └── page.jsx            # Join/membership page
│   │
│   └── code-of-conduct/         # Code of Conduct
│       └── page.jsx            # Community guidelines
│
├── components/                   # Reusable React Components
│   ├── .gitkeep                 # Git tracking
│   │
│   ├── common/                  # Shared components
│   │   ├── .gitkeep
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Footer
│   │   ├── Button.jsx          # Reusable button
│   │   ├── Card.jsx            # Card wrapper
│   │   ├── SectionTitle.jsx    # Section heading
│   │   ├── ScrollToTop.jsx     # Scroll to top button
│   │   └── SEO.jsx             # SEO metadata component
│   │
│   ├── home/                    # Homepage components
│   │   ├── .gitkeep
│   │   ├── HeroSection.jsx     # Hero banner
│   │   ├── WhatWeDo.jsx        # Mission section
│   │   ├── UpcomingEvents.jsx  # Featured events
│   │   ├── DomainsGrid.jsx     # Tech domains grid
│   │   ├── StatsCounter.jsx    # Animated statistics
│   │   └── Gallery.jsx         # Photo gallery
│   │
│   ├── events/                  # Event components
│   │   ├── .gitkeep
│   │   ├── EventCard.jsx       # Single event card
│   │   └── EventList.jsx       # Events grid
│   │
│   ├── team/                    # Team components
│   │   ├── .gitkeep
│   │   └── TeamCard.jsx        # Team member card
│   │
│   ├── blog/                    # Blog components
│   │   ├── .gitkeep
│   │   ├── BlogCard.jsx        # Single blog card
│   │   ├── BlogGrid.jsx        # Blog posts grid
│   │   └── SearchBar.jsx       # Search input
│   │
│   └── contact/                 # Contact components
│       ├── .gitkeep
│       ├── ContactForm.jsx     # Contact form
│       └── SponsorUs.jsx       # Sponsorship CTA
│
├── data/                        # JSON Data Files
│   ├── .gitkeep
│   ├── events.json             # Events data
│   ├── team.json               # Team members data
│   ├── blogs.json              # Blog posts data
│   ├── domains.json            # Tech domains data
│   └── stats.json              # Community statistics
│
├── utils/                       # Utility Functions
│   ├── .gitkeep
│   ├── formatDate.js           # Date formatting helpers
│   ├── scrollToSection.js      # Smooth scroll functions
│   ├── constants.js            # App constants
│   └── seoMeta.js              # SEO metadata generator
│
├── hooks/                       # Custom React Hooks (Future)
│   └── .gitkeep
│
├── styles/                      # Additional Styles (Future)
│   └── .gitkeep
│
├── public/                      # Static Assets
│   ├── images/                 # Image files
│   │   └── .gitkeep
│   └── docs/                   # Document files
│       └── .gitkeep
│
├── package.json                 # Dependencies
├── next.config.mjs             # Next.js configuration
├── tailwind.config.mjs         # Tailwind configuration
├── postcss.config.mjs          # PostCSS configuration
├── eslint.config.mjs           # ESLint configuration
├── jsconfig.json               # JavaScript configuration
├── README.md                   # Project documentation
├── PROJECT_STRUCTURE.md        # This file
├── RESTRUCTURING_COMPLETE.md   # Restructuring documentation
├── QUICKSTART.md               # Quick start guide
└── .gitignore                  # Git ignore rules
```

---

## 🧩 Component Organization

### Principles
1. **Separation by Feature** - Components organized by page/feature
2. **Reusability** - Common components shared across pages
3. **Single Responsibility** - Each component has one clear purpose
4. **Composition** - Build complex UIs from simple components

### Component Categories

#### 1. Common Components (`components/common/`)
**Purpose:** Shared UI elements used across multiple pages

| Component | Description | Used In |
|-----------|-------------|---------|
| `Navbar.jsx` | Navigation bar with mobile menu | All pages (layout) |
| `Footer.jsx` | Footer with social links | All pages (layout) |
| `Button.jsx` | Reusable button with variants | Multiple components |
| `Card.jsx` | Card wrapper with hover effects | Events, Team, Blog |
| `SectionTitle.jsx` | Consistent section headings | All pages |
| `ScrollToTop.jsx` | Floating scroll button | All pages (layout) |
| `SEO.jsx` | SEO metadata component | Future use |

#### 2. Home Components (`components/home/`)
**Purpose:** Homepage-specific sections

| Component | Description | Data Source |
|-----------|-------------|-------------|
| `HeroSection.jsx` | Main hero banner with CTAs | Hardcoded |
| `WhatWeDo.jsx` | Mission statement | Hardcoded |
| `UpcomingEvents.jsx` | Featured events preview | `data/events.json` |
| `DomainsGrid.jsx` | Tech domains showcase | `data/domains.json` |
| `StatsCounter.jsx` | Animated statistics | `data/stats.json` |
| `Gallery.jsx` | Photo gallery | Hardcoded |

#### 3. Events Components (`components/events/`)
**Purpose:** Event display and management

| Component | Description | Props |
|-----------|-------------|-------|
| `EventCard.jsx` | Single event card | `event` object |
| `EventList.jsx` | Grid of events | `events` array |

#### 4. Team Components (`components/team/`)
**Purpose:** Team member display

| Component | Description | Props |
|-----------|-------------|-------|
| `TeamCard.jsx` | Team member card with social links | `member` object |

#### 5. Blog Components (`components/blog/`)
**Purpose:** Blog functionality

| Component | Description | Props |
|-----------|-------------|-------|
| `BlogCard.jsx` | Single blog post card | `post` object |
| `BlogGrid.jsx` | Grid of blog posts | `posts` array |
| `SearchBar.jsx` | Search input field | `value`, `onChange` |

#### 6. Contact Components (`components/contact/`)
**Purpose:** Contact and sponsorship

| Component | Description | State |
|-----------|-------------|-------|
| `ContactForm.jsx` | Contact form with validation | Client component |
| `SponsorUs.jsx` | Sponsorship CTA section | Static |

---

## 📊 Data Management

### Data Files Location
All data is stored in JSON files in the `data/` directory for easy content management without code changes.

### 1. Events Data (`data/events.json`)
```json
{
  "upcomingEvents": [
    {
      "id": 1,
      "title": "Event Title",
      "date": "March 15, 2024",
      "time": "2:00 PM - 4:00 PM",
      "venue": "Location",
      "type": "Workshop | Bootcamp | Seminar | Hackathon",
      "domain": "Android | Cloud | Web | AI/ML | Flutter | DevOps",
      "banner": "Emoji placeholder",
      "color": "Tailwind gradient classes",
      "description": "Event description"
    }
  ],
  "pastEvents": [
    {
      "id": 101,
      "title": "Past Event",
      "date": "Date",
      "attendees": 200,
      "blogLink": "/blog/slug"
    }
  ]
}
```

**Used In:** 
- Homepage: `UpcomingEvents.jsx` (first 3 events)
- Events Page: `EventList.jsx` (all events)

### 2. Team Data (`data/team.json`)
```json
{
  "coreTeam": [
    {
      "id": 1,
      "name": "Member Name",
      "role": "Position",
      "photo": "Emoji placeholder",
      "bio": "Short biography",
      "social": {
        "linkedin": "URL",
        "twitter": "URL",
        "github": "URL"
      }
    }
  ],
  "volunteers": [/* Same structure */]
}
```

**Used In:** Team Page: `TeamCard.jsx`

### 3. Blogs Data (`data/blogs.json`)
```json
{
  "posts": [
    {
      "id": 1,
      "slug": "url-friendly-slug",
      "title": "Blog Title",
      "excerpt": "Short description",
      "content": "Full content (future)",
      "author": "Author Name",
      "date": "March 10, 2024",
      "category": "Category",
      "image": "Emoji placeholder",
      "color": "Tailwind gradient classes"
    }
  ]
}
```

**Used In:** 
- Blog Page: `BlogGrid.jsx`
- Future: Individual blog post pages

### 4. Domains Data (`data/domains.json`)
```json
{
  "domains": [
    {
      "id": 1,
      "name": "Domain Name",
      "icon": "Emoji",
      "color": "Tailwind gradient classes",
      "description": "Domain description"
    }
  ]
}
```

**Used In:** Homepage: `DomainsGrid.jsx`

### 5. Stats Data (`data/stats.json`)
```json
{
  "stats": [
    {
      "id": 1,
      "label": "Stat Label",
      "value": 500,
      "icon": "Emoji",
      "suffix": "+ or empty"
    }
  ]
}
```

**Used In:** Homepage: `StatsCounter.jsx`

---

## 🔧 Utilities & Helpers

### 1. Date Formatting (`utils/formatDate.js`)
```javascript
formatDate(dateString, format)
// Formats: 'short', 'long', 'relative'
```

**Usage:**
```javascript
import { formatDate } from '@/utils/formatDate';
formatDate("2024-03-15", "long"); // "March 15, 2024"
```

### 2. Scroll Functions (`utils/scrollToSection.js`)
```javascript
scrollToSection(sectionId)  // Smooth scroll to element
scrollToTop()               // Scroll to page top
```

**Usage:**
```javascript
import { scrollToTop } from '@/utils/scrollToSection';
scrollToTop();
```

### 3. Constants (`utils/constants.js`)
```javascript
COMMUNITY_INFO    // Community details
SOCIAL_LINKS      // Social media URLs
NAV_LINKS         // Navigation items
DOMAINS           // Tech domain names
EVENT_TYPES       // Event categories
CONTACT_INFO      // Contact details
```

**Usage:**
```javascript
import { SOCIAL_LINKS, NAV_LINKS } from '@/utils/constants';
```

### 4. SEO Metadata (`utils/seoMeta.js`)
```javascript
generateSEOMeta(options)  // Generate page metadata
```

**Usage:**
```javascript
import { generateSEOMeta } from '@/utils/seoMeta';
export const metadata = generateSEOMeta({
  title: "Page Title",
  description: "Page description"
});
```

---

## 🎨 Styling Guidelines

### Color Palette

#### Primary Colors
- **Blue-600:** `#2563eb` - Primary brand color
- **Purple-600:** `#9333ea` - Secondary brand color
- **Gray-800:** `#1f2937` - Text headings
- **Gray-600:** `#4b5563` - Body text

#### Gradients
```css
from-blue-600 to-purple-600    /* Primary gradient */
from-blue-400 to-cyan-400      /* Cloud/Web */
from-green-400 to-emerald-400  /* Android */
from-purple-400 to-pink-400    /* AI/ML */
from-orange-400 to-red-400     /* DevOps */
from-cyan-400 to-blue-400      /* Flutter */
```

### Typography Scale

```css
text-5xl     /* 3rem - 48px - Hero titles */
text-4xl     /* 2.25rem - 36px - Page titles */
text-3xl     /* 1.875rem - 30px - Section titles */
text-2xl     /* 1.5rem - 24px - Card titles */
text-xl      /* 1.25rem - 20px - Subheadings */
text-lg      /* 1.125rem - 18px - Large body */
text-base    /* 1rem - 16px - Body text */
text-sm      /* 0.875rem - 14px - Small text */
text-xs      /* 0.75rem - 12px - Labels */
```

### Spacing System

```css
py-16        /* Section padding (4rem) */
py-12        /* Medium sections (3rem) */
py-8         /* Small sections (2rem) */
gap-8        /* Grid gap (2rem) */
gap-6        /* Medium gap (1.5rem) */
gap-4        /* Small gap (1rem) */
```

### Container
```css
container mx-auto px-4    /* Standard container */
max-w-6xl mx-auto        /* Content constraint */
```

### Responsive Breakpoints
```css
sm:   640px   /* Tablets */
md:   768px   /* Small laptops */
lg:   1024px  /* Desktops */
xl:   1280px  /* Large desktops */
2xl:  1536px  /* Extra large */
```

---

## ➕ Adding New Features

### How to Add a New Page

1. **Create page file:**
```bash
app/new-page/page.jsx
```

2. **Basic page structure:**
```jsx
export default function NewPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Page Title
          </h1>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Your content */}
        </div>
      </section>
    </main>
  );
}
```

3. **Add to navigation:** Update `utils/constants.js`
```javascript
export const NAV_LINKS = [
  // ... existing links
  { label: 'New Page', href: '/new-page' },
];
```

### How to Add a New Component

1. **Choose directory:** Based on component purpose
   - Shared across pages? → `components/common/`
   - Page-specific? → `components/[page-name]/`

2. **Create component file:**
```bash
components/feature/NewComponent.jsx
```

3. **Component template:**
```jsx
export default function NewComponent({ prop1, prop2 }) {
  return (
    <div className="component-wrapper">
      {/* Component content */}
    </div>
  );
}
```

4. **Use the component:**
```jsx
import NewComponent from '@/components/feature/NewComponent';

<NewComponent prop1="value" prop2="value" />
```

### How to Add Data

1. **Create JSON file:** (if new data type)
```bash
data/new-data.json
```

2. **Data structure:**
```json
{
  "items": [
    {
      "id": 1,
      "field1": "value",
      "field2": "value"
    }
  ]
}
```

3. **Import and use:**
```jsx
import data from '@/data/new-data.json';

export default function Component() {
  return (
    <div>
      {data.items.map(item => (
        <div key={item.id}>{item.field1}</div>
      ))}
    </div>
  );
}
```

### How to Add a Utility Function

1. **Create utility file:**
```bash
utils/newUtility.js
```

2. **Export functions:**
```javascript
export function utilityFunction(param) {
  // Function logic
  return result;
}

export function anotherFunction(param) {
  // Function logic
  return result;
}
```

3. **Import and use:**
```javascript
import { utilityFunction } from '@/utils/newUtility';

const result = utilityFunction(value);
```

### How to Add a Custom Hook

1. **Create hook file:**
```bash
hooks/useSomething.js
```

2. **Hook template:**
```javascript
'use client';

import { useState, useEffect } from 'react';

export function useSomething() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Hook logic
  }, []);
  
  return state;
}
```

3. **Use the hook:**
```jsx
'use client';

import { useSomething } from '@/hooks/useSomething';

export default function Component() {
  const value = useSomething();
  // ...
}
```

---

## ✨ Best Practices

### Component Guidelines

1. **File Naming:** PascalCase (e.g., `MyComponent.jsx`)
2. **Component Naming:** Match file name
3. **One Component Per File:** Except for small helper components
4. **Props Destructuring:** Destructure props in function parameters
5. **PropTypes/TypeScript:** Document expected props (future enhancement)

### Code Style

1. **Use Client Components:** Add `'use client'` when using hooks/state
2. **Consistent Formatting:** Use 2 spaces for indentation
3. **Meaningful Names:** Use descriptive variable/function names
4. **Comments:** Add comments for complex logic
5. **DRY Principle:** Don't Repeat Yourself - reuse components

### Performance

1. **Image Optimization:** Use Next.js `<Image>` component (future)
2. **Code Splitting:** Next.js handles automatically
3. **Lazy Loading:** Dynamic imports for heavy components
4. **Memoization:** Use `useMemo` and `useCallback` when needed

### Accessibility

1. **Semantic HTML:** Use appropriate HTML elements
2. **Alt Text:** Add alt attributes to images
3. **ARIA Labels:** Use aria-label for icon buttons
4. **Keyboard Navigation:** Ensure all interactive elements are accessible
5. **Color Contrast:** Maintain WCAG AA standards

### SEO

1. **Page Titles:** Unique title for each page
2. **Meta Descriptions:** Add descriptions to all pages
3. **Heading Hierarchy:** Use h1, h2, h3 properly
4. **Structured Data:** Add JSON-LD where applicable (future)
5. **Sitemap:** Generate sitemap.xml (future)

---

## 📦 Import Conventions

### Using Path Aliases

**Always use `@/` alias for imports:**
```javascript
// ✅ Correct
import Button from '@/components/common/Button';
import { SOCIAL_LINKS } from '@/utils/constants';
import eventsData from '@/data/events.json';

// ❌ Avoid
import Button from '../../../components/common/Button';
import { SOCIAL_LINKS } from '../../utils/constants';
```

### Import Order

1. **React/Next.js imports:**
```javascript
import { useState } from 'react';
import Link from 'next/link';
```

2. **Component imports:**
```javascript
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
```

3. **Utility imports:**
```javascript
import { formatDate } from '@/utils/formatDate';
import { SOCIAL_LINKS } from '@/utils/constants';
```

4. **Data imports:**
```javascript
import eventsData from '@/data/events.json';
```

5. **Style imports (if any):**
```javascript
import styles from './Component.module.css';
```

---

## 🚀 Development Workflow

### Starting Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## 📝 Content Update Guide

### Update Events
1. Open `data/events.json`
2. Edit/add entries in `upcomingEvents` array
3. Save file
4. Changes appear immediately (dev server auto-reloads)

### Update Team Members
1. Open `data/team.json`
2. Edit/add entries in `coreTeam` or `volunteers` array
3. Save file

### Update Blog Posts
1. Open `data/blogs.json`
2. Edit/add entries in `posts` array
3. Save file

### Update Navigation
1. Open `utils/constants.js`
2. Edit `NAV_LINKS` array
3. Save file

### Update Social Links
1. Open `utils/constants.js`
2. Edit `SOCIAL_LINKS` object
3. Save file

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
- Next.js will auto-select next available port
- Or manually kill process on port 3000

**Import errors:**
- Check if using `@/` alias correctly
- Verify file path exists
- Restart dev server

**Data not updating:**
- Save the JSON file
- Refresh browser
- Check browser console for errors

**Styling not working:**
- Verify Tailwind class names
- Check if custom styles in globals.css
- Use browser DevTools to inspect

---

**Note:** This structure follows Next.js 15 App Router conventions and React 19 best practices. Always refer to official documentation for the latest updates and features.
