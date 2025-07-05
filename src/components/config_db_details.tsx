// Use 'object' instead of empty interface to avoid lint error
export type SnowflakeConfig = object;
export type BigQueryConfig = object;
export type HiveConfig = object;
export type MySQLConfig = object;
export type OracleConfig = object;
export type CloudSQLConfig = object;

export const SNOWFLAKE_CONFIG: SnowflakeConfig = {

};

export const BIGQUERY_CONFIG: BigQueryConfig = {

};

export const HIVE_CONFIG: HiveConfig = {

};

export const MYSQL_CONFIG: MySQLConfig = {

};

export const ORACLE_CONFIG: OracleConfig = {
 
};

export const CLOUDSQL_CONFIG: CloudSQLConfig = {

};

export const CONFIG_MAP = {
    snowflake: SNOWFLAKE_CONFIG,
    oracle: ORACLE_CONFIG,
    bigquery: BIGQUERY_CONFIG,
    cloudsql: CLOUDSQL_CONFIG,
    mysql: MYSQL_CONFIG,
    hive: HIVE_CONFIG,
};