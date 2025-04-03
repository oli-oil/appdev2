const EventEmitter = require('events');
const emitter = new EventEmitter();

// Create a listener
emitter.on('start', () => {
    console.log('Application Started');
  });
  
  // Trigger the event
  emitter.on('data', (data) => {
    console.log('Data received:', data);
  });

  emitter.on('error', (error) => {
    console.log('Error occured:', error);
  });

  emitter.emit('start');
  emitter.emit('data', {name: 'John Doe', age: 25});
  emitter.emit('error', 'Something went wrong!');
