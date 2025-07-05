interface SnowflakeConfig {

}

interface BigQueryConfig {

}

interface HiveConfig {

}

interface MySQLConfig {

}

interface OracleConfig {

}

interface CloudSQLConfig {

}

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