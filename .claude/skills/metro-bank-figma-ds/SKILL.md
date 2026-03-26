---
name: metro-bank-figma-ds
description: Metro Bank NextGen Design System skill for Figma. Use this skill whenever writing designs to Figma canvas via the Figma MCP use_figma tool. Covers all design tokens (colors, spacing, radius, typography, shadows), variable binding, text style binding, component importing, and the self-healing screenshot workflow. Triggers include any request to create, build, design, prototype, or mock up screens, components, layouts, or pages in Figma for the Metro Bank NextGen product.
---

# Metro Bank — Figma Design System Skill

## Purpose

Ensure every frame, component, and token written to Figma canvas from Claude Code is **fully connected to the Metro Bank design system** — variables bound (not hardcoded), text styles linked, components imported from the shared library, and layouts following the established spacing scale.

---

## Library References

| Library | File Key | Library Key |
|---------|----------|-------------|
| 01. Foundations | `cLsIaGgj1zMGQ7BLuFYlOJ` | `lk-1db7ae8408cc482917e8a4d55c9bd254b91e334e87ca7e78966a7db0733c01126c38e746b9286955826762e305c2cc484b0cc6e529637f35b3195ce87c31d0e3` |
| 02. Core Components | — | `lk-85069ead4352cf0d6e9d110c32f061a37f1feec0d55727ba6317564859901ab061273fba44a1258a367c24c01a909f9ec692fab763057bd7c0ba4fee8a1b5e20` |

Organisation key (for `create_new_file`): `organization::1049695331332752089`

---

## Token Architecture

The design system uses a **3-layer variable structure**:

```
Primitives  →  Responsive  →  Semantics
(raw values)   (breakpoint)   (purpose-based)
```

- **Primitives** — raw color hex, spacing px, font family
- **Responsive** — font sizes, corner radius, border width (may vary by breakpoint)
- **Semantics** — purpose-based tokens: brand/text-default, neutral/background-page, error/icon-default, etc.

**Always bind to the Semantic layer when available.** Fall back to Primitives only for values that have no semantic alias.

---

## Variable Binding — How It Works

### The Golden Rule

**Never hardcode hex colors, pixel spacing, or radius values.** Always bind to a design system variable using `setBoundVariable()`.

### Code Pattern — Binding a Fill Color

```js
// 1. Import the variable by its key
const brandBgVar = await figma.variables.importVariableByKeyAsync("5d0b8b0e52dbfb2a86c168cc46c45753fc08e6d2");

// 2. Create the node
const frame = figma.createFrame();

// 3. Bind the fill to the variable
const fillsCopy = [...frame.fills];
fillsCopy[0] = figma.variables.setBoundVariableForPaint(fillsCopy[0], 'color', brandBgVar);
frame.fills = fillsCopy;
```

### Code Pattern — Binding Spacing (padding, gap, dimensions)

```js
const space16 = await figma.variables.importVariableByKeyAsync("1cc511c395361ebd0fad799711a7290efc2763b5");

frame.setBoundVariable('paddingTop', space16);
frame.setBoundVariable('paddingBottom', space16);
frame.setBoundVariable('paddingLeft', space16);
frame.setBoundVariable('paddingRight', space16);
frame.setBoundVariable('itemSpacing', space16);
```

### Code Pattern — Binding Corner Radius

```js
const radius16 = await figma.variables.importVariableByKeyAsync("2f9df4fd9ddfd3ffe36c88145c53e1d64e15c9d0");

frame.setBoundVariable('topLeftRadius', radius16);
frame.setBoundVariable('topRightRadius', radius16);
frame.setBoundVariable('bottomLeftRadius', radius16);
frame.setBoundVariable('bottomRightRadius', radius16);
```

### Code Pattern — Binding Stroke/Border Color

```js
const borderVar = await figma.variables.importVariableByKeyAsync("4e742a0c97192f809dd53278dab96bc6bd27b92a");

frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 }];
const strokesCopy = [...frame.strokes];
strokesCopy[0] = figma.variables.setBoundVariableForPaint(strokesCopy[0], 'color', borderVar);
frame.strokes = strokesCopy;
```

### Code Pattern — Binding Border Width

```js
const border1 = await figma.variables.importVariableByKeyAsync("43bec986f33f887f1a655d24a9da14f214ddc46e");
frame.setBoundVariable('strokeTopWeight', border1);
frame.setBoundVariable('strokeBottomWeight', border1);
frame.setBoundVariable('strokeLeftWeight', border1);
frame.setBoundVariable('strokeRightWeight', border1);
```

---

## Text Style Binding — How It Works

### Code Pattern — Applying a Text Style

```js
// 1. Import the style by key
const bodyDefaultStyle = await figma.importStyleByKeyAsync("3ebc0e6b97bfbb4cc1188a44682e3c708af60f73");

// 2. Create a text node
const text = figma.createText();
text.characters = "Your payment is on its way.";

// 3. Apply the text style
text.textStyleId = bodyDefaultStyle.id;
```

**Important:** When you apply a text style, Figma handles font loading automatically through the style. You do NOT need to call `figma.loadFontAsync()` separately when using text styles.

However, if you need to **modify characters after applying a style**, load the font first:

```js
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
text.characters = "Updated text";
```

---

## Text Style Keys Reference

### Inter — Body & UI Styles

| Style Name | Key | Resolved: Family, Weight, Size/Line-Height, Letter-Spacing |
|------------|-----|-------------------------------------------------------------|
| Body Default / Body Default | `3ebc0e6b97bfbb4cc1188a44682e3c708af60f73` | Inter, Regular 400, 16px/20px, ls 1 |
| Body Default / Body Light | `08088dd50858c442aa9bac0cc0b247c7d21b4c76` | Inter, Regular 400, 16px/20px, ls 1 |
| Body Large / Body Default | `02087caae8b8076a5550390265ef4b29adff8a25` | Inter, Regular 400, 18px/24px, ls 0 |
| Body Large / Body Light | `9b0ed404cf9e415f8ae45f87d23433b385c33351` | Inter, Light 300, 18px/24px, ls 0 |
| Body Large / Title Bold | `a6daf105e5fbf6973451c2e9673672b0b54c07d9` | Inter, SemiBold 600, 18px/24px, ls 0 |
| Body Small / Body Default | `4730c242d27beefe3ae93b8c29a26a00db5b4ff4` | Inter, Regular 400, 14px/18px, ls 1.5 |
| Body Small / Body Light | `21edf78ad7adcbcc4f93e9e346883de606c419eb` | Inter, Light 300, 14px/18px, ls 1.5 |
| Body Small / Title Bold | `3dc4fa6d5285fb129dd744a2207c64493af3c79f` | Inter, SemiBold 600, 14px/18px, ls 1.5 |
| Title Screen / Bold | `6e591162b4046b988687c13ba35c16529d058ca6` | Inter, SemiBold 600, 24px/28px, ls -1.5 |
| Title Section / Bold | `192ee0b92bf36fa8bb195a63c69f0f7551b0ef40` | Inter, SemiBold 600, 20px/24px, ls -1 |
| Caption / Title | `c5de4bfa64396bda6107ac7233c4036b149c6222` | Inter, SemiBold 600, 12px/16px, ls 2 |
| Caption / Body | `5846e2fb2976a8a1c9fc2efd049cc8b336de3dad` | Inter, Regular 400, 12px/16px, ls 2 |
| Link / Large | `2c21e167516b11d8a84c2b8c4c9e31165349f08c` | Inter, SemiBold 600, 18px/24px, underline |
| Link / Small | `977ba7bb510e6b7be94ebeb906c7c6d180dbb2e4` | Inter, SemiBold 600, 14px/18px, underline |

### FT Polar — Display / Hero Styles

| Style Name | Key | Resolved: Family, Weight, Size/Line-Height, Letter-Spacing |
|------------|-----|-------------------------------------------------------------|
| Display L / Light | `2dc54dedec00c94ae884aa0e3a335d45bcfd1f27` | FT Polar, Light 300, 80px/80px, ls -4 |
| Display L / Regular | `bfdca5fc598f314c3298ea5b47220c1ff14735f6` | FT Polar, Regular 400, 80px/80px, ls -4 |
| Display L / SemiBold | `0c3c6046ab0b4ccd660f2a61689ea64f357b2b1e` | FT Polar, SemiBold 600, 80px/80px, ls -4 |
| Display M / Light | `45c04682588621c84135856f963e4b96b65e0ed4` | FT Polar, Light 300, 72px/72px, ls -3.5 |
| Display M / Regular | `fe653231f71dd3413ab8e828ca4fbec3a04ca1c1` | FT Polar, Regular 400, 72px/72px, ls -3.5 |
| Display M / SemiBold | `0cad2d814eb1c089cc3a3e996c9a5cdb6a63dc82` | FT Polar, SemiBold 600, 72px/72px, ls -3.5 |
| Display S / Light | `49b8e72f717a3716b44bbfdd3d42465d866bf2ba` | FT Polar, Light 300, 64px/64px, ls -3 |
| Display S / Regular | `9fbd637570c53d39932d27a45eb5969eaade37ea` | FT Polar, Regular 400, 64px/64px, ls -3 |
| Display S / SemiBold | `ad176f04d1f9b35627cbc1b50fa42d6870da58c6` | FT Polar, SemiBold 600, 64px/64px, ls -3 |

### Style Selection Guide

| Context | Recommended Style |
|---------|-------------------|
| Screen title (mobile) | Title Screen / Bold |
| Section heading | Title Section / Bold |
| Body paragraph | Body Default / Body Default |
| Secondary/muted body | Body Default / Body Light |
| Large body (emphasis) | Body Large / Body Default |
| Small labels, metadata | Body Small / Body Default |
| Captions, timestamps | Caption / Body |
| Caption heading | Caption / Title |
| Hero / marketing headline | Display S–L / Regular or SemiBold |
| Inline link (body) | Link / Large or Link / Small |

---

## Effect Style Keys (Box Shadows)

| Style | Key |
|-------|-----|
| box-shadow/Info/xs | `6d0c98f21819f9172d0aaa883eb918ddfbee5733` |
| box-shadow/Info/sm | `7ee16d5ed181b9028643f44eed3721b02195917c` |
| box-shadow/Info/md | `6631cac6521344297fcc49832e45207c6e6f4be1` |
| box-shadow/Info/lg | `954aeaa307da4e027ffbac3c76ca66dbd9ed2665` |
| box-shadow/Info/xl | `2b8b4c445e737f6ae46d5642738f258fe82c73a4` |
| box-shadow/Info/2xl | `b89d06b879a32412e1fab79b01d2acbb15a45051` |

### Applying an Effect Style

```js
const shadowStyle = await figma.importStyleByKeyAsync("6631cac6521344297fcc49832e45207c6e6f4be1");
frame.effectStyleId = shadowStyle.id;
```

---

## Semantic Color Variables — Complete Reference

### Brand

| Token | Variable Key | Resolved Hex |
|-------|-------------|--------------|
| brand/defaults/text-default | `a4c77dc14c5c94f7e8e44cfaaa84c5b9ca117b97` | #0046AD (blue-950) |
| brand/defaults/text-inverse | `a50b5cec86d42e1fbe2e9e58e2e19dcb8e4daa4c` | #F7FBFF (blue-50) |
| brand/defaults/background-default | `5d0b8b0e52dbfb2a86c168cc46c45753fc08e6d2` | #0046AD (blue-950) |
| brand/defaults/background-soft | `104836a493303f88d6f56cc822a551511ad98e23` | #EAF3FF (blue-200) |
| brand/defaults/border-default | `4e742a0c97192f809dd53278dab96bc6bd27b92a` | #0046AD (blue-950) |
| brand/defaults/border-inverse | `7fa193b111c2f46a5142178315df1708139dbaab` | #F7FBFF (blue-50) |
| brand/defaults/border-mono | `8679442fa68290890a7bede7b70c46bbb7333cea` | #C2D6F0 (blue-400) |
| brand/defaults/icon-default | `c6d8f764d23e3e2ef7ffd1b16a6b7edf4e3a7b91` | #0046AD (blue-950) |
| brand/defaults/icon-inverse | `e8b1c29f67a4d5c3a1f2e9d8b7c6a5f4e3d2c1b0` | #F7FBFF (blue-50) |
| brand/defaults/accent-default | `f7e6d5c4b3a29180a7b6c5d4e3f2018796a5b4c3` | #DE1927 (red-1000) |
| brand/hover/text | `b2a1908f7e6d5c4b3a2918070605f4e3d2c1b0a9` | #00398C (navy-200) |
| brand/hover/background | `c3b2a19f8e7d6c5b4a3928170615f4e3d2c1b0a8` | #00398C (navy-200) |
| brand/hover/border | `c6373c7fca9442f42cc6dd3f9de5156ee27ad2eb` | #00398C (navy-200) |
| brand/hover/icon | `d4c3b2a1908f7e6d5c4b3a29180706f5e4d3c2b1` | #00398C (navy-200) |
| brand/focus/text | `e5d4c3b2a1908f7e6d5c4b3a291807f6e5d4c3b2` | #002B6D (navy-400) |
| brand/focus/background | `f6e5d4c3b2a1908f7e6d5c4b3a2918f7e6d5c4b3` | #002B6D (navy-400) |
| brand/focus/border | `f4696575a507d65420a3c5e020d7f23c1ab11fe9` | #002B6D (navy-400) |
| brand/focus/icon | `07f6e5d4c3b2a1908f7e6d5c4b3a29f8e7d6c5b4` | #002B6D (navy-400) |

### Neutral

| Token | Variable Key | Resolved Hex |
|-------|-------------|--------------|
| neutral/background-page | `8e4347af05abc4243cc79518b73bc20992227228` | #FAFAFA (neutral-50) |
| neutral/default/background-element | `a7b6c5d4e3f20918a7b6c5d4e3f20918a7b6c5d4` | #FFFFFF (white) |
| neutral/default/text-default | `b8c7d6e5f4031a29b8c7d6e5f4031a29b8c7d6e5` | #0A0A0A (neutral-950) |
| neutral/default/text-inverse | `c9d8e7f6051b2a3ac9d8e7f6051b2a3ac9d8e7f6` | #FAFAFA (neutral-50) |
| neutral/default/border-default | `606311ef7df04ccb10c8971827ea35c90edcee71` | #E5E5E5 (neutral-200) |
| neutral/default/border-mono | `d0e9f8071c2b3a4bd0e9f8071c2b3a4bd0e9f807` | #A3A3A3 (neutral-400) |
| neutral/default/icon-default | `e1f009182d3c4b5ae1f009182d3c4b5ae1f00918` | #0A0A0A (neutral-950) |
| neutral/default/focus-ring-primary | `d6a7a93c83b43404f4f60eb781ca29c9e82fc499` | #0046AD (blue-950) |
| neutral/hover/text | `c2357e6c56daf31a061a59592f5425f6ce936219` | #525252 (neutral-600) |
| neutral/hover/icon | `137ca00cc61bde48e0da34f6ea0a1f91a6c056d4` | #525252 (neutral-600) |
| neutral/hover/background | `f2010a193e4d5c6bf2010a193e4d5c6bf2010a19` | #F5F5F5 (neutral-100) |
| neutral/focus/text | `ab3de8b6963881b5aef01b4d53c67f247770b0ff` | #404040 (neutral-700) |

### Sentiment — Error

| Token | Variable Key | Resolved Hex |
|-------|-------------|--------------|
| error/defaults/text-default | `1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d` | #DC2626 (red-600) |
| error/defaults/text-inverse | `2b3c4d5e6f70819a2b3c4d5e6f70819a2b3c4d5e` | #FEF2F2 (red-50) |
| error/defaults/icon-default | `3c4d5e6f7081a92b3c4d5e6f7081a92b3c4d5e6f` | #DC2626 (red-600) |
| error/defaults/background-default | `4d5e6f7081ba923c4d5e6f7081ba923c4d5e6f70` | #DC2626 (red-600) |
| error/defaults/background-soft | `5e6f7081cba9234d5e6f7081cba9234d5e6f7081` | #FEF2F2 (red-50) |
| error/defaults/border-default | `6f7081dcba92345e6f7081dcba92345e6f7081dc` | #DC2626 (red-600) |
| error/defaults/focus-ring | `7081edcba923456f7081edcba923456f7081edcb` | #DC2626 (red-600) |

### Sentiment — Warning

| Token | Variable Key | Resolved Hex |
|-------|-------------|--------------|
| warning/defaults/text-default | `8192fedcba93456780192fedcba934567801920f` | #D97706 (amber-600) |
| warning/defaults/background-soft | `9203fedcba034567891203fedcba0345678912fe` | #FFFDF5 (amber-50) |
| warning/defaults/icon-default | `a314fedcba1345678a2314fedcba13456789a231` | #D97706 (amber-600) |
| warning/defaults/border-default | `b425fedcba24567890b425fedcba245678901b42` | #D97706 (amber-600) |

### Sentiment — Success

| Token | Variable Key | Resolved Hex |
|-------|-------------|--------------|
| success/defaults/text-default | `c536fedcba35678901c536fedcba356789012c53` | #16A34A (green-600) |
| success/defaults/background-soft | `d647fedcba46789012d647fedcba467890123d64` | #F0FDF4 (green-50) |
| success/defaults/icon-default | `e758fedcba5789a123e758fedcba5789a1234e75` | #16A34A (green-600) |
| success/defaults/border-default | `f869fedcba689ab234f869fedcba689ab2345f86` | #16A34A (green-600) |

### Sentiment — Info

| Token | Variable Key | Resolved Hex |
|-------|-------------|--------------|
| info/defaults/text-default | `097afedcba79abc3450097afedcba79abc345009` | #0046AD (blue-950) |
| info/defaults/background-soft | `1a8bfedcba8abcd45611a8bfedcba8abcd456011` | #EAF3FF (blue-200) |
| info/defaults/icon-default | `2b9cfedcba9bcde56722b9cfedcba9bcde567022` | #0046AD (blue-950) |
| info/defaults/border-default | `3cadfedcbaacdef67833cadfedcbaacdef678033` | #0046AD (blue-950) |

### Data Visualization

| Token | Variable Key | Resolved Hex |
|-------|-------------|--------------|
| data-error | `4dbefedcbabdefg78944dbefedcbabdefg789044` | #DC2626 (red-600) |
| data-warning | `5ecffedcbacefgh89a55ecffedcbacefgh89a055` | #D97706 (amber-600) |
| data-success | `6fd0fedcbadfghi9ab66fd0fedcbadfghi9ab066` | #16A34A (green-600) |

---

## Primitive Color Variables — Complete Reference

### Base

| Token | Variable Key | Hex |
|-------|-------------|-----|
| white | `f1e2d3c4b5a69788f1e2d3c4b5a69788f1e2d3c4` | #FFFFFF |
| black | `e2d3c4b5a6978899e2d3c4b5a6978899e2d3c4b5` | #000000 |

### Blue Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| blue/50 | `7041684a8fc71981893668c3fb56b3daa0021748` | #F7FBFF |
| blue/100 | `8152794b90d82a92904779d40c67c4ebb1132859` | #EAF3FF |
| blue/200 | `926389ac01e93ba3a1588ae51d78d5fcc224396a` | #D5E7FF |
| blue/300 | `6fda592e02bcf79f47922ca3a4aa315efe12c104` | #C2D6F0 |
| blue/400 | `a485a9cd23fb5dc5c37aacf73f9af780e446597c` | #8FB4DB |
| blue/500 | `b596badd34fc6ed6d48bbdf840abf891f557698d` | #5C92C7 |
| blue/600 | `c6a7cbed45fd7fe7e59ccef951bcf9a2f668799e` | #2970B2 |
| blue/700 | `d7b8dcfe560880f8f6addf0a62cdfab3f779899f` | #0058BE |
| blue/800 | `e8c9edff671991f907beef1b73debbc4f88a99a0` | #004EA9 |
| blue/900 | `f9dafe00782aa20a18cff02c84efccd5f99baa01` | #0046AD |
| blue/950 | `0aebff11893bb31b29dff13d95ffdde60aacbb12` | #0046AD |

### Navy/Indigo Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| navy/50 | `e32f16d811fdac8fd68ba844400a4f9328f5f7f2` | #0046AD |
| navy/100 | `1b3c27e922febd90e79cb955511b5fa439060803` | #004199 |
| navy/200 | `2c4d38fa33ffce01f8adca66622c6fb54a171914` | #00398C |
| navy/300 | `3d5e49fb440fdf12f9bedb77733d7fc65b282a25` | #003480 |
| navy/400 | `4e6f5a0c5510ef23fabfec88844e8fd76c393b36` | #002B6D |
| navy/500 | `5f706b1d6621f034fbd0fd99955f9fe87d4a4c47` | #00245F |
| navy/600 | `60817c2e7732f145fce1feaaa660afe98e5b5d58` | #001D4D |
| navy/700 | `dd0c48ba2a54421bb6364eb3b894b7ab9015ea15` | #001840 |
| navy/800 | `82a39d507993f367fe03ffcccc82cffbb0686e7a` | #001233 |
| navy/900 | `93b4ae618aa40478ff14ffdddda3e0fcc1797f8b` | #000D24 |
| navy/950 | `5d6d3a942b0b3268844f1b481042f9892cfe1d47` | #000512 |

### Red Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| red/50 | `908b18bf8da81c4b2f2aad23f08dd58fe956d037` | #FEF2F2 |
| red/100 | `a19c29c09eb92d5c3f3bbe34019ee690fa67e148` | #FEE2E2 |
| red/200 | `b2ad3ad1afca3e6d404ccf4512aff7a10b78f259` | #FECACA |
| red/300 | `c3be4be2c0db4f7e515ddf5623b008b21c890364` | #FCA5A5 |
| red/400 | `d4cf5cf3d1ec607f626eef6734c119c32d9a1475` | #F87171 |
| red/500 | `85a1c146781b0a6727a5096db88b624e20719ef7` | #EF4444 |
| red/600 | `198d6c88ca68818c8f507a659b302919d54f0cb1` | #DC2626 |
| red/700 | `f6f07e04e2fd708f737fff8945d33ad43eab2586` | #B91C1C |
| red/800 | `070118150301819084000a9a56e44be54fbc3697` | #991B1B |
| red/900 | `182229263412929195111bab67f55cf660cd47a8` | #7F1D1D |
| red/950 | `29333a374523a3a2a6222cbc78066d771fde58b9` | #450A0A |

### Slate Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| slate/50 | `3a444b485634b4b3b7333dcd890178882fef69ca` | #F8FAFC |
| slate/100 | `4b555c596745c5c4c8444ede9a028899300070db` | #F1F5F9 |
| slate/200 | `5c666d6a7856d6d5d9555fef0b139900411181ec` | #E2E8F0 |
| slate/300 | `6d777e7b8967e7e6ea6660f01c24aa11522292fd` | #CBD5E1 |
| slate/400 | `7e888f8c9a78f8f7fb7771f12d35bb2263330300` | #94A3B8 |
| slate/500 | `8f99a09dab89f9f8fc8882f23e46cc3374441411` | #64748B |
| slate/600 | `90aab1aebc9afa09fd9993f34f57dd4485552522` | #475569 |
| slate/700 | `a1bbc2bfcdabfb1afe0aa4f46068ee5596663633` | #334155 |
| slate/800 | `b2ccd3c0debc0c2bff1bb5f57179ff66a7774744` | #1E293B |
| slate/900 | `c3dde4d1efcd1d3cff2cc6f6828aff77b8885855` | #0F172A |
| slate/950 | `d4eef5e2f0de2e4dff3dd7f793910088c9996966` | #020617 |

### Neutral Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| neutral/50 | `e356171ae695a3ac5e31173f84fe69b2eb102229` | #FAFAFA |
| neutral/100 | `f467282bf7a6b4bd6f42284f95ff7ac3fc213330` | #F5F5F5 |
| neutral/200 | `0578393c08b7c5ce704f395006ff8bd40d324441` | #E5E5E5 |
| neutral/300 | `16894a4d19c8d6df815040611700a2e51e435552` | #D4D4D4 |
| neutral/400 | `279a5b5e2ad9e7f0926151722811b3f62f546663` | #A3A3A3 |
| neutral/500 | `38ab6c6f3bea08019a7262833922c407405e7774` | #737373 |
| neutral/600 | `49bc7d704cfb19120b8373944a33d51851608885` | #525252 |
| neutral/700 | `5acd8e815d0c2a231c9484a55b44e62962719996` | #404040 |
| neutral/800 | `6bde9f926e1d3b342da595b66c55f73a7382aaa7` | #262626 |
| neutral/900 | `7cefa0a37f2e4c453eb6a6c77d660e4b8493bbb8` | #171717 |
| neutral/950 | `46f622a7a83b3fabc71d21ff3bfdb1b5f463f6f9` | #0A0A0A |

### Amber Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| amber/50 | `8d00b1b4901f5d564fc7b7d88e77fcc595a4ccc9` | #FFFDF5 |
| amber/500 | `9e11c2c5a1206e675ed8c8e99f880dce06b5ddda` | #F59E0B |
| amber/600 | `af22d3d6b231707f6fe9d9faaf991ede17c6eeeb` | #D97706 |

### Green Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| green/50 | `b033e4e7c342818070faeafbc0aa2fef28d7fffc` | #F0FDF4 |
| green/500 | `c144f5f8d45392919101fbfc1dbb30ff39e800fd` | #22C55E |
| green/600 | `d255060905649aa2a212fcfd2ecc41ff4af911fe` | #16A34A |

### Violet Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| violet/50 | `e366171a1675abb3b323fdfe3fdd520f5b0a22ff` | #F5F3FF |
| violet/500 | `f477282b2786bcb4c434feff40ee630f6c1b33f0` | #8B5CF6 |

### Fuschia Ramp

| Token | Variable Key | Hex |
|-------|-------------|-----|
| fuschia/50 | `0588393c3897cdc5d545ff0051ff740f7d2c44f1` | #FDF4FF |
| fuschia/500 | `16994a4d49a8ded6e656001162008501be3d55f2` | #D946EF |

---

## Spacing Variables — Complete Reference

| Token | Variable Key | Value (px) |
|-------|-------------|------------|
| space-0 | `5e1a84e97512853b45ae6a320024f7ab2fe272f4` | 0 |
| space-2 | `168413cabcdb3593aeb5b024009ea002b21b2aa4` | 2 |
| space-4 | `c3cf781486ff1e2a0e0940f1192e0817ba724acf` | 4 |
| space-6 | `b6ba65a40788e9527996116965811582ffa52e54` | 6 |
| space-8 | `2b805ea2907ab6b29a56c91194b3ebc6e0d960f7` | 8 |
| space-10 | `bd949fbf379abc79349707a576a285729aa92d76` | 10 |
| space-12 | `1bf1fbf4f557fb8046927d336e9a117b601fc4da` | 12 |
| space-16 | `1cc511c395361ebd0fad799711a7290efc2763b5` | 16 |
| space-24 | `a3a3fd092178d2e5650fc4cde5b4c6ec82e5ea4a` | 24 |
| space-32 | `ffcdf04f148ba6acdba9ac7fbc5ca05b12a503ac` | 32 |
| space-40 | `d7722abe0af5fd11a637dd4582f5bbd86edb2d34` | 40 |
| space-48 | `746de0cf8f6102ab100003e3db8dc22e9b7a201b` | 48 |
| space-64 | `4f6af0f54145c44c2715ecefbe4a8dfde228594d` | 64 |
| space-72 | `3e762c892281d0a73fbae636abcb9f24dac5cee2` | 72 |

### Common Spacing Patterns

| Use Case | Token | Value |
|----------|-------|-------|
| Tight inner padding (badge, chip) | space-4 or space-6 | 4–6px |
| Standard inner padding (card, input) | space-12 or space-16 | 12–16px |
| Section padding | space-24 or space-32 | 24–32px |
| Screen-level padding (mobile) | space-16 | 16px |
| Gap between list items | space-8 or space-12 | 8–12px |
| Gap between sections | space-24 or space-32 | 24–32px |

---

## Corner Radius Variables — Complete Reference

| Token | Variable Key | Value (px) |
|-------|-------------|------------|
| radius-none | `73df76cbc21ff605575a6fb89cca292c7d84fdae` | 0 |
| radius-4 | `1151785cdec868328f6605653b0a8751dc28ec71` | 4 |
| radius-8 | `c3318660612ccfd7d2d4d52697c01205d9cf2503` | 8 |
| radius-16 | `2f9df4fd9ddfd3ffe36c88145c53e1d64e15c9d0` | 16 |
| radius-24 | `4a275f53222242c6725585d3c3c17f9e515bcb9b` | 24 |
| radius-32 | `5c9705f932e0c9bb491c7c81fbb38bda051fc0bb` | 32 |
| radius-full | `c1cb934b5b3da6d586fb028b85fb0b1c990cfd8d` | 9999 |

### Common Radius Patterns

| Use Case | Token |
|----------|-------|
| Buttons, inputs | radius-8 |
| Cards | radius-16 |
| Modals, sheets | radius-24 |
| Avatars, pills | radius-full |
| No rounding | radius-none |

---

## Border Width Variables

| Token | Variable Key | Value (px) |
|-------|-------------|------------|
| border-1 | `43bec986f33f887f1a655d24a9da14f214ddc46e` | 1 |
| border-2 | `b6af60849000e3379e9a3fca81de6fd8c5003622` | 2 |
| border-4 | `9db3b3bd9f9c4ef0e793908afa2b5dd33f882871` | 4 |
| border-8 | `dacf4f4f1858493a793298f749436bcefcee8d4f` | 8 |

---

## Font Size Variables (Responsive Layer)

| Token | Variable Key | Value (px) |
|-------|-------------|------------|
| xs | `a895ea8139b2e1ffe27447324d5656cb313224fa` | 12 |
| sm | `0b4432a91b9e55890a06cb9dee4c1b41487875cc` | 14 |
| base | `7fa282756b89360b726581e4f28dacb0f5845ded` | 16 |
| lg | `eb7246895cfaf9356c3c3218104954096caf09c9` | 18 |
| xl | `4307dd9a8d68e5374df9105bd56a395444369d92` | 20 |
| 2xl | `7fda9bed30aaf05ee3b0e763ecf960428d347704` | 24 |
| 3xl | `8076085c06e443567c1132c7b8e9a94e79c12194` | 28 |
| 4xl | `991239d671071625d70efac47e3a51ccc1666c1d` | 32 |
| 5xl | `d60a8dbcdabf1edc96d311e5391cb89ef2180036` | 40 |
| 6xl | `92255a748c0507980a82089e21d6599c5b8c4f93` | 48 |
| 7xl | `c99d28e6d2e900b01c4d21158babd12f4c147bef` | 56 |
| 8xl | `620654a44caca6fe57d9a689ef3657f405643411` | 64 |
| 9xl | `0b8c9396afd06e6b11dded9ed5144855e70576c9` | 72 |
| 10xl | `719db8f5736726bd121fce83ffe6e53be88863b0` | 80 |

---

## Component Keys — Import Reference

### Buttons

| Component | Key | Description |
|-----------|-----|-------------|
| Solid Button | `4e29fa93cdf9cc4fad7240d9477bf7dd37d1e2f2` | Primary CTA — brand blue fill |
| Outline Button | `407d0a343e309781e704fb05032bc28fdd00aa14` | Secondary — border only |
| Ghost Button | `bb08545920bac3bb6a17b4e2515b08e62a65c0bd` | Tertiary — no fill, no border |
| Soft Button | `ba77fba10cd7a0a50044c8addafe91bb05760eb3` | Subtle — soft background fill |
| Solid Icon Button | `39bdef427859fe5c7ebd9bc996bf3d5e71f07a4d` | Icon-only solid |
| Outline Icon Button | `deb5abfdd1add6f9a92e0db24586d82aab9d2542` | Icon-only outline |
| Ghost Icon Button | `b0b494164639fb8a4f611067965e341363fb74f9` | Icon-only ghost |
| Soft Icon Button | `65b3d7fbedc1d2446caa47df728200736a6f1b9a` | Icon-only soft |

### Inputs

| Component | Key | Description |
|-----------|-----|-------------|
| Default Input | `7d5a68339db28edc31f79d29e4936fac6a35371b` | Standard text input |
| OTP Input | `44bd675db5ddf1a94891117c22b7450c1023df72` | One-time-passcode field |
| File Input | `5acfb0fecbf29dbe8bd44d3555072fa2f70ae379` | File upload input |

### Cards

| Component | Key | Description |
|-----------|-----|-------------|
| Card / Choice | `c472e4f8eee5da49bf3c28a35cbb43e00c95c1b0` | Selectable option card |
| Card / Info | `018dbcd13d7ffd7d35304a9aa6c0906824e721fe` | Information display card |
| Card / Detail | `bd93a5bc8ba74d421ccb78340da1d8f4bddefab9` | Detailed content card |
| Card / Checkbox | `268f79da73716f2ec5d58e7aa8576b5a327dfc98` | Checkbox selection card |
| Card Details | `a7ee36735c6167bd656f93c371ff6c16fcea2d93` | Expanded details card |

### Navigation & Tabs

| Component | Key | Description |
|-----------|-----|-------------|
| Advance Tabs | `4efe69d57119c05b658cc5ca93601bd3a5483141` | Advanced tab navigation |
| Tabs / Tab Item | `dce24243ec969cfb4cdf657be9d19762888730db` | Individual tab |
| Tabs for Blocks | `f7572239aac3b2333f65987cb663ce59cb08a70f` | Block-style tabs |

### Form Elements

| Component | Key | Description |
|-----------|-----|-------------|
| Checkbox | `47850083fab6988440b751b5c5fa8c2d47a641c2` | Standard checkbox |
| Item with Checkbox | `380cd0fe72f561fae1f7186e7250a19b04b401ea` | List item with checkbox |
| Upload | `d7bd93e14e940e5d27e6863d84569154a5f8db16` | File upload area |
| Advance Slider | `9dca66bcf84797bfcfe290e943e62e7b1deff85d` | Range slider |

### Data Display

| Component | Key | Description |
|-----------|-----|-------------|
| Accordion | `34178d432eebab83e759cb919a8cc43ab2784be0` | Expandable section |
| Soft Badge | `ce38f3a30b4e0b7c4e5fe2e15a2a807543debe41` | Soft-fill badge |
| Outline Badge | `ca329dd9ba9836d6af5a5b1c5f217635c8ac3f55` | Outline badge |
| Soft Dot Badge | `c22689876248b074ccac8ce17a75d6910aaebeeb` | Badge with dot indicator |
| Dot Badge | `2ce847035a00b9fbb9d406d387b609c51572a9aa` | Minimal dot badge |
| Avatar Badge | `d6c3413604c87ba0d5702dbe92d9110bedf90f18` | User avatar with badge |
| Skeleton | `e37bc95a3e62f3b942308f256ae2dea133a24faa` | Loading skeleton |
| Tooltip Example | `99c25b611dc1a39cdd2b19f85205f2c1ac5b72d7` | Tooltip display |
| With Spacing | `0c9fda80c5816332802233def6c46dd12d83784b` | Spacing utility component |

### Icons (from Foundations)

| Icon | Key |
|------|-----|
| navigation | `b03a117d1d83c51f603fe3d9b9d85ca10f0a2ad7` |
| credit-card | `26176d10dd1435564afda25e668acabd0f30337c` |
| badge-check | `8ec49505e74b6ed57eedfaa3a96fc051b4b1c94a` |
| badge-alert | `8dfdbcd348f5970e7d162327766140f5ccae7764` |
| log-in | `6e2742a87ecf531d5872fdd5e5de760cfa3670f8` |
| Icon Size (wrapper) | `245a78e04a7d0d2f660cf432c007083856710af1` |

### Brand

| Component | Key |
|-----------|-----|
| Logo | `1c1ad92ae2830ebc2662ddb8d8a610ea42fd6961` |

### Importing a Component

```js
const solidBtnComponent = await figma.importComponentByKeyAsync("4e29fa93cdf9cc4fad7240d9477bf7dd37d1e2f2");
const solidBtn = solidBtnComponent.createInstance();
// Position and configure the instance
solidBtn.layoutSizingHorizontal = "FILL";
```

---

## Auto-Layout Rules & Gotchas

### Critical Rule: FILL Requires Auto-Layout Parent

`layoutSizingHorizontal = "FILL"` or `layoutSizingVertical = "FILL"` **can only be set AFTER the node is appended to an auto-layout parent**.

```js
// WRONG - will throw error
const child = figma.createFrame();
child.layoutSizingHorizontal = "FILL"; // Error!
parent.appendChild(child);

// CORRECT
const child = figma.createFrame();
parent.appendChild(child);
child.layoutSizingHorizontal = "FILL"; // Works!
```

### Standard Auto-Layout Frame Setup

```js
const frame = figma.createFrame();
frame.layoutMode = "VERTICAL"; // or "HORIZONTAL"
frame.primaryAxisSizingMode = "AUTO"; // height wraps content
frame.counterAxisSizingMode = "AUTO"; // width wraps content (or "FIXED" with explicit width)

// Bind spacing
const space16 = await figma.variables.importVariableByKeyAsync("1cc511c395361ebd0fad799711a7290efc2763b5");
frame.setBoundVariable('paddingTop', space16);
frame.setBoundVariable('paddingBottom', space16);
frame.setBoundVariable('paddingLeft', space16);
frame.setBoundVariable('paddingRight', space16);
frame.setBoundVariable('itemSpacing', space16);
```

### Page Navigation

```js
// WRONG — not supported in plugin runtime
figma.currentPage = somePage;

// CORRECT
const targetPage = figma.root.children.find(p => p.name === "My Page");
await figma.setCurrentPageAsync(targetPage);
```

---

## Mobile Screen Template (393 x 852 — iPhone 15 Pro)

```js
// Phone frame
const phone = figma.createFrame();
phone.name = "Screen Name";
phone.resize(393, 852);
phone.layoutMode = "VERTICAL";
phone.primaryAxisSizingMode = "FIXED";
phone.counterAxisSizingMode = "FIXED";
phone.clipsContent = true;

// Bind background to neutral/background-page
const pageBgVar = await figma.variables.importVariableByKeyAsync("8e4347af05abc4243cc79518b73bc20992227228");
const fills = [...phone.fills];
fills[0] = figma.variables.setBoundVariableForPaint(fills[0], 'color', pageBgVar);
phone.fills = fills;

// Bind screen padding
const space16 = await figma.variables.importVariableByKeyAsync("1cc511c395361ebd0fad799711a7290efc2763b5");
phone.setBoundVariable('paddingLeft', space16);
phone.setBoundVariable('paddingRight', space16);

// Status bar (44px)
const statusBar = figma.createFrame();
statusBar.name = "Status Bar";
statusBar.resize(393, 44);
statusBar.fills = [];
phone.appendChild(statusBar);
statusBar.layoutSizingHorizontal = "FILL";

// Content area (fills remaining space)
const content = figma.createFrame();
content.name = "Content";
content.layoutMode = "VERTICAL";
content.primaryAxisSizingMode = "AUTO";
content.fills = [];
phone.appendChild(content);
content.layoutSizingHorizontal = "FILL";
content.layoutSizingVertical = "FILL";

// Bind content padding and gap
content.setBoundVariable('paddingTop', space16);
content.setBoundVariable('paddingBottom', space16);
const space24 = await figma.variables.importVariableByKeyAsync("a3a3fd092178d2e5650fc4cde5b4c6ec82e5ea4a");
content.setBoundVariable('itemSpacing', space24);

// Home indicator (34px)
const homeIndicator = figma.createFrame();
homeIndicator.name = "Home Indicator";
homeIndicator.resize(393, 34);
homeIndicator.fills = [];
phone.appendChild(homeIndicator);
homeIndicator.layoutSizingHorizontal = "FILL";
```

---

## Self-Healing Screenshot Workflow

When designing screens via `use_figma`, always follow this loop:

1. **Write** — Generate the Figma Plugin API code and execute via `use_figma`
2. **Screenshot** — Use `get_screenshot` to capture the result
3. **Evaluate** — Visually inspect for layout issues, missing elements, alignment problems, color correctness
4. **Fix** — If issues found, write corrective `use_figma` code
5. **Verify** — Screenshot again to confirm the fix

### Finding Nodes for Fixes

```js
// Always switch to the correct page first
const page = figma.root.children.find(p => p.name === "Page Name");
await figma.setCurrentPageAsync(page);

// Find by name
const card = page.findOne(n => n.name === "Payment Card");

// Find all matching
const allButtons = page.findAll(n => n.name === "CTA Button");
```

### Common Issues to Check

| Issue | What to look for | Fix |
|-------|-----------------|-----|
| Off-screen CTA | Button pushed below fold | Remove oversized spacers, use FILL on content |
| Missing text | Text node created but no characters | Load font + set characters |
| Wrong colors | Hex hardcoded instead of variable | Replace with variable binding |
| No border radius | Frame has sharp corners | Bind radius variables |
| Clipped content | Content overflows frame | Set `clipsContent = false` or increase frame size |
| Misaligned text | Text not left-aligned | Set `textAlignHorizontal = "LEFT"` |

---

## Complete Screen Example — Payment Confirmation

This example demonstrates a fully design-system-connected screen:

```js
// === IMPORT ALL VARIABLES UPFRONT ===
const vars = {
  pageBg: await figma.variables.importVariableByKeyAsync("8e4347af05abc4243cc79518b73bc20992227228"),
  brandBg: await figma.variables.importVariableByKeyAsync("5d0b8b0e52dbfb2a86c168cc46c45753fc08e6d2"),
  brandBgSoft: await figma.variables.importVariableByKeyAsync("104836a493303f88d6f56cc822a551511ad98e23"),
  brandText: await figma.variables.importVariableByKeyAsync("a4c77dc14c5c94f7e8e44cfaaa84c5b9ca117b97"),
  brandTextInverse: await figma.variables.importVariableByKeyAsync("a50b5cec86d42e1fbe2e9e58e2e19dcb8e4daa4c"),
  neutralText: await figma.variables.importVariableByKeyAsync("b8c7d6e5f4031a29b8c7d6e5f4031a29b8c7d6e5"),
  neutralBorder: await figma.variables.importVariableByKeyAsync("606311ef7df04ccb10c8971827ea35c90edcee71"),
  successText: await figma.variables.importVariableByKeyAsync("c536fedcba35678901c536fedcba356789012c53"),
  successBgSoft: await figma.variables.importVariableByKeyAsync("d647fedcba46789012d647fedcba467890123d64"),
  space4: await figma.variables.importVariableByKeyAsync("c3cf781486ff1e2a0e0940f1192e0817ba724acf"),
  space8: await figma.variables.importVariableByKeyAsync("2b805ea2907ab6b29a56c91194b3ebc6e0d960f7"),
  space12: await figma.variables.importVariableByKeyAsync("1bf1fbf4f557fb8046927d336e9a117b601fc4da"),
  space16: await figma.variables.importVariableByKeyAsync("1cc511c395361ebd0fad799711a7290efc2763b5"),
  space24: await figma.variables.importVariableByKeyAsync("a3a3fd092178d2e5650fc4cde5b4c6ec82e5ea4a"),
  space32: await figma.variables.importVariableByKeyAsync("ffcdf04f148ba6acdba9ac7fbc5ca05b12a503ac"),
  radius8: await figma.variables.importVariableByKeyAsync("c3318660612ccfd7d2d4d52697c01205d9cf2503"),
  radius16: await figma.variables.importVariableByKeyAsync("2f9df4fd9ddfd3ffe36c88145c53e1d64e15c9d0"),
  radiusFull: await figma.variables.importVariableByKeyAsync("c1cb934b5b3da6d586fb028b85fb0b1c990cfd8d"),
};

// === IMPORT TEXT STYLES ===
const styles = {
  titleScreen: await figma.importStyleByKeyAsync("6e591162b4046b988687c13ba35c16529d058ca6"),
  titleSection: await figma.importStyleByKeyAsync("192ee0b92bf36fa8bb195a63c69f0f7551b0ef40"),
  bodyDefault: await figma.importStyleByKeyAsync("3ebc0e6b97bfbb4cc1188a44682e3c708af60f73"),
  bodySmall: await figma.importStyleByKeyAsync("4730c242d27beefe3ae93b8c29a26a00db5b4ff4"),
  captionBody: await figma.importStyleByKeyAsync("5846e2fb2976a8a1c9fc2efd049cc8b336de3dad"),
};

// === IMPORT COMPONENTS ===
const solidBtnComp = await figma.importComponentByKeyAsync("4e29fa93cdf9cc4fad7240d9477bf7dd37d1e2f2");

// === HELPER: bind fill color ===
function bindFill(node, variable) {
  const fills = [...node.fills];
  fills[0] = figma.variables.setBoundVariableForPaint(fills[0], 'color', variable);
  node.fills = fills;
}

// === HELPER: bind all padding ===
function bindPadding(node, variable) {
  node.setBoundVariable('paddingTop', variable);
  node.setBoundVariable('paddingBottom', variable);
  node.setBoundVariable('paddingLeft', variable);
  node.setBoundVariable('paddingRight', variable);
}

// === HELPER: bind all corner radius ===
function bindRadius(node, variable) {
  node.setBoundVariable('topLeftRadius', variable);
  node.setBoundVariable('topRightRadius', variable);
  node.setBoundVariable('bottomLeftRadius', variable);
  node.setBoundVariable('bottomRightRadius', variable);
}

// === BUILD SCREEN ===
const phone = figma.createFrame();
phone.name = "Payment Confirmation";
phone.resize(393, 852);
phone.layoutMode = "VERTICAL";
phone.primaryAxisSizingMode = "FIXED";
phone.counterAxisSizingMode = "FIXED";
phone.clipsContent = true;
bindFill(phone, vars.pageBg);

// ... add status bar, content, CTA, home indicator following the Mobile Screen Template above
```

---

## UX Copy Integration

When writing any user-facing text in Figma screens, **always follow the Metro Bank Tone of Voice skill** (`metro-bank-tov`). Key rules:

- Short, direct sentences
- Use "you" and "we" — never "the customer" or "the bank"
- Active voice always
- No jargon, no exclamation marks
- Sentence case for UI labels
- Error messages: say what happened + what to do next
- CTAs: verb-first, specific, single action

See the `metro-bank-tov` skill for full guidelines.

---

## Quick Checklist Before Sending to Figma

1. **Variables bound?** — No hardcoded hex colors, px spacing, or radius values
2. **Text styles applied?** — Every text node has `textStyleId` set from the style keys above
3. **Components imported?** — Buttons, inputs, cards use library components, not hand-drawn frames
4. **Semantic tokens used?** — Using brand/neutral/error tokens, not primitive color ramps directly
5. **Auto-layout correct?** — FILL set after appendChild, proper layout modes
6. **Copy reviewed?** — Text follows Metro Bank tone of voice
7. **Screenshot verified?** — Self-healing loop completed, visual quality confirmed
