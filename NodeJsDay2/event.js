const EventEmitter = require('node:events');

class School extends EventEmitter { }

const schoolBell = new School();
schoolBell.on('ring', () => {
    console.log('Yahoo! Class sesh');
});
schoolBell.on('broken', () => {
    console.log('Oh No! aro class hobe');
});
schoolBell.emit('ring');
schoolBell.emit('broken');