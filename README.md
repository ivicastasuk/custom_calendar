# Custom Calendar

## Opis
Custom Calendar je prilagodljivi kalendar implementiran pomoću HTML, CSS i JavaScript. Projekat omogućava prikaz meseca sa lokalizovanim nazivima meseci i skraćenim danima u nedelji, kao i napredne mogućnosti prilagođavanja izgleda pomoću tema definisanih u JSON fajlovima. Kalendar podržava prikaz dana iz prethodnog i narednog meseca, pri čemu se dani koji ne pripadaju tekućem mesecu ističu (na hover) outline-om jedne kontrastne boje. Takođe, interaktivni padajući meniji za izbor meseca i godine prilagođavaju se izabranoj temi.

## Karakteristike
- **Lokalizacija** – Nazivi meseci i skraćeni nazivi dana se učitavaju iz odgovarajućeg JSON fajla. Jezik se menja jednostavnom promenom `data-lang` atributa na `.calendar` elementu.
- **Prilagodljivo formatiranje datuma** – Format datuma se definiše u JSON fajlu pomoću opcije `dateFormat`. Podržani formati su, između ostalog:
  - `dd.mm.yyyy.`
  - `dd/mm/yyyy`
  - `dd-mm-yyyy`
  - `yyyy-mm-dd`
  - `mm-dd-yyyy`
  - `dd. MM, yyyy.` *(gde je MM naziv meseca)*
  - `MM dd, yyyy` *(gde je MM naziv meseca)*
- **Teme i prilagođavanje izgleda** – Svi elementi kalendara, uključujući zaglavlja, ćelije, padajuće menije i outline hover efekat, se stilizuju pomoću teme koja se učitava iz JSON fajla. Tema definiše i boje pozadine, boje teksta, kao i specifične opcije kao što su:
  - `dropdownBackground`, `dropdownTextColor` i `dropdownHoverBackground` – za podešavanje izgleda padajućih menija
  - `cellHoverOutlineColor` – boja outline efekta kada se prelazi mišem preko ćelije
  - `otherMonthOutlineColor` – boja outline efekta (na hover) za dane koji ne pripadaju trenutnom mesecu
- **Interaktivni korisnički interfejs** – Klikabilni elementi (dugmadi za navigaciju, padajući meniji za mesec i godinu) omogućavaju lako biranje datuma. Klikom na dan ažurira se atribut `selected-date` na `.calendar` elementu.
- **Prikaz susednih meseci** – Ukoliko postoje prazna polja u prikazu kalendara, ona se popunjavaju danima iz prethodnog i narednog meseca, koji se prikazuju svetlijom bojom, a dani izvan tekućeg meseca dobijaju hover outline radi bolje vidljivosti.

## Instalacija
1. Klonirajte repozitorijum:
   ```sh
   git clone https://github.com/vas-korisnicki-nalog/custom_calendar.git
   ```
2. Otvorite projekat u Visual Studio Code ili omiljenom editoru.
3. Pokrenite `index.html` fajl u pretraživaču.

## Konfiguracija
- **Promena jezika:**  
  Postavite `data-lang` atribut na `.calendar` elementu na željeni jezik (npr. `en`, `sr`, `de` itd.) i kreirajte odgovarajući JSON fajl (npr. `sr.json`) koji sadrži:
  ```json
  {
    "months": ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
    "weekdays": ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
    "dateFormat": "dd. MM, yyyy."
  }
  ```
- **Izbor teme:**  
  Tema se menja postavljanjem `data-theme` atributa na `.calendar` elementu. Teme se učitavaju iz JSON fajlova u folderu `themes`. U njima se definišu opcije za boje pozadine, boje teksta, kao i stilovi za padajuće menije i outline efekat na hover.
- **Prilagođavanje izgleda:**  
  Stilovi se dalje mogu prilagoditi u `style.css` fajlu, gde su definisane varijacije veličina kalendara i proporcije paddinga za različite veličine.

## Kako koristiti
1. Prilagodite jezik i temu iz atributa na `.calendar` elementu u `index.html`.
2. Klikom na naziv meseca ili godine otvorite padajući meni i izaberite željenu vrednost.
3. Klikom na dan označite selektovani datum; datum se čuva kao atribut `selected-date` na `.calendar` elementu.
4. Kada pređete mišem preko dana koji ne pripadaju trenutnom mesecu, prikazuje se outline u kontrastnoj boji definisanoj u temi.

## Autorstvo
Ovaj projekat je besplatan i može se prilagoditi prema potrebama.  
Ukoliko imate bilo kakvih pitanja ili pronađete greške, slobodno otvorite "issue" u repozitorijumu.

