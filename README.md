🏏 ScoreCard v2

ScoreCard is a premium, mobile-first cricket scoring engine designed for
street, club, and amateur matches. Built with React, Recoil, and
Tailwind CSS, it offers a lightning-fast, “app-like” experience directly
in the browser.

---

✨ Key Features

- Dynamic Match Configuration: Set custom overs, wickets, and team
  names with a modern, tactile UI.
- Unique Team Identity: Custom color picker for each team with
  collision detection (prevents both teams from picking the same
  color).
- Smart Chase Logic: A dedicated 2nd-innings Target Widget that
  calculates runs needed and balls remaining in real-time.
- Adaptive UI: Mobile-shell design with glassmorphism headers, smooth
  animations, and Bento Box layouts.
- Type-Safe Scoring: Robust internal logic to handle data extraction
  from Recoil atoms, preventing NaN or Object-rendering errors.

---

🚀 Tech Stack

React 18 — UI Library Recoil — Global State Management (Atoms/Selectors)
Tailwind CSS — Utility-first styling & Animations FontAwesome — Premium
Iconography React Router — Seamless page transitions

---

📖 How to Use

1. Match Setup

On the Home screen, enter the names of the competing teams. Use the
Jersey Color circles to give each team a distinct look. Set your match
rules (Overs and Wickets) and hit “Enter Arena.”

2. Scoring

The Arena is designed for one-handed use. Tap the run buttons to update
the score instantly. The app automatically tracks:

- Over completion
- Wicket falls
- Innings transitions

3. The Chase

Once the first innings ends, the Target Card will automatically appear.
It provides a Live Goal showing exactly how many runs are needed from
the remaining balls, paired with a vertical progress bar.

---

🔧 Installation & Setup

Clone the repository:

git clone https://github.com/Mahi-Teja/Score-Board.git

Install dependencies:

npm install

Start the development server:

npm run dev

---

🎨 Design Philosophy

The app follows a “Depth & Tactility” philosophy. Every interaction is
designed to feel physical.

Colors: High-contrast neutrals (#171717) paired with a vibrant dominant
brand color.

Shapes: Extra-large border-radius (32px+) to mimic modern mobile OS
standards.

---

📝 License

Distributed under the MIT License.

Built with love for the Sport Community.
