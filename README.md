# 📅 Custom Calendar

## 📌 Opis  
**Custom Calendar** je prilagodljivi kalendar izrađen pomoću **HTML**, **CSS** i **JavaScript**. Omogućava lokalizovan prikaz meseca i dana u nedelji, kao i detaljno prilagođavanje izgleda pomoću tema definisanih u **JSON** fajlovima.

### ✨ Glavne karakteristike
- 🌍 **Lokalizacija**  
  Učitavanje naziva meseci i dana u nedelji iz `lang` JSON fajla prema atributu `data-lang`.
  
- 🗓 **Fleksibilni formati datuma**  
  Podržani formati uključuju:
  - `dd.mm.yyyy.`
  - `dd/mm/yyyy`
  - `dd-mm-yyyy`
  - `yyyy-mm-dd`
  - `mm-dd-yyyy`
  - `dd. MM, yyyy.` *(npr. 12. April, 2025.)*
  - `MM dd, yyyy` *(April 12, 2025)*

- 🎨 **Teme i stilizacija**  
  Tema definiše izgled svih elemenata kalendara kroz JSON fajl:
  - `dropdownBackground`, `dropdownTextColor`, `dropdownHoverBackground`
  - `cellHoverOutlineColor`, `otherMonthOutlineColor`

- 🧭 **Interaktivan UI**  
  Padajući meniji za izbor meseca i godine, navigacija između meseci, klikabilni dani koji ažuriraju `selected-date` atribut.

- 🗓️ **Prikaz dana iz susednih meseci**  
  Popunjavanje praznih ćelija danima iz prethodnog i sledećeg meseca, uz vizuelno razlikovanje i hover efekat (outline).

---

## 🔧 Instalacija

```bash
git clone https://github.com/vas-korisnicki-nalog/custom_calendar.git
```

Zatim otvorite `index.html` u pretraživaču.

---

## 📏 Promena veličine kalendara

Možete koristiti `data-size` atribut da podesite veličinu kalendara. Podržane vrednosti su:
- `sm` – mala veličina
- `md` – srednja veličina
- `nm` – normalna veličina
- `lg` – velika veličina
- `xl` – ekstra velika veličina

Primer:
```html
<div class="calendar" data-lang="sr" data-theme="dark" data-size="lg"></div>
```

---

## 🧩 Integracija u druge projekte

Da biste integrisali **Custom Calendar** u sopstveni projekat:

1. Kopirajte sledeće fajlove u vaš projekat:
   - `calendar.js`
   - `calendar.css`
   - jezičke fajlove, folder `lang/`
   - tematske fajlove, folder `themes/`

2. U HTML fajl dodajte:
   ```html
   <link rel="stylesheet" href="putanja/do/calendar.css">
   <script src="putanja/do/calendar.js" defer></script>

   <div class="calendar" data-lang="sr" data-theme="dark" data-size="nm"></div>
   ```

3. Prilagodite `data-lang` i `data-theme` atribute u zavisnosti od željene konfiguracije.

> Napomena: Kalendar će se automatski renderovati kada se stranica učita, koristeći atribute za jezik i temu.

---

## ⚙️ Konfiguracija

### 📌 Jezik

```html
<div class="calendar" data-lang="sr"></div>
```

**sr.json**
```json
{
  "months": ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
  "weekdays": ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
  "dateFormat": "dd. MM, yyyy."
}
```

### 🎨 Tema

```html
<div class="calendar" data-theme="dark"></div>
```

**dark.json**
```json
{
  "dropdownBackground": "#222",
  "dropdownTextColor": "#fff",
  "dropdownHoverBackground": "#444",
  "cellHoverOutlineColor": "#ff0",
  "otherMonthOutlineColor": "#f0f"
}
```

---

## 🚀 Kako koristiti

1. Postavite `data-lang` i `data-theme` atribute.
2. Klikom na mesec/godinu otvorite meni i izaberite.
3. Klikom na dan ažurira se `selected-date`.
4. Hover outline za dane van trenutnog meseca se koristi iz teme.

---

## 👨‍💻 Autorstvo

Ovaj projekat je **open-source** i može se slobodno koristiti i prilagođavati.  
Za pitanja ili predloge, otvorite novi **issue**.

---

# 📅 Custom Calendar (English)

## 📌 Description  
**Custom Calendar** is a customizable calendar built using **HTML**, **CSS**, and **JavaScript**. It offers localized display of months and weekdays, as well as detailed theming options via **JSON** configuration files.

### ✨ Key Features
- 🌍 **Localization**  
  Month and weekday names are loaded from a `lang` JSON file based on the `data-lang` attribute.
  
- 🗓 **Flexible Date Formats**  
  Supported formats include:
  - `dd.mm.yyyy.`
  - `dd/mm/yyyy`
  - `dd-mm-yyyy`
  - `yyyy-mm-dd`
  - `mm-dd-yyyy`
  - `dd. MM, yyyy.` *(e.g., 12. April, 2025.)*
  - `MM dd, yyyy` *(e.g., April 12, 2025)*

- 🎨 **Themes and Styling**  
  The theme controls the look of all calendar elements through a JSON file:
  - `dropdownBackground`, `dropdownTextColor`, `dropdownHoverBackground`
  - `cellHoverOutlineColor`, `otherMonthOutlineColor`

- 🧭 **Interactive UI**  
  Dropdown menus for selecting month and year, month navigation, and clickable days that update the `selected-date` attribute.

- 🗓️ **Display of Adjacent Month Days**  
  Empty calendar cells are filled with dates from the previous or next month, styled differently and outlined on hover for visibility.

---

## 🔧 Installation

```bash
git clone https://github.com/your-username/custom_calendar.git
```

Then open `index.html` in your browser.

---

## 📏 Calendar Size Adjustment

You can use the `data-size` attribute to control the size of the calendar. Supported values are:
- `sm` – small
- `md` – medium
- `nm` – normal
- `lg` – large
- `xl` – extra large

Example:
```html
<div class="calendar" data-lang="en" data-theme="dark" data-size="lg"></div>
```

---

## 🧩 Integration in Other Projects

To integrate **Custom Calendar** into your own project:

1. Copy the following files to your project:
   - `calendar.js`
   - `calendar.css`
   - language files (`lang/` folder)
   - theme files (`themes/` folder)

2. Add the following to your HTML:
   ```html
   <link rel="stylesheet" href="path/to/calendar.css">
   <script src="path/to/calendar.js" defer></script>

   <div class="calendar" data-lang="en" data-theme="dark" data-size="nm"></div>
   ```

3. Customize the `data-lang` and `data-theme` attributes as needed.

> Note: The calendar will render automatically when the page loads, using the specified language and theme attributes.

---

## ⚙️ Configuration

### 📌 Language

```html
<div class="calendar" data-lang="en"></div>
```

**en.json**
```json
{
  "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "weekdays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "dateFormat": "MM dd, yyyy"
}
```

### 🎨 Theme

```html
<div class="calendar" data-theme="dark"></div>
```

**dark.json**
```json
{
  "dropdownBackground": "#222",
  "dropdownTextColor": "#fff",
  "dropdownHoverBackground": "#444",
  "cellHoverOutlineColor": "#ff0",
  "otherMonthOutlineColor": "#f0f"
}
```

---

## 🚀 How to Use

1. Set the `data-lang` and `data-theme` attributes.
2. Click on the month/year label to open the dropdown menu and select a value.
3. Click on a day to set the `selected-date` attribute.
4. Hover outlines for outside-month days use the `otherMonthOutlineColor` defined in the theme.

---

## 👨‍💻 Author

This project is **open-source** and can be freely used and modified.  
For questions or suggestions, feel free to open a new **issue**.

---
