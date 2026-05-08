# TripPlanner Engine ✈️🌍

A premium, dynamic web application designed to craft personalized travel itineraries in real-time. Built entirely with clean vanilla web technologies, this project delivers a stunning glassmorphism user interface without relying on heavy frontend frameworks or backend dependencies.

## 🌟 Key Features

*   **Real-Time Dynamic Planner:** Adjust your budget, destination vibe, and interests to see instant updates to your custom itinerary and travel recommendations.
*   **Curated Experiences:** Browse exclusive travel packages and explore in-depth package details with immersive hero images.
*   **Interactive Booking Flow:** Securely simulate booking travel packages with custom travel dates and passenger counts.
*   **Persistent User Profiles:** Update your profile name, title, and avatar (via file upload). Data is securely stored using the browser's `localStorage` and synchronized across all pages.
*   **Dynamic Itinerary Dashboard:** Any newly booked trips automatically appear in the "Upcoming Trips" section of your user profile.
*   **Premium Glassmorphism UI:** Features beautiful frosted-glass panels, animated ambient backgrounds, and micro-animations for an elevated user experience.

## 🛠️ Technology Stack

*   **HTML5:** Semantic and structured page layouts.
*   **Vanilla CSS3:** Custom design system utilizing CSS Variables, Flexbox, CSS Grid, and Keyframe animations.
*   **Vanilla JavaScript:** Clean DOM manipulation, modular functions, and native `localStorage` for state management.
*   **Zero Dependencies:** No Node.js, React, or third-party libraries required.

## 🚀 How to Run Locally

Since this is a client-side application, running it is incredibly simple.

### Option 1: XAMPP / Local Server (Recommended)
1. Ensure the project folder (`trip-planner`) is located inside your `htdocs` directory (e.g., `C:\xampp\htdocs\trip-planner`).
2. Start the Apache server from your XAMPP Control Panel.
3. Open your web browser and navigate to: `http://localhost/trip-planner/`

### Option 2: Direct File Access
Alternatively, you can just open the `index.html` file directly in any modern web browser (Chrome, Firefox, Safari, Edge). Because the app uses native `localStorage` instead of server-side databases, all dynamic features and profile saving will function normally.

## 📂 File Structure

```text
trip-planner/
│
├── index.html               # The "Discover" page showing trending destinations
├── planner.html             # The dynamic real-time trip planner interface
├── experiences.html         # Curated list of exclusive travel packages
├── package-details.html     # Detailed view of a specific travel package with booking
├── profile.html             # User profile dashboard and trip manager
│
├── css/
│   └── styles.css           # Global stylesheet containing all design tokens & themes
│
└── js/
    └── app.js               # Core logic for planner updates, profile sync, and bookings
```

## 🔒 Privacy & Data

All profile information, image uploads (converted to base64), and booking histories are stored entirely client-side using `localStorage`. No data is ever sent to external servers, ensuring a fully private and offline-capable experience.
