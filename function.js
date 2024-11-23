var Cal = function(divId) {
    // Сохраняем идентификатор div
    this.divId = divId;

    // Дни недели с понедельника
    this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ];

    // Месяцы начиная с января
    this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    // Устанавливаем текущий месяц, год
    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    } else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    } else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Показать текущий месяц
Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
};

// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {
    var d = new Date();

    // Первый день недели в выбранном месяце
    var firstDayOfMonth = new Date(y, m, 1).getDay();

    // Последний день выбранного месяца
    var lastDateOfMonth = new Date(y, m + 1, 0).getDate();

    // Последний день предыдущего месяца
    var lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    // Обновляем отображение месяца и года
    document.getElementById('monthDisplay').textContent = this.Months[m];
    document.getElementById('yearDisplay').textContent = y;

    var html = '<div class="calendar-grid">';

    // Заголовок дней недели
    html += '<div class="weekdays">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<div class="weekday">' + this.DaysOfWeek[i] + '</div>';
    }
    html += '</div>';

    // Записываем дни
    var i = 1;
    do {
        var dow = new Date(y, m, i).getDay();

        // Начать новую строку в понедельник
        if (dow == 1) {
            html += '<div class="week">';
        } else if (i == 1) {
            html += '<div class="week">';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<div class="day"><div class="day-content other-month">' + k + '</div></div>';
                k++;
            }
        }

        // Записываем текущий день в цикл
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<div class="day"><div class="day-content current-month selected">' + i + '</div></div>';
        } else {
            html += '<div class="day"><div class="day-content current-month">' + i + '</div></div>';
        }

        // Закрыть строку в воскресенье
        if (dow == 0) {
            html += '</div>';
        } else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 7; dow++) {
                html += '<div class="day"><div class="day-content other-month">' + k + '</div></div>';
                k++;
            }
            html += '</div>';
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Конец таблицы
    html += '</div>';

    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
};

// При загрузке окна
window.onload = function() {
    // Начать календарь
    var c = new Cal("divCal");
    c.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
        c.previousMonth();
    };
};

// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}


document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.sport-tabs button');
    const basketballCalendar = document.getElementById('basketballCalendar');
    const footballCalendar = document.getElementById('footballCalendar');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Деактивируем все вкладки
            tabs.forEach(t => {
                t.classList.remove('tab-active');
                t.classList.add('tab-inactive');
            });

            // Активируем выбранную вкладку
            this.classList.remove('tab-inactive');
            this.classList.add('tab-active');

            // Скрываем все календари
            basketballCalendar.style.display = 'none';
            footballCalendar.style.display = 'none';

            // Отображаем выбранный календарь
            if (tabId === 'basketball') {
                basketballCalendar.style.display = 'block';
            } else if (tabId === 'football') {
                footballCalendar.style.display = 'block';
            }
        });
    });
});
