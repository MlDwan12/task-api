export const rabbitConfig = {
  uri: process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672',
  queue: 'tasks',
};
