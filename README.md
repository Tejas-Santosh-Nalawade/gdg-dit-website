# GDG-DIT Website

Official website for the GDG on Campus Dr. D. Y. Patil Institute of Technology, Pune. Built to showcase events, team, and community activities.

## About

The GDG-DIT Chapter is a vibrant developer community focused on Google technologies. Our website serves as the central hub for:

- **Event Information** — Upcoming workshops, study jams, and hackathons
- **Team Showcase** — Meet our organizing team and faculty coordinators
- **Community Engagement** — Connect with fellow developers and join our activities
- **Sponsorship Opportunities** — Partner with us to support the developer community

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion, GSAP, Anime.js
- **3D Graphics:** Three.js, React Three Fiber
- **UI Components:** Radix UI, Lucide Icons

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.jsx           # Home page
│   ├── events/            # Events page
│   ├── team/              # Team page
│   ├── contact/           # Contact page
│   ├── sponsors/          # Sponsors page
│   ├── gallery/           # Gallery page
│   └── join/              # Join community page
├── components/            # Reusable React components
│   ├── common/            # Shared components (Navbar, Footer, etc.)
│   ├── home/              # Home page components
│   ├── events/            # Event-related components
│   └── team/              # Team-related components
├── data/                  # Static JSON data files
│   ├── events.json        # Event information
│   ├── team.json          # Team member data
│   └── sponsors.json      # Sponsor information
└── public/                # Static assets (images, fonts)
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/gdg-dit/website.git
cd website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

## Content Management

All content is managed through static JSON files in the `/data` directory:

- **events.json** — Add/update upcoming and past events
- **team.json** — Manage team member information
- **sponsors.json** — Update sponsor details and packages
- **domains.json** — Define technical domains and focus areas

To add new content, simply edit the relevant JSON file and the website will automatically reflect the changes.

## Key Features

- **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- **Performance Optimized** — Fast loading times with Next.js optimization
- **SEO Friendly** — Built-in metadata and sitemap generation
- **Smooth Animations** — Engaging user experience with modern animations
- **Accessibility** — Follows web accessibility standards

## Pages

- **Home** — Hero section, featured events, domains, stats, and gallery
- **Events** — Complete list of upcoming and past events
- **Team** — Core team, technical teams, and faculty coordinators
- **Gallery** — Photo showcase from past events
- **Contact** — Contact form and social media links
- **Sponsors** — Sponsorship packages and current sponsors
- **Join** — Community membership information

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Team

Built and maintained by the GDG-DIT team:

- **Lead:** Gaurav Masand
- **Managing Director:** Bhavesh Rathod
- **Tech Lead:** Mrunal Thakare

## License

© 2026 GDG on Campus Dr. D. Y. Patil Institute of Technology. All rights reserved.

## Contact

- **Email:** contact@gdgdit.com
- **Website:** [gdgdit.com](https://gdgdit.com)
- **LinkedIn:** [GDG-DIT](https://linkedin.com/company/gdg-dit)

---

Built with ❤️ by GDG-DIT Team
