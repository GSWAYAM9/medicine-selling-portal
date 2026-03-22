# MediHub - Premium Medicine Selling Portal

A sophisticated, full-featured pharmaceutical e-commerce platform built with modern web technologies. MediHub provides a seamless shopping experience for customers, prescription management for doctors, and inventory control for pharmacists.

## Overview

MediHub is a premium medicine selling portal designed for the Indian market, offering:

- **52+ Verified Medicines** - Curated pharmaceutical collection from certified manufacturers
- **Multi-Role Support** - Customer, Doctor, and Pharmacist interfaces
- **Real-time Inventory** - Live stock management for pharmacists
- **Prescription Management** - Digital prescription handling for healthcare professionals
- **Secure Shopping** - Enterprise-grade encryption and secure checkout
- **Premium UX** - Ultra-modern, luxury healthcare aesthetic with Tailwind CSS

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) - React-based framework with SSR and static generation
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) - High-quality, customizable React components built on Radix UI
- **Form Management**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) - Type-safe form handling
- **Icons**: [Lucide React](https://lucide.dev) - Beautiful, consistent icon library
- **Date Handling**: [date-fns](https://date-fns.org) - Lightweight date utility library
- **Charts**: [Recharts](https://recharts.org) - Composable charting library
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Notifications**: [Sonner](https://sonner.emilkowal.ski) - Elegant toast notifications
- **Type Safety**: [TypeScript](https://www.typescriptlang.org) - Static type checking for JavaScript
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## Project Structure

```
├── app/
│   ├── page.tsx                 # Premium landing page
│   ├── login/                   # Authentication page
│   ├── medicines/               # Medicine catalog & shopping
│   │   ├── page.tsx             # Browse medicines
│   │   └── detail/              # Medicine details
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Payment & order confirmation
│   ├── orders/                  # Customer order history
│   ├── prescriptions/           # Doctor prescription management
│   ├── admin/                   # Admin dashboard
│   ├── pharmacist/              # Pharmacist panel
│   │   ├── dashboard/           # Overview & analytics
│   │   ├── inventory/           # Stock management
│   │   └── orders/              # Order fulfillment
│   └── layout.tsx               # Root layout with providers
├── components/
│   ├── header.tsx               # Navigation header
│   ├── theme-provider.tsx       # Dark mode provider
│   └── ui/                      # shadcn/ui components (60+ components)
├── lib/
│   ├── auth-context.tsx         # Authentication state management
│   ├── cart-context.tsx         # Shopping cart state
│   ├── mock-data.ts             # Demo data (medicines, users)
│   ├── types.ts                 # TypeScript interfaces
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   ├── medicine-hero.jpg        # Hero image
│   └── premium-healthcare.jpg   # Healthcare icon
└── package.json                 # Dependencies & scripts
```

## Key Features

### Customer Features
- Browse and search 52+ premium medicines
- Advanced filtering (category, price range, ratings)
- Medicine detail pages with specifications
- Shopping cart management
- Secure checkout process
- Order history and tracking
- Rating and reviews system
- Prescription uploads for restricted medicines

### Doctor Features
- Digital prescription management
- Patient prescription history
- Prescription validation and approval
- Integration with pharmacy system

### Pharmacist Features
- Real-time inventory management
- Stock level monitoring
- Order fulfillment dashboard
- Medicine categorization
- Inventory analytics

### Admin Features
- System management
- User management
- Platform analytics
- Content moderation

## Authentication System

The platform uses role-based authentication with three user types:

1. **Customer** - Browse, purchase, and track orders
2. **Doctor** - Manage and issue prescriptions
3. **Pharmacist** - Manage inventory and fulfill orders

Demo credentials are available in `lib/mock-data.ts` for testing different roles.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GSWAYAM9/medicine-selling-portal.git
cd medicine-selling-portal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Features Overview

### Premium Design System
- **Colors**: Sophisticated teal primary with gold accents
- **Typography**: Elegant serif headings with refined sans-serif body text
- **Spacing**: Breathable layouts with careful whitespace
- **Shadows & Effects**: Subtle elevation and hover states
- **Responsive**: Mobile-first design working seamlessly on all devices

### Medicine Catalog
- Advanced search with real-time filtering
- Category-based browsing
- Price range filtering
- Rating and popularity sorting
- "Prescription Required" badges for restricted medicines
- Premium badge for top-rated items

### Shopping Experience
- Intuitive cart management
- One-click product addition
- Secure checkout flow
- Order confirmation and tracking
- Multiple payment options ready for integration

### Prescription Management
- Digital prescription uploads
- Doctor approval workflows
- Patient-specific medicine restrictions
- Prescription history

## Development

### Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### File Editing

- Edit pages in the `app/` directory - changes auto-update with HMR
- Edit components in the `components/` directory
- Update styling in `app/globals.css` (design tokens and Tailwind config)
- Add utilities in `lib/` directory

## Authentication Flow

The app uses React Context for state management with localStorage persistence:

1. User logs in via `/login` page
2. Credentials validated against mock data in `lib/mock-data.ts`
3. User object stored in localStorage and AuthContext
4. Role-based routing determines dashboard/interface
5. Protected routes check authentication status

For production, integrate with your backend authentication service.

## Customization

### Add New Medicines
Edit `lib/mock-data.ts` and add entries to the `mockMedicines` array with:
- `id`, `name`, `manufacturer`, `category`, `price`
- `description`, `rating`, `requiresPrescription`, `stock`

### Update Colors
Modify the color tokens in `app/globals.css` `:root` section to match your brand.

### Add Users
Add new user profiles to `mockUsers` array in `lib/mock-data.ts` for different roles.

## Deployment

### Deploy to Vercel

The project is optimized for [Vercel](https://vercel.com) deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel automatically detects the Next.js project
4. Every push to `main` triggers a new deployment

```bash
# Deploy with one command
vercel
```

### Environment Variables

Currently uses mock data. For production, configure:
- Database connection strings
- Authentication service keys
- Payment gateway credentials
- Email service configuration

## API Integration (Ready for Implementation)

The app structure is prepared for backend integration:
- `/api/medicines` - Fetch medicine catalog
- `/api/auth` - Authentication endpoints
- `/api/orders` - Order management
- `/api/prescriptions` - Prescription handling
- `/api/inventory` - Stock management

## Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image component
- Automatic code splitting
- CSS-in-JS optimization
- React Server Components ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This repository is linked to v0 for continuous development. You can:

1. Continue development on [v0.app](https://v0.app)
2. Push changes via GitHub
3. Create feature branches for collaboration

## License

This project is private. All rights reserved.

## Support & Contact

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/GSWAYAM9/medicine-selling-portal/issues)
- Documentation: Check the project structure and inline comments
- v0 Development: Continue building on [v0.app](https://v0.app)

## Roadmap

Future enhancements planned:
- Real database integration (PostgreSQL/Supabase)
- Payment gateway integration (Stripe/Razorpay)
- Email notifications and order updates
- SMS alerts for prescription status
- Advanced analytics dashboard
- Machine learning recommendations
- Video consultations with doctors
- Real-time inventory sync

---

Built with ❤️ for premium healthcare in India
