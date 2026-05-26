## ADDED Requirements

### Requirement: Public feed displays image grid
The system SHALL display a responsive grid of artwork thumbnails on the public feed page (`/`).

#### Scenario: Grid shows all published artworks
- **WHEN** a viewer visits `/`
- **THEN** the page renders all artworks in a multi-column grid layout

#### Scenario: Grid is responsive
- **WHEN** the viewport width changes
- **THEN** the grid adjusts columns (1 col mobile, 2 col tablet, 3-4 col desktop)

### Requirement: Clicking artwork opens detail modal
The system SHALL open a modal overlay when a viewer clicks an artwork thumbnail, showing the full image and description.

#### Scenario: Open modal from grid
- **WHEN** viewer clicks an artwork thumbnail
- **THEN** a modal opens with the full-size image and the artwork's title and description

#### Scenario: Modal is shareable via URL
- **WHEN** the modal is open
- **THEN** the URL SHALL include `?artwork=<id>` so the modal state is shareable

#### Scenario: Close modal
- **WHEN** viewer clicks the close button, presses Escape, or clicks outside the modal
- **THEN** the modal closes and the URL returns to `/`

### Requirement: Image optimization
The system SHALL use Next.js Image component for optimized image delivery.

#### Scenario: Images are optimized
- **WHEN** images are served on the public feed
- **THEN** they SHALL use the Next.js Image component with appropriate sizing and lazy loading
