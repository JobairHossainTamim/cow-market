"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
process.on('uncaughtException', error => {
    // errorlogger.error(error);
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(1);
});
let server;
async function bootstrap() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        // logger.info(`🛢Database is connected successfully`);
        // eslint-disable-next-line no-console
        console.log(`🛢Database is connected successfully`);
        server = app_1.default.listen(config_1.default.port, () => {
            // logger.info(`Application  listening on port ${config.port}`);
        });
    }
    catch (err) {
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
        }
        else {
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
