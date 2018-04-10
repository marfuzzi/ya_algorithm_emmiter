class Emitter {
    constructor() {
        this.events = {};
    }

    /**
     * Подписываем обработчик на событие
     * Сложность O(1)
     * @param {String} event
     * @param {Function} handler
     */
    on(event, handler) {
        // O(1) на проверку наличия данного события
        this.events[event] = this.events[event] || new Map();
        // O(1) на добавление обработчика в хеш-таблицу
        this.events[event].set(handler.name, handler);
    }

    /**
     * Отписывем обработчик от события
     * Сложность O(1)
     * @param {String} event
     * @param {Object} subscriber
     */
    off(event, handler) {
        // O(1) получить все обработчики для данного события
        const handlers = this.events[event];
        if(!handlers) {
            console.error(`Событие ${event} не существует`);
        }

        if(handlers.has(handler.name)) {
            // O(1) удалить элемент из хэш-таблицы
            handlers.delete(handler.name);
        } else {
            console.error(`ERROR: Обработчик ${handler.name} не существует`);
        }
    }

    /**
     * Вызываем все обработчики, которые подписаны на данное событие
     * Сложность O(n)
     * @param {String} event
     */
    emit(event) {
        // O(1) - получить все обработчики
        const handlers = this.events[event].values();
        // O(n) вызвать последовательно все обработчики
        for( let handler of handlers ) {
            handler();
        }
    }
};

module.exports = Emitter;
