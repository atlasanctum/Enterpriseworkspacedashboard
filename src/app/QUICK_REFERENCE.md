# 🚀 Quick Reference - Enterprise Workspace

## 📍 All Routes

```
Dashboard              → /
Deployments           → /deployments
Beneficiaries         → /beneficiaries
Beneficiary Details   → /beneficiaries/[id]
Fraud Detection       → /fraud-detection
Compliance            → /compliance
Audit Trails          → /audit-trails
Workflows             → /workflows
Analytics             → /analytics
Reporting             → /reporting
Messaging             → /messaging
AI Assistant          → /ai-assistant
```

## ⚡ Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Start production server
npm start
```

## 📂 Key Files

```
/app/(dashboard)/page.tsx          → Main dashboard
/components/dashboard/sidebar.tsx  → Navigation
/components/beneficiaries/*        → Beneficiary components
/lib/data/beneficiaries.ts        → Data fetching
/lib/actions/beneficiaries.ts     → Server actions
/styles/globals.css               → Tailwind config
```

## 🎨 Color Tokens

```css
--primary          → Main brand color
--secondary        → Secondary actions
--accent           → Highlights
--muted            → Subdued text
--destructive      → Errors/warnings
--chart-1 to 5     → Chart colors
```

## 🔧 Common Tasks

### Add a New Page
1. Create `/app/(dashboard)/my-page/page.tsx`
2. Add to sidebar in `/components/dashboard/sidebar.tsx`
3. Add metadata export

### Add a Component
1. Create in `/components/my-component.tsx`
2. Use `'use client'` if interactive
3. Import and use in pages

### Update Styling
1. Edit `/styles/globals.css` for global changes
2. Use Tailwind classes for components
3. Dark mode: use `dark:` prefix

### Add Server Action
1. Create in `/lib/actions/`
2. Mark `'use server'`
3. Use Zod for validation
4. Revalidate paths

## 📊 Mock Data Locations

```typescript
/lib/data/beneficiaries.ts  → Beneficiary data
/components/*Module*.tsx     → Component-specific data
```

## 🎯 URLs with Params

```
Search:      /beneficiaries?query=ahmed
Filter:      /beneficiaries?country=Yemen&status=active
Pagination:  /beneficiaries?page=2
Combined:    /beneficiaries?query=ahmed&country=Yemen&page=2
```

## 🔑 Environment Variables

```env
POSTGRES_URL          → Database connection
NEXTAUTH_SECRET       → Auth secret
NEXTAUTH_URL          → App URL
NODE_ENV              → Environment
```

## 📱 Responsive Breakpoints

```css
sm  → 640px   (Tablet)
md  → 768px   (Small desktop)
lg  → 1024px  (Desktop)
xl  → 1280px  (Large desktop)
2xl → 1536px  (Extra large)
```

## 🎨 Component Usage

### Button
```tsx
<Button variant="default">Click</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Badge
```tsx
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Error</Badge>
```

## 🔍 Search Implementation

```tsx
// URL-based search with debouncing
const handleSearch = useDebouncedCallback((term: string) => {
  const params = new URLSearchParams(searchParams);
  params.set('query', term);
  replace(`${pathname}?${params.toString()}`);
}, 300);
```

## 📄 Page Template

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page",
  description: "Description",
};

export default function MyPage() {
  return (
    <div className="space-y-6">
      <h2>My Page</h2>
      {/* Content */}
    </div>
  );
}
```

## 🛠️ Development Tips

- **Hot Reload**: Save files → auto refresh
- **Type Safety**: Use TypeScript everywhere
- **Server Components**: Default, use `'use client'` only when needed
- **URL State**: Keep filters/search in URL
- **Mock Data**: Use fallbacks for development
- **Error Handling**: Wrap in try/catch with user feedback

## 📚 Useful Links

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Radix UI: https://www.radix-ui.com
- TypeScript: https://www.typescriptlang.org

## 🎯 Quick Navigation

From any page, press:
- Click logo → Dashboard
- Use sidebar → All pages
- Browser back → Previous page
- URL bar → Direct access

---

**Print this for quick reference while developing!**
