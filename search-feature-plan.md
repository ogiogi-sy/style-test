# Search Feature for Fan Overview — Research & Design Plan

## Context

The Fan Overview page (`WebFanOverviewScreen`) needs a well-designed search flow so users (Relationship Managers) can find customers (organisations and individuals) and navigate to their detail pages. The existing `GlobalSearch` component in the navbar already provides typeahead search with an Organisations/Individuals toggle, status badges, and result previews. The goal is to research best practices for bank internal CRM search and recommend the optimal design approach.

**User decisions:**
- Search lives in the **navbar** (global search) — not embedded in the fan overview page
- Clicking a result goes to a **separate results page** first, then through to fan overview
- This is a **research & plan deliverable** — no code implementation yet

---

## Research Findings: Bank Internal CRM Search Best Practices

### 1. Search Input (Navbar Global Search)

**Current state:** The GlobalSearch component already handles this well — entity type dropdown, typeahead results, highlighted matches, status badges, RM assignment. This aligns with best practices.

**Recommended improvements:**

| Area | Best Practice | Current State | Recommendation |
|------|--------------|---------------|----------------|
| **Result limit** | 7–9 suggestions max | 8 results shown | Good — keep at 8 |
| **Query highlighting** | Bold matched text | Already implemented | Good |
| **Entity type selector** | Clear toggle between data sources | Dropdown toggle exists | **Keep separate — orgs and individuals are in different databases so users must choose first. Consider upgrading from dropdown to pill-style tabs for faster switching** |
| **Recent searches** | Show recent queries on focus | Not implemented | **Add recent searches shown when input is focused but empty** |
| **Keyboard navigation** | Arrow keys to navigate, Enter to select | Only Escape implemented | **Add arrow key navigation and Enter to select** |
| **Loading state** | Show spinner during search | No loading state (instant mock data) | Add when real API is connected |
| **Search scope hint** | Tell user what fields are searched | Not shown | **Add helper text: "Search by name, CIF, CRN, or address"** |
| **Minimum query length** | Start searching after 2-3 chars | Starts at 1 char | **Start after 2 characters to reduce noise** |

### 2. Search Results Page (Separate Page)

**Current state:** `WebSearchResultsScreen` exists but is basic — just a list with entity type tabs.

**Recommended design for the results page:**

#### a) Layout Structure
```
┌─────────────────────────────────────────────────┐
│ Sidebar │ Navbar (with GlobalSearch)             │
├─────────┼───────────────────────────────────────┤
│         │ Breadcrumb: Home > Search Results      │
│         │                                        │
│         │ ┌─ Search bar (large, pre-filled) ──┐ │
│         │ │ "Metr" [x]                        │ │
│         │ └───────────────────────────────────┘ │
│         │                                        │
│         │ 26 results for "Metr"                  │
│         │                                        │
│         │ [Organisations ●] [Individuals]  Tabs  │
│         │                                        │
│         │ Filters: [Status ▾] [RM ▾] [Clear all] │
│         │                                        │
│         │ ┌─ Result Card ────────────────────┐  │
│         │ │ Metric Solutions UK     Active    │  │
│         │ │ CIF: 12345678  CRN: 08765432     │  │
│         │ │ 12 High Street, SW1  RM: M. Owen │  │
│         │ └──────────────────────────────────┘  │
│         │ ┌─ Result Card ────────────────────┐  │
│         │ │ ...                               │  │
│         │ └──────────────────────────────────┘  │
│         │                                        │
│         │ Pagination: < 1 2 3 ... 5 >            │
└─────────┴───────────────────────────────────────┘
```

#### b) Key Components for the Results Page

1. **Inline search bar** — Large, pre-filled with the query from navbar. Allows users to refine without going back. This is standard in enterprise CRM tools (Salesforce, HubSpot pattern).

2. **Entity type tabs** — Already exist (Organisations / Individuals). Keep as pill-style tabs with result counts: `Organisations (18)` | `Individuals (8)`.

3. **Faceted filters** (new) — Best practice is 3–5 filters for bank CRM:
   - **Status**: Active / Restricted / Prospective (checkbox dropdown)
   - **Relationship Manager**: Dropdown with RM names
   - **Clear all** button to reset filters
   - Filters should show counts: `Active (12)`, `Restricted (3)`

4. **Result cards** — Enhance from current list to structured cards:
   - Primary info: Company/person name (bold), status badge (right-aligned)
   - Secondary info: CIF, CRN (for orgs) or CIF, email (for individuals)
   - Tertiary info: Address, RM assignment
   - Hover state with subtle background change
   - Click navigates to `#/web/fan-overview?id={customerId}`

5. **Results count & sort** — Show "26 results for 'Metr'" with optional sort: Relevance (default), Name A-Z, Status.

6. **Pagination** — For large result sets, paginate at 10–15 results per page. This is standard in banking internal tools to avoid overwhelming the RM.

7. **Empty state** — Clear message with suggestions: "No results found. Try searching by CIF number or company name."

### 3. Navigation Flow (End-to-End)

```
User types in navbar GlobalSearch
    ↓
Typeahead dropdown shows top 8 results (for selected entity type)
    ↓
Option A: Click a result → go directly to fan-overview?id=X
Option B: Click "View all (26 matches)" → go to Search Results page
    ↓
Search Results page with filters, tabs, paginated cards
    ↓
Click a result card → go to fan-overview?id=X
    ↓
Fan Overview page loads with that customer's data
```

### 4. Data Architecture Considerations

- **URL state management**: Search query, entity type, filters, page number should all be reflected in the URL hash params for bookmarkability and back-button support: `#/web/search?q=metr&type=organisations&status=active&rm=sarah-jenkins&page=1`
- **Customer ID routing**: Fan Overview should accept a customer ID param (`#/web/fan-overview?id=123`) and load the correct customer data dynamically
- **Search fields**: Organisations should be searchable by name, CIF, CRN, address. Individuals by name, CIF, email, phone number.

### 5. Accessibility & UX Polish

- **ARIA attributes**: Search input should have `role="combobox"`, results should have `role="listbox"`, individual results `role="option"`
- **Keyboard navigation**: Full arrow key support in dropdown, Tab to move between filters on results page
- **Screen reader**: Announce result count changes: "26 results found"
- **Responsive**: On mobile, filters collapse into a "Filters" button that opens a bottom sheet or modal
- **Performance**: Debounce search input (300ms) to avoid excessive API calls

### 6. What NOT to Change

- Keep the Organisations/Individuals entity type concept — it maps well to how bank RMs think
- Keep status badges with the current color scheme (green=Active, red=Restricted, amber=Prospective)
- Keep the RM assignment visible — it's critical for internal bank tools
- Keep search in the navbar — don't add a separate search on the fan overview page

---

## Summary of Recommended Changes

### GlobalSearch (Navbar) — Enhancements
1. Keep entity type selector (separate databases) — upgrade to pill-style tabs for faster switching
2. Add recent searches on empty focus
3. Add keyboard navigation (arrow keys + Enter)
4. Add search scope helper text
5. Minimum 2-character query threshold

### WebSearchResultsScreen — Redesign
1. Add inline search bar (pre-filled, editable)
2. Add faceted filters (Status, RM) with counts
3. Enhanced result cards with structured layout
4. Result count + sort options
5. Pagination (10-15 per page)
6. URL state management for all parameters
7. Better empty state messaging

### Fan Overview — Minor Update
1. Accept customer ID from URL params
2. Load customer data dynamically based on ID

---

## Files to Modify

| File | Change |
|------|--------|
| `src/screens/web/components/GlobalSearch.tsx` | Pill-style entity tabs, recent searches, keyboard nav, helper text |
| `src/screens/web/WebSearchResultsScreen.tsx` | Full redesign with filters, pagination, inline search |
| `src/screens/web/data/searchData.ts` | Add filter functions, pagination support, search history |
| `src/screens/web/WebFanOverviewScreen.tsx` | Accept customer ID param, dynamic data loading |
| `src/screens/web/data/fanOverviewData.ts` | Multiple customer datasets keyed by ID |

## Verification

- Test the full flow: type in navbar → see dropdown → click "View all" → see results page → apply filters → click result → land on correct fan overview
- Verify keyboard navigation works end-to-end
- Test on mobile breakpoint (responsive filters, mobile search toggle)
- Check URL state is preserved on browser back/forward

---

## Sources

- [Axis Bank CRM App UX Case Study](https://think.design/work/axis-crm-apps-ui-ux-design/)
- [CRM Design Best Practices — Adam Fard](https://adamfard.com/blog/crm-design)
- [Top 10 CRM Design Best Practices — Aufait UX](https://www.aufaitux.com/blog/crm-ux-design-best-practices/)
- [Search Bar UI Best Practices — LogRocket](https://blog.logrocket.com/ux-design/design-search-bar-intuitive-autocomplete/)
- [Autocomplete UX Best Practices — Baymard](https://baymard.com/blog/autocomplete-design)
- [Designing Autosuggest Experiences — UX Magazine](https://uxmag.com/articles/best-practices-designing-autosuggest-experiences)
- [15 Filter UI Patterns That Work — Bricx Labs](https://bricxlabs.com/blogs/universal-search-and-filters-ui)
- [Search Filters Best Practices — Algolia](https://www.algolia.com/blog/ux/search-filter-ux-best-practices)
- [Faceted Search Overview — Algolia](https://www.algolia.com/blog/ux/faceted-search-an-overview)
