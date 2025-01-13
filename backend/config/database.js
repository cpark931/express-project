const config = require('./index');

module.exports = {
  development: {
    // For SQLite (default in development unless USE_LOCAL_POSTGRESS is true)
    storage: config.dbFile,
    ...(process.env.USE_LOCAL_POSTGRESS === 'true' ? {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres',
      dialectOptions: {},
      define: {
        schema: 'public', // Use "public" schema for local PostgreSQL
      }
    } : {
      dialect: "sqlite", // Use SQLite as default
    }),
    seederStorage: "sequelize", // Sequelize will manage seed storage
    logQueryParameters: true, // Log query parameters for debugging
    typeValidation: true, // Enable strict type validation
  },
  production: {
    // For production, use PostgreSQL with SSL enabled
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL for secure connections
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
    define: {
      schema: process.env.SCHEMA, // Custom schema from environment variable
    },
  },
};
