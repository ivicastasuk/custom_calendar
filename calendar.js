document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.querySelector('.calendar');
    if (!calendarContainer) {
        console.error('No element with class "calendar" found.');
        return;
    }

    // Get language and theme from attributes; default values if not provided.
    const lang = calendarContainer.getAttribute('data-lang') || 'en';
    const themeName = calendarContainer.getAttribute('data-theme') || 'default';
    const size = calendarContainer.getAttribute('data-size') || 'md';
    calendarContainer.classList.add(`calendar-${size}`);

    // Default current date settings
    let currentDate = new Date();
    let selectedMonth = currentDate.getMonth();
    let selectedYear = currentDate.getFullYear();
    let selectedDate = new Date(currentDate);

    let monthNames = [];
    let weekdayNames = [];
    let dateFormat = "yyyy-mm-dd";
    let currentTheme = {}; // Global variable to store the current theme

    function formatDate(date, format) {
        const day = ("0" + date.getDate()).slice(-2);
        const numericMonth = ("0" + (date.getMonth() + 1)).slice(-2);
        const monthName = monthNames[ date.getMonth() ] || numericMonth;
        const year = date.getFullYear();
        let formatted = format;
        formatted = formatted.replace(/yyyy/g, year)
            .replace(/dd/g, day)
            .replace(/MM/g, monthName)
            .replace(/mm/g, numericMonth);
        return formatted;
    }

    // Load language JSON
    function loadLocalizedMonths() {
        return fetch(`./lang/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load language file for ${lang}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data.months || !Array.isArray(data.months)) {
                    throw new Error('Invalid language file format: missing months');
                }
                monthNames = data.months;
                if (data.weekdays && Array.isArray(data.weekdays)) {
                    weekdayNames = data.weekdays;
                } else {
                    weekdayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
                }
                if (data.dateFormat) {
                    dateFormat = data.dateFormat;
                }
            })
            .catch(error => {
                console.error(error);
                monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
                weekdayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
            });
    }

    // Load theme JSON based on data-theme attribute.
    function loadTheme(theme) {
        return fetch(`./themes/${theme}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load theme file for ${theme}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return {}; // Fallback to no theme settings
            });
    }

    // Apply theme settings by creating a dynamic style tag.
    function applyTheme(themeSettings) {
        let cssRules = "";
        if (themeSettings.calendarBackground) {
            cssRules += `.calendar { background-color: ${themeSettings.calendarBackground}; } `;
        }
        if (themeSettings.textColor) { // overall text color
            cssRules += `.calendar { color: ${themeSettings.textColor}; } `;
        }
        if (themeSettings.headerBackground) {
            cssRules += `.calendar-header { background-color: ${themeSettings.headerBackground}; } `;
        }
        if (themeSettings.headerTextColor) {
            cssRules += `.calendar-header { color: ${themeSettings.headerTextColor}; } `;
        }
        if (themeSettings.cellBackground) {
            cssRules += `.calendar-cell { background-color: ${themeSettings.cellBackground}; } `;
        }
        if (themeSettings.cellColor) {
            cssRules += `.calendar-cell { color: ${themeSettings.cellColor}; } `;
        }
        if (themeSettings.cellTextColor) { // additional support for cell text color
            cssRules += `.calendar-cell { color: ${themeSettings.cellTextColor}; } `;
        }
        if (themeSettings.dayHeaderBackground) {
            cssRules += `.calendar-day-header { background-color: ${themeSettings.dayHeaderBackground}; } `;
        }
        if (themeSettings.dayHeaderColor) {
            cssRules += `.calendar-day-header { color: ${themeSettings.dayHeaderColor}; } `;
        }
        if (themeSettings.dayHeaderTextColor) { // additional support for day header text color
            cssRules += `.calendar-day-header { color: ${themeSettings.dayHeaderTextColor}; } `;
        }
        // Dropdown support: set background, text color, and hover background for dropdown items
        if (themeSettings.dropdownBackground) {
            cssRules += `.dropdown-item { background-color: ${themeSettings.dropdownBackground}; } `;
        }
        if (themeSettings.dropdownTextColor) {
            cssRules += `.dropdown-item { color: ${themeSettings.dropdownTextColor}; } `;
        }
        if (themeSettings.dropdownHoverBackground) {
            cssRules += `.dropdown-item:hover { background-color: ${themeSettings.dropdownHoverBackground} !important; } `;
        }

        if (cssRules) {
            const styleTag = document.createElement('style');
            styleTag.textContent = cssRules;
            document.head.appendChild(styleTag);
        }
    }

    function renderCalendar(month, year) {
        calendarContainer.innerHTML = '';
        calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));

        const headerDiv = document.createElement('div');
        headerDiv.className = 'calendar-header';
        headerDiv.style.position = 'relative';

        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.addEventListener('click', function () {
            month === 0 ? (month = 11, year--) : month--;
            renderCalendar(month, year);
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', function () {
            month === 11 ? (month = 0, year++) : month++;
            renderCalendar(month, year);
        });

        const titleContainer = document.createElement('div');
        titleContainer.style.display = 'inline-block';

        const monthSpan = document.createElement('span');
        monthSpan.textContent = monthNames[ month ];
        monthSpan.style.cursor = 'pointer';
        monthSpan.addEventListener('click', function (event) {
            event.stopPropagation();
            let existingDropdown = headerDiv.querySelector('.month-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
                return;
            }
            const dropdown = document.createElement('div');
            dropdown.className = 'month-dropdown';
            dropdown.style.position = 'absolute';
            dropdown.style.top = '30px';
            dropdown.style.left = '50%';
            dropdown.style.transform = 'translateX(-50%)';
            dropdown.style.border = '1px solid #ccc';
            dropdown.style.backgroundColor = '#fff';
            dropdown.style.zIndex = '10';
            dropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            // Ensure dropdown fits within the calendar container
            dropdown.style.width = calendarContainer.offsetWidth + "px";
            dropdown.style.boxSizing = "border-box";

            monthNames.forEach(function (m, index) {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = m;
                item.style.padding = '5px 10px';
                item.style.cursor = 'pointer';
                // Center the text in each dropdown item
                item.style.textAlign = 'center';
                item.addEventListener('click', function () {
                    selectedMonth = index;
                    dropdown.remove();
                    renderCalendar(selectedMonth, year);
                });
                dropdown.appendChild(item);
            });
            headerDiv.appendChild(dropdown);
        });

        const spaceText = document.createTextNode(' ');

        const yearSpan = document.createElement('span');
        yearSpan.textContent = year;
        yearSpan.style.cursor = 'pointer';
        yearSpan.addEventListener('click', function (event) {
            event.stopPropagation();
            let existingDropdown = headerDiv.querySelector('.year-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
                return;
            }
            const dropdown = document.createElement('div');
            dropdown.className = 'year-dropdown';
            dropdown.style.position = 'absolute';
            dropdown.style.top = '30px';
            dropdown.style.left = '50%';
            dropdown.style.transform = 'translateX(-50%)';
            dropdown.style.border = '1px solid #ccc';
            dropdown.style.backgroundColor = '#fff';
            dropdown.style.zIndex = '10';
            dropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            dropdown.style.maxHeight = '200px';
            dropdown.style.overflowY = 'auto';
            // Ensure dropdown fits within the calendar container
            dropdown.style.width = calendarContainer.offsetWidth + "px";
            dropdown.style.boxSizing = "border-box";

            for (let yr = 1901; yr <= 2099; yr++) {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = yr;
                item.style.padding = '5px 10px';
                item.style.cursor = 'pointer';
                // Center the text in each dropdown item
                item.style.textAlign = 'center';
                item.addEventListener('click', function () {
                    selectedYear = yr;
                    dropdown.remove();
                    renderCalendar(month, selectedYear);
                });
                dropdown.appendChild(item);
            }
            headerDiv.appendChild(dropdown);

            const selectedIndex = selectedYear - 1901;
            const selectedItem = dropdown.querySelector(`.dropdown-item:nth-child(${selectedIndex + 1})`);
            if (selectedItem) {
                dropdown.scrollTop = selectedItem.offsetTop - (dropdown.offsetHeight / 2) + (selectedItem.offsetHeight / 2);
            }
        });

        titleContainer.appendChild(monthSpan);
        titleContainer.appendChild(spaceText);
        titleContainer.appendChild(yearSpan);

        headerDiv.appendChild(prevButton);
        headerDiv.appendChild(titleContainer);
        headerDiv.appendChild(nextButton);
        calendarContainer.appendChild(headerDiv);

        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        const orderedWeekdays = weekdayNames.slice(1).concat(weekdayNames[ 0 ]);
        orderedWeekdays.forEach(function (day) {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        let firstDayIndex = new Date(year, month, 1).getDay();
        firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

        // Inside renderCalendar, for previous month days:
        for (let i = 0; i < firstDayIndex; i++) {
            const dayNum = daysInPrevMonth - firstDayIndex + i + 1;
            const otherCell = document.createElement('div');
            otherCell.className = 'calendar-cell other-month';
            otherCell.textContent = dayNum;
            otherCell.addEventListener('click', function () {
                selectedDate = new Date(prevYear, prevMonth, dayNum, 12);
                calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));
                renderCalendar(month, year);
            });
            // Add outline on hover only for dates outside the current month
            otherCell.addEventListener('mouseover', function () {
                otherCell.style.outline = currentTheme && currentTheme.otherMonthOutlineColor ?
                    `2px solid ${currentTheme.otherMonthOutlineColor}` : "2px dashed #ccc";
            });
            otherCell.addEventListener('mouseout', function () {
                otherCell.style.outline = "";
            });
            grid.appendChild(otherCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell';
            dayCell.textContent = day;
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayCell.classList.add('today');
            }
            if (day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                dayCell.classList.add('selected');
            }
            dayCell.addEventListener('click', function () {
                selectedDate = new Date(year, month, day, 12);
                calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));
                renderCalendar(month, year);
            });

            // Add mouseover and mouseout events for hover outline
            dayCell.addEventListener('mouseover', function () {
                // Use the cellHoverOutlineColor from themeSettings if defined; fallback to bright yellow
                dayCell.style.outline = currentTheme && currentTheme.cellHoverOutlineColor ?
                    `2px solid ${currentTheme.cellHoverOutlineColor}` : "2px solid #ff0";
            });
            dayCell.addEventListener('mouseout', function () {
                dayCell.style.outline = "";
            });

            grid.appendChild(dayCell);
        }

        const totalCells = grid.children.length;
        const trailingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        // And in the trailing cells loop (next month days):
        for (let j = 1; j <= trailingCells; j++) {
            const otherCell = document.createElement('div');
            otherCell.className = 'calendar-cell other-month';
            otherCell.textContent = j;
            otherCell.addEventListener('click', function () {
                let nextMonth = month === 11 ? 0 : month + 1;
                let nextYear = month === 11 ? year + 1 : year;
                selectedDate = new Date(nextYear, nextMonth, j, 12);
                calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));
                renderCalendar(month, year);
            });
            // Add outline on hover only for dates outside the current month
            otherCell.addEventListener('mouseover', function () {
                otherCell.style.outline = currentTheme && currentTheme.otherMonthOutlineColor ?
                    `2px solid ${currentTheme.otherMonthOutlineColor}` : "2px dashed #ccc";
            });
            otherCell.addEventListener('mouseout', function () {
                otherCell.style.outline = "";
            });
            grid.appendChild(otherCell);
        }

        calendarContainer.appendChild(grid);
    }

    document.addEventListener('click', function () {
        const monthDropdown = document.querySelector('.month-dropdown');
        if (monthDropdown) {
            monthDropdown.remove();
        }
        const yearDropdown = document.querySelector('.year-dropdown');
        if (yearDropdown) {
            yearDropdown.remove();
        }
    });

    // Load language and theme then render calendar
    Promise.all([ loadLocalizedMonths(), loadTheme(themeName) ]).then(function (results) {
        currentTheme = results[ 1 ]; // Global variable to be used in renderCalendar
        if (Object.keys(currentTheme).length > 0) {
            applyTheme(currentTheme);
        }
        renderCalendar(selectedMonth, selectedYear);
    });
});