import { createLogger, format, transports } from 'winston';

export default createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf((info: any) => `[${info.timestamp}] | ${info.level.toLocaleUpperCase()} | ${info.message}`)
    ),
    transports: [
        new transports.Console({level: 'debug'}),
    ]
});
