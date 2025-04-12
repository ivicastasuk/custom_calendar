# Custom Calendar

## Opis
Custom Calendar je prilagodljivi kalendar implementiran pomoću HTML, CSS i JavaScript. Projekat omogućava prikaz meseca sa lokalizovanim nazivima meseci i skraćenim danima u nedelji. Kalendar podržava prikaz dana iz prethodnog i narednog meseca, kao i izbor datuma putem padajućih menija za mesec i godinu.

## Karakteristike
- **Lokalizacija** – Nazivi meseci i skraćeni nazivi dana se učitavaju iz JSON fajla, što omogućava promenu jezika jednostavnom promenom `data-lang` atributa na `.calendar` elementu.
- **Prilagodljivo formatiranje datuma** – Format datuma se može definisati u JSON fajlu pomoću opcije `dateFormat`. Podržani formati:  
  - `dd.mm.yyyy.`  
  - `dd/mm/yyyy`  
  - `dd-mm-yyyy`  
  - `yyyy-mm-dd`  
  - `mm-dd-yyyy`  
  - `dd. MM, yyyy.` *(gde je MM naziv meseca)*  
  - `MM dd, yyyy` *(gde je MM naziv meseca)*
- **Korisnički interfejs** – Klikabilni elementi sa interaktivnim padajućim menijima za izbor meseca i godine. Klikom na dan se ažurira atribut `selected-date` elementa kalendara.
- **Prikaz susednih meseci** – Ukoliko postoje prazna polja u prikazu kalendara, ona se popunjavaju danima iz prethodnog i narednog meseca, koji se prikazuju svetlijom bojom.

## Instalacija
1. Klonirajte repozitorijum:
   ```sh
   git clone https://github.com/vas-korisnicki-nalog/custom_calendar.git
   ```
2. Otvorite projekat u Visual Studio Code ili omiljenom editoru.
3. Pokrenite `index.html` fajl u pretraživaču.

## Konfiguracija
- **Promena jezika:**  
  Postavite `data-lang` atribut na `.calendar` elementu na željeni jezik (npr. `en`, `sr`, `de` itd.), i obavezno kreirajte odgovarajući JSON fajl (npr. `sr.json`) koji sadrži:
  ```json
  {
    "months": ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
    "weekdays": ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
    "dateFormat": "dd. MM, yyyy."
  }
  ```

- **Prilagođavanje izgleda:**  
  Stilovi se mogu prilagoditi u `style.css` fajlu.

## Kako koristiti
1. Prilagodite jezik promjenom `data-lang` atributa.
2. Klikom na naziv meseca ili godine otvorite padajući menij i izaberite željenu vrednost.
3. Klikom na dan označite selektovani datum, koji će se čuvati kao atribut `selected-date` na `.calendar` elementu.

## Autorstvo
Ovaj projekat je besplatan i može se prilagođavati prema potrebama.

---
Ukoliko imate bilo kakvih pitanja ili pronađete greške, slobodno otvorite "issue" u repozitorijumu.

