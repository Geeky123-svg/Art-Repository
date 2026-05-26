## ADDED Requirements

### Requirement: Admin page is password-protected
The system SHALL require a password to access the `/admin` page. The password SHALL be configured via the `ADMIN_PASSWORD` environment variable.

#### Scenario: Correct password grants access
- **WHEN** viewer enters the correct password from `ADMIN_PASSWORD`
- **THEN** they are redirected to the admin dashboard

#### Scenario: Incorrect password shows error
- **WHEN** viewer enters an incorrect password
- **THEN** an error message is displayed and access is denied

#### Scenario: Protected routes redirect to login
- **WHEN** an unauthenticated viewer visits `/admin`
- **THEN** they are redirected to `/admin/login`

### Requirement: Admin can upload images
The admin dashboard SHALL provide an image upload form that accepts common image formats (JPEG, PNG, WebP) and stores them in `/public/uploads/`.

#### Scenario: Upload a new image
- **WHEN** admin selects an image file and submits the upload form
- **THEN** the image is saved to `/public/uploads/` and a new artwork entry is created

#### Scenario: Upload validates file type
- **WHEN** admin tries to upload a non-image file type
- **THEN** an error is shown and the upload is rejected

### Requirement: Admin can edit artwork descriptions
The admin dashboard SHALL allow editing the title and description of any existing artwork.

#### Scenario: Edit description
- **WHEN** admin updates the title or description field and saves
- **THEN** the artwork data is updated in the JSON data store

#### Scenario: Changes persist after page reload
- **WHEN** admin edits an artwork and refreshes the page
- **THEN** the updated description is still displayed

### Requirement: Admin can delete artworks
The admin dashboard SHALL allow deleting artworks, including the associated image file.

#### Scenario: Delete artwork
- **WHEN** admin clicks delete on an artwork
- **THEN** the artwork entry is removed from the data store and the image file is deleted from `/public/uploads/`
