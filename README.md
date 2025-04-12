
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

---

# 📅 Custom Calendar (English)

## 📌 Description  
**Custom Calendar** is a customizable calendar implemented using **HTML**, **CSS**, and **JavaScript**. It supports localized month/day names and advanced theming through JSON configuration files.

### ✨ Features
- 🌍 **Localization**  
  Month and weekday names are loaded from a `lang` JSON file based on the `data-lang` attribute.

- 🗓 **Flexible date formats**  
  Supported formats include:
  - `dd.mm.yyyy.`
  - `dd/mm/yyyy`
  - `dd-mm-yyyy`
  - `yyyy-mm-dd`
  - `mm-dd-yyyy`
  - `dd. MM, yyyy.` *(e.g., 12. April, 2025.)*
  - `MM dd, yyyy` *(e.g., April 12, 2025)*

- 🎨 **Theming support**  
  Theme JSON files control the appearance of calendar elements:
  - `dropdownBackground`, `dropdownTextColor`, `dropdownHoverBackground`
  - `cellHoverOutlineColor`, `otherMonthOutlineColor`

- 🧭 **Interactive UI**  
  Dropdown selectors for month/year, navigation buttons, and clickable days that update the `selected-date` attribute.

- 🗓️ **Adjacent month days**  
  Empty slots in the calendar are filled with dates from previous/next month, styled differently and highlighted on hover.

---

## 🔧 Installation

```bash
git clone https://github.com/your-username/custom_calendar.git
```

Then open `index.html` in your browser.

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
<div class="calendar" data-theme="light"></div>
```

**light.json**
```json
{
  "dropdownBackground": "#fff",
  "dropdownTextColor": "#000",
  "dropdownHoverBackground": "#eee",
  "cellHoverOutlineColor": "#ffcc00",
  "otherMonthOutlineColor": "#ccc"
}
```

---

## 🚀 Usage

1. Set `data-lang` and `data-theme` on the `.calendar` container.
2. Click month or year to open dropdown and select.
3. Click on a day to update the `selected-date`.
4. Hover effects for outside-month days use `otherMonthOutlineColor`.

---

## 👨‍💻 Author

This project is **open-source** and freely modifiable.  
Feel free to contribute or open an **issue** if you encounter bugs or have suggestions.

---
