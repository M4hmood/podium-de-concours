# Design Guidelines — Podium des Concours Dashboard

## Design Approach
**System-Based Approach** using modern dashboard aesthetics inspired by Linear and Vercel's data visualization patterns. Focus on clarity, hierarchy, and celebration of achievement through thoughtful spacing and motion.

## Core Design Elements

### Typography
- **Headings**: Inter or Geist font family
  - H1: 3xl-4xl, font-bold (page title)
  - H2: 2xl, font-semibold (section headers)
  - H3: xl, font-medium (component titles)
- **Body**: Base size, font-normal for descriptions
- **Data/Scores**: lg-2xl, font-bold with tabular numbers

### Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Container: max-w-6xl mx-auto
- Section padding: py-12 to py-20
- Component spacing: gap-6 to gap-8
- Card padding: p-6 to p-8

### Component Library

**Podium Component**
- Three-column grid layout with center column (1st place) taller
- Heights: 1st = h-64, 2nd = h-48, 3rd = h-40
- Animated entrance: stagger animation (3rd → 2nd → 1st)
- Each platform includes: rank medal/icon, team name, score prominently displayed
- Subtle elevation differences using shadows (shadow-lg for 1st, shadow-md for others)
- Rounded corners (rounded-xl)

**Leaderboard Table**
- Full-width responsive table with fixed header
- Columns: Rank (w-16), Team Name (flex-1), Score (w-24), Progress (w-48)
- Row styling: Top 3 use distinct background treatment (gold/silver/bronze tint or border accent)
- Alternating row backgrounds for readability (even rows slightly darker)
- Hover state: subtle background highlight
- Mobile: Stack to cards with rank badge

**Progress Bars**
- Height: h-2 to h-3
- Background: gray-200 track
- Fill: gradient or solid based on score tier (high score = vibrant)
- Rounded: rounded-full
- Animated fill on mount (transition-all duration-1000)
- Score percentage displayed adjacent to bar

**Dashboard Layout**
- Hero section: Centered title "Podium des Concours — Nuit de l'Info 2025" with brief description
- Podium section: Full-width container, centered content
- Leaderboard section: Follows podium with clear visual separation (border-t or spacing)
- Card-based containers: white background, rounded-xl, shadow-sm

### Animations
- Podium entrance: Scale up + fade in, staggered (0.2s delay between platforms)
- Progress bars: Width transition from 0 to score value
- Table rows: Subtle hover lift (transform scale-[1.01])
- Transition timing: duration-300 for interactions, duration-1000 for data reveals

### Accessibility
- High contrast ratios (WCAG AA minimum)
- Focus visible states: ring-2 ring-offset-2
- Keyboard navigable table rows
- ARIA labels for rank indicators and progress bars
- Screen reader announcements for score updates

## Images
**Optional Hero Image**: Competition/hackathon theme (monitors, code, night sky) - can be abstract geometric pattern or event photo
- Placement: Background of hero section with overlay
- Treatment: Subtle opacity (0.1-0.2) or blur

## Visual Hierarchy
1. Podium is the star — largest visual weight, central positioning
2. Leaderboard provides comprehensive data — clean, scannable
3. Progress bars reinforce score context — subtle but informative
4. Spacing creates breathing room — never cramped