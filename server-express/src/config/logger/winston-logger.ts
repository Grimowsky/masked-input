import winston, { type Logger } from 'winston';
import { type TransformFunction } from 'logform';

const LOG_LEVEL = 'info';
const LOGGING_HUMAN_READABLE_JSON = true;
const LOGGING_SHOW_ERROR_STACK = false;

const winstonErrorFormat = winston.format(
    (info, { stack }): ReturnType<TransformFunction> => {
        Object.keys(info).forEach((key) => {
            const entry: unknown = info[key];
            if (!(entry instanceof Error)) return;
            info[key] = {
                ...entry,
                message: entry.message,
                stack: entry.stack,
            };
        });
        return info;
    }
);

const createWinstonLogger = ({
    showErrorStack = LOGGING_SHOW_ERROR_STACK,
    humanReadableJson = LOGGING_HUMAN_READABLE_JSON,
    level = LOG_LEVEL,
} = {}): Logger =>
    winston.createLogger({
        level,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: showErrorStack }),
            winstonErrorFormat({ stack: showErrorStack }),
            winston.format.json({ space: humanReadableJson ? 2 : 0 }),
            winston.format.metadata({
                fillExcept: ['message', 'level', 'timestamp', 'label'],
            })
        ),
        transports: [
            new winston.transports.Console({
                consoleWarnLevels: ['warn'],
                stderrLevels: ['error'],
            }),
        ],
    });

export const createLogger = ({
    showErrorStack = LOGGING_SHOW_ERROR_STACK,
    humanReadableJson = LOGGING_HUMAN_READABLE_JSON,
    level = LOG_LEVEL,
}: {
    showErrorStack?: boolean;
    humanReadableJson?: boolean;
    level?: string;
} = {}): Logger =>
    createWinstonLogger({ showErrorStack, level, humanReadableJson });
