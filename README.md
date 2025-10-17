# The Capsule — INFO 340 Project

This repository contains code for **The Capsule**, an interactive wardrobe web app built for the _Client-Side Web Development_ course (UW iSchool, INFO 340). The Capsule helps you add clothing items, build outfits, and plan weekly looks with client-side interactivity and Firebase-backed data persistence.

**Author:** Jackie Tran • `jackie28@uw.edu`

---

## Overview
The Capsule treats a closet like data you can organize and remix. Add items with a simple form, build outfits in a visual canvas, save them, and (optionally) assign outfits to days on a weekly planner. The project focuses on meaningful interaction, accessible HTML, responsive CSS, and a clear React component structure.

### Core Interactive Features (meets 2.5 requirement)
1. **Add Clothing (Form):** multi-input form creates items and updates the closet grid without a page reload.  
2. **Outfit Builder:** select or drag items into an outfit canvas; live preview shows color swatches and totals; save outfit.  
3. **Planner (Half Feature):** assign saved outfits to Mon–Sun via drag-drop or date selector; updates immediately.

### Routes
- `/closet` — items grid with filters  
- `/builder` — visual outfit builder  
- `/outfit/:id` — outfit detail (path param)  
- `/planner` — weekly planner (optional)  
- `*` — NotFound

### Data Model (Firebase Realtime Database)
- `items/{itemId}`: `{ ownerUid, name, category, color, price, imgUrl }`  
- `outfits/{outfitId}`: `{ ownerUid, name, itemIds[], formality, warmth, totalPrice, palette[], createdAt }`  
- `planner/{uid}/{yyyy-mm-dd}`: `"outfitId"`  
_Optional_: Firebase Storage for item photos.

### Tech Stack
- **Vite** + **React** + **react-router-dom**  
- **Firebase Realtime Database** (+ optional Storage, Auth)  
- One third-party React component (e.g., drag-and-drop or small chart) used meaningfully  
- Responsive CSS (grid/flex + media queries) and accessible HTML

---

## Setup
1. Clone the repo and install dependencies:
   ```bash
   npm install
   npm run dev
