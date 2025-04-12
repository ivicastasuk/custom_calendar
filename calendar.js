document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.querySelector('.calendar');
    if (!calendarContainer) {
        console.error('No element with class "calendar" found.');
        return;
    }

    // Get language from data-lang attribute; default to 'en'
    const lang = calendarContainer.getAttribute('data-lang') || 'en';

    // Default current date settings
    let currentDate = new Date();
    let selectedMonth = currentDate.getMonth();
    let selectedYear = currentDate.getFullYear();
    // Initially, the selected date is today
    let selectedDate = new Date(currentDate);

    let monthNames = [];
    let weekdayNames = [];
    // Default format if not provided in JSON
    let dateFormat = "yyyy-mm-dd";

    // Helper function to format date according to a format string.
    // Supported tokens: dd, mm, yyyy
    function formatDate(date, format) {
        const day = ("0" + date.getDate()).slice(-2);
        const numericMonth = ("0" + (date.getMonth() + 1)).slice(-2);
        // Use localized month name from monthNames; fallback to numeric month if not available
        const monthName = monthNames[ date.getMonth() ] || numericMonth;
        const year = date.getFullYear();

        // Replace tokens. Order matters: replace "yyyy" and "dd" first,
        // then replace "MM" (month name) before replacing "mm" (numeric month).
        let formatted = format;
        formatted = formatted.replace(/yyyy/g, year)
            .replace(/dd/g, day)
            .replace(/MM/g, monthName)
            .replace(/mm/g, numericMonth);
        return formatted;
    }

    // Function to load localized month and weekday names from a JSON file;
    // JSON file is expected to have the format:
    // {
    //   "months": ["January", "February", ...],
    //   "weekdays": ["Sun", "Mon", ...],
    //   "dateFormat": "dd/mm/yyyy"  // optional
    // }
    function loadLocalizedMonths() {
        return fetch(`${lang}.json`)
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
                    // Fallback to English abbreviations if not provided
                    weekdayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
                }
                if (data.dateFormat) {
                    dateFormat = data.dateFormat;
                }
            })
            .catch(error => {
                console.error(error);
                // Fallback to English if language file is not found or invalid
                monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                weekdayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
            });
    }

    function renderCalendar(month, year) {
        // Clear existing calendar content
        calendarContainer.innerHTML = '';
        // Use the formatDate helper to format the selected date
        calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));

        // Create header for month navigation and title container
        const headerDiv = document.createElement('div');
        headerDiv.className = 'calendar-header';
        headerDiv.style.position = 'relative'; // for positioning dropdowns

        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.addEventListener('click', function () {
            if (month === 0) {
                month = 11;
                year--;
            } else {
                month--;
            }
            renderCalendar(month, year);
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', function () {
            if (month === 11) {
                month = 0;
                year++;
            } else {
                month++;
            }
            renderCalendar(month, year);
        });

        // Create container for month and year spans
        const titleContainer = document.createElement('div');
        titleContainer.style.display = 'inline-block';

        // Month span with dropdown functionality
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

            monthNames.forEach(function (m, index) {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = m;
                item.style.padding = '5px 10px';
                item.style.cursor = 'pointer';
                item.addEventListener('click', function () {
                    selectedMonth = index;
                    dropdown.remove();
                    renderCalendar(selectedMonth, year);
                });
                item.addEventListener('mouseover', function () {
                    item.style.backgroundColor = '#f0f0f0';
                });
                item.addEventListener('mouseout', function () {
                    item.style.backgroundColor = '#fff';
                });
                dropdown.appendChild(item);
            });
            headerDiv.appendChild(dropdown);
        });

        // Space node between month and year
        const spaceText = document.createTextNode(' ');

        // Year span with dropdown functionality
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

            for (let yr = 1901; yr <= 2099; yr++) {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = yr;
                item.style.padding = '5px 10px';
                item.style.cursor = 'pointer';
                item.addEventListener('click', function () {
                    selectedYear = yr;
                    dropdown.remove();
                    renderCalendar(month, selectedYear);
                });
                item.addEventListener('mouseover', function () {
                    item.style.backgroundColor = '#f0f0f0';
                });
                item.addEventListener('mouseout', function () {
                    item.style.backgroundColor = '#fff';
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

        // Create calendar grid container
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        // Reorder weekday names so that Monday is the first day.
        // For example, if weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        // then orderedWeekdays becomes ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].
        const orderedWeekdays = weekdayNames.slice(1).concat(weekdayNames[ 0 ]);

        // Render localized weekday headers (starting with Monday)
        orderedWeekdays.forEach(function (day) {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        // Calculate first day index with Monday as first day.
        // JavaScript's getDay() returns 0 for Sunday, 1 for Monday, etc.
        // So if getDay() returns 0, set to 6; otherwise subtract 1.
        let firstDayIndex = new Date(year, month, 1).getDay();
        firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

        // Get number of days in current month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Fill cells from previous month
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
            const dayNum = daysInPrevMonth - firstDayIndex + i + 1;
            const otherCell = document.createElement('div');
            otherCell.className = 'calendar-cell other-month';
            otherCell.textContent = dayNum;
            // When clicking an other-month day, update selectedDate but do NOT change the displayed month.
            otherCell.addEventListener('click', function () {
                selectedDate = new Date(prevYear, prevMonth, dayNum, 12);
                calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));
                renderCalendar(month, year); // keep current month/year
            });
            grid.appendChild(otherCell);
        }

        // Create day cells for each day of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell';
            dayCell.textContent = day;

            // Highlight today's date
            if (
                day === currentDate.getDate() &&
                month === currentDate.getMonth() &&
                year === currentDate.getFullYear()
            ) {
                dayCell.classList.add('today');
            }
            // Highlight the selected day
            if (
                day === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear()
            ) {
                dayCell.classList.add('selected');
            }
            // Update calendar attribute when a day is selected
            dayCell.addEventListener('click', function () {
                selectedDate = new Date(year, month, day, 12);
                calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));
                renderCalendar(month, year);
            });
            grid.appendChild(dayCell);
        }

        // Fill remaining cells with days from next month, if needed
        const totalCells = grid.children.length;
        const trailingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let j = 1; j <= trailingCells; j++) {
            const otherCell = document.createElement('div');
            otherCell.className = 'calendar-cell other-month';
            otherCell.textContent = j;
            // When clicking an other-month day of the next month, update the selection
            otherCell.addEventListener('click', function () {
                let nextMonth = month === 11 ? 0 : month + 1;
                let nextYear = month === 11 ? year + 1 : year;
                selectedDate = new Date(nextYear, nextMonth, j, 12);
                calendarContainer.setAttribute('selected-date', formatDate(selectedDate, dateFormat));
                renderCalendar(month, year); // do not switch display to next month
            });
            grid.appendChild(otherCell);
        }

        calendarContainer.appendChild(grid);
    }

    // Close any open dropdowns when clicking outside
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

    // Load localized month and weekday names, then render the calendar
    loadLocalizedMonths().then(function () {
        renderCalendar(selectedMonth, selectedYear);
    });
});