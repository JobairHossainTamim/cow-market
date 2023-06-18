import { Server } from 'http';
import mongoose from 'mongoose';
import config from './config';
import app from './app';

process.on('uncaughtException', error => {
  // errorlogger.error(error);
  // eslint-disable-next-line no-console
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    // logger.info(`🛢Database is connected successfully`);
    // eslint-disable-next-line no-console
    console.log(`🛢Database is connected successfully`);

    server = app.listen(config.port, () => {
      // logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    // errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        // errorlogger.error(error);
        // eslint-disable-next-line no-console
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
