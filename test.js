const assert = require('assert');
const sinon = require('sinon');
const Emitter = require('./emitter');

const emitter1 = new Emitter();
const emitter2 = new Emitter();

const events1 = {};
events1['newEvent1'] = new Map();

const handler1 = () => {
    return 'handler1';
};
const handler2 = () => {
    return 'handler2';
};
const handler3 = () => {
    return 'handler3';
};

// метод emitter.on
// проверяем, что подписка в нужном порядке
describe('emitter', () => {
    describe('emitter.on', () => {
        it('подписка в нужном порядке', () => {

            events1['newEvent1'].set(handler1.name, handler1);
            events1['newEvent1'].set(handler3.name, handler3);
            events1['newEvent1'].set(handler2.name, handler2);

            emitter1.on('newEvent1', handler1);
            emitter1.on('newEvent1', handler3);
            emitter1.on('newEvent1', handler2);

            assert.deepEqual(emitter1.events, events1);
        });

        it('если добавили один и тот же обработчик, то он не дублируется', () => {
            emitter2.on('newEvent2', handler1);
            emitter2.on('newEvent2', handler1);
            emitter2.on('newEvent2', handler1);

            assert.equal(emitter2.events['newEvent2'].size, 1);
        });
    });

    describe('emitter.off', () => {
        it('по отписке обработчик удаляется', () => {
            events1['newEvent1'].delete(handler2.name);

            emitter1.off('newEvent1', handler2);

            assert.deepEqual(emitter1.events, events1);
        });

        it(' при повторной отписке получим сообщение об ошибке', () => {
            sinon.stub(console, 'error');
            events1['newEvent1'].delete(handler2.name);
            emitter1.off('newEvent1', handler2);

            sinon.assert.calledOnce(console.error);
        });
    });
});
