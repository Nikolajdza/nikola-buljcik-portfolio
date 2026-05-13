/**
 * Single source of truth for personal links and info.
 * Update CV_URL to your Google Drive share link:
 *   1. Open the file in Google Drive
 *   2. Share → Anyone with the link → Copy link
 *   3. Paste here — it opens the PDF in-browser (no server needed)
 *
 * For a forced download use:
 *   https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
 */
export const PERSONAL = {
  name: "Nikola Buljčik",
  email: "nikolajdza@gmail.com",
  github: "https://github.com/Nikolajdza",
  linkedin: "https://www.linkedin.com/in/nikola-buljcik-4aab65205",
  location: "Novi Sad, Serbia",

  /** Google Drive PDF link — replace with your actual link */
  cvUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
} as const;
