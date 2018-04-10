const Emitter = require('./emitter');

const emitter = new Emitter();

const insertKey = () => {
    console.log('вставьте ключ');
}

const takeOutKey = () => {
    console.log('выньте ключ');
}

const turnKey = () => {
    console.log('поверните ключ');
}

const openDoor = () => {
    console.log('откройте дверь');
}

emitter.on('open-door', insertKey);
emitter.on('open-door', turnKey);
emitter.on('open-door', takeOutKey);
emitter.on('open-door', openDoor);

emitter.emit('open-door');

console.log('----------------------------------');
emitter.off('open-door', takeOutKey);
emitter.off('open-door', takeOutKey);

emitter.emit('open-door');
