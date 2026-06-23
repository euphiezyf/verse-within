# Verse Within Design System

## Principles

- Content first: the current verse and next practice action should be the clearest thing on the screen.
- Quiet repetition: visuals should feel calm enough for daily use, with restrained contrast and no decorative noise around scripture text.
- Progressive effort: Read, Hide, Fill, and Recall should feel like one path, while still allowing free choice.
- Trust and recovery: account sync, completion, and deletion states must explain what happened and how to recover.
- Mobile first for practice: phone layouts prioritize the practice card, bottom navigation, and 44px+ touch targets.

## Foundations

The source of truth is the token block at the top of `src/styles.css`.

- Color: use semantic tokens such as `--color-primary`, `--color-surface`, `--color-text-muted`, `--color-danger`, and `--color-success`. Do not add raw hex colors inside components unless creating a new token first.
- Type: use the existing scale from `--text-xs` through `--text-2xl`, plus `--text-page-title`, `--text-verse`, and `--text-token` for responsive reading surfaces.
- Spacing: use the 4px/8px scale, `--space-1` through `--space-8`.
- Shape: use `--radius-sm`, `--radius-md`, and `--radius-pill`.
- Elevation: use `--shadow-sm`, `--shadow-md`, and `--shadow-lg`; avoid one-off shadow values.

## Components

- Primary buttons are reserved for the most important action in the current context.
- Secondary buttons support the main flow but should not compete with the primary action.
- Segmented controls are for mutually exclusive modes, such as Type versus Speak aloud.
- Hint controls are auxiliary toggles and should not be visually grouped as peer modes.
- Cards use `--color-surface` or `--color-surface-soft`, `--color-border`, `--radius-md`, and the shared shadow scale.
- Scripture display surfaces must stay visually quiet: no background illustrations or overlays that compete with text.

## Responsive Rules

- At `max-width: 640px`, practice content comes before navigation settings and account management.
- Bottom navigation remains reachable and respects safe-area padding.
- Text should wrap rather than shrink below readable sizes.
- Avoid horizontal scrolling except for controlled segmented UI where all choices remain tappable.
