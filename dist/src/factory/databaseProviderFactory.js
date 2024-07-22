"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProviderFactory = exports.DatabaseType = void 0;
const MongoDBProvider_1 = __importDefault(require("../Providers/MongoDBProvider"));
// Define an enum for database types
var DatabaseType;
(function (DatabaseType) {
    DatabaseType["MongoDB"] = "mongoes";
    DatabaseType["SQL"] = "sql";
})(DatabaseType || (exports.DatabaseType = DatabaseType = {}));
class DatabaseProviderFactory {
    createDatabaseProviders(databaseTypes) {
        for (const databaseType of databaseTypes) {
            switch (databaseType) {
                case DatabaseType.MongoDB:
                    // Create MongoDB database provider instance
                    new MongoDBProvider_1.default();
                    break;
                case DatabaseType.SQL:
                    // Create SQL database provider instance
                    break;
                default:
                    throw new Error(`Unsupported database type: ${databaseType}`);
            }
        }
    }
}
exports.DatabaseProviderFactory = DatabaseProviderFactory;
``;
