<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Naitik Rajyaguru - Portfolio

A futuristic terminal-inspired personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Terminal-style Interface** - Command-line inspired navigation
- **Interactive 3D Avatar** - Mouse-tracking profile image
- **Animated Sprites** - Custom tech-themed visual elements
- **Modular Sections**:
  - `projects` - Showcase of development work
  - `experience` - Professional history
  - `contact` - Direct communication channels
  - `whoami` - Personal bio and interests

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Framer Motion
- Lucide Icons

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Portfolio_final
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The site will be available at:
- Local: http://localhost:3000
- Network: http://192.168.x.x:3000 (accessible on your local network)

### 4. Build for production

```bash
npm run build
```

Production files will be generated in the `dist/` folder.

### 5. Preview production build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove dist folder |

## Project Structure

```
Portfolio_final/
├── public/
│   └── profile.jpg          # Your profile photo
├── src/
│   ├── App.tsx              # Main application component
│   ├── constants.ts         # Portfolio data (projects, experience, etc.)
│   ├── index.css            # Tailwind styles
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Customization

### Update Profile Information

Edit `src/constants.ts`:

```typescript
export const portfolioData = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description...",
  profilePhoto: "/profile.jpg",  # Replace with your image in public/
  contact: {
    email: "your@email.com",
    phone: "+1 234 567 890",
    location: "Your City, Country"
  },
  # ... rest of your data
}
```

### Update Profile Photo

Replace `public/profile.jpg` with your own image (keep the same filename or update the reference in `constants.ts`).

### Add/Edit Projects

In `src/constants.ts`, modify the `projects` array:

```typescript
projects: [
  {
    title: "Your Project",
    description: "Project description...",
    tech: ["React", "Node.js", "TypeScript"],
    image: "/your-project-image.jpg",  # Add to public/ folder
    links: {
      github: "https://github.com/...",
      live: "https://your-demo.com"     # Optional
    }
  }
]
```

## Troubleshooting

### Port already in use

If port 3000 is occupied, Vite will automatically try the next available port (3001, 3002, etc.).

### Images not loading

1. Ensure images are in the `public/` folder
2. Reference them with `/filename.jpg` (leading slash)
3. For external URLs, ensure they allow CORS

### npm install fails

Try clearing the cache:
```bash
npm cache clean --force
npm install
```

## License

Apache-2.0

## Author

Naitik Rajyaguru - [LinkedIn](https://www.linkedin.com/in/naitik-rajyaguru/) - [GitHub](https://github.com/Naitik1Rajyaguru)
