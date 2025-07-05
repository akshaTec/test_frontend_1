interface SnowflakeConfig {
    user: string;
    password: string;
    warehouse_name: string;
    database_name: string;
    schema_name: string;
    account_name: string;
    account: string;
}

interface BigQueryConfig {
    project_id: string;
    dataset_id: string;
    region: string;
    bucket_name: string;
    bucket_location: string;
}

interface HiveConfig {
    server: string;
    port: number;
    database_name: string;
    user: string;
    source_path: string;
}

interface MySQLConfig {
    server: string;
    port: number;
    database_name: string;
    user: string;
    password: string;
}

interface OracleConfig {
    username: string;
    password: string;
    database_name: string;
    connection_string: string;
}

interface CloudSQLConfig {
    project_id: string;
    bucket_name: string;
    bucket_location: string;
    instance_id: string;
    region: string;
    database_version: string;
    root_password: string;
    user: string;
    instance_tier: string;
    disk_size: string;
    disk_type: string;
    backup_enabled: string;
    availability_type: string;
    deletion_protection: string;
}

export const SNOWFLAKE_CONFIG: SnowflakeConfig = {
    user: "Searce16",
    password: "Se@rce12345",
    warehouse_name: "COMPUTE_WH",
    database_name: "SNOWFLAKE_AGENTICAI_DATABASE",
    schema_name: "INVENTORY",
    account_name: "JSUUAOG-JP71848",
    account: "JSUUAOG-JP71848",
};

export const BIGQUERY_CONFIG: BigQueryConfig = {
    project_id: "applied-ai-practice00",
    dataset_id: "data_migration_to_bigquery",
    region: "us-central1",
    bucket_name: "bigquery_migration_staging",
    bucket_location: "US",
};

export const HIVE_CONFIG: HiveConfig = {
    server: "hive-to-bq-cluster-m",
    port: 10000,
    database_name: "hivedemo",
    user: "hive",
    source_path: "hdfs://hive-to-bq-cluster-m/user/hive/warehouse/hivedemo.db",
};

export const MYSQL_CONFIG: MySQLConfig = {
    server: "mysql-14d50856-agentic-data-migration.f.aivencloud.com",
    port: 28658,
    database_name: "MYSQL_AGENTIC_DATABASE",
    user: "avnadmin",
    password: "AVNS_hQEGxGqOtu4-D9NL8GW",
};

export const ORACLE_CONFIG: OracleConfig = {
    username: "ADMIN",
    password: "Searce@1234567",
    database_name: "oracledbAgenticAI",
    connection_string:
        "tcps://adb.us-chicago-1.oraclecloud.com:1522/gdb7cd2aa1d5ca3_oracledbagenticai_high.adb.oraclecloud.com?wallet_location=../testing-databases/oracle-wallet",
};

export const CLOUDSQL_CONFIG: CloudSQLConfig = {
    project_id: "applied-ai-practice00",
    bucket_name: "cloudsql_migration_staging",
    bucket_location: "US",
    instance_id: "oracle-postgresql-migration",
    region: "us-central1",
    database_version: "POSTGRES_13",
    root_password: "AndAllTheThingsYouLeftBehind",
    user: "postgres",
    instance_tier: "db-f1-micro",
    disk_size: "10 GB",
    disk_type: "PD_SSD",
    backup_enabled: "true",
    availability_type: "REGIONAL",
    deletion_protection: "false",
};

export const CONFIG_MAP = {
    snowflake: SNOWFLAKE_CONFIG,
    oracle: ORACLE_CONFIG,
    bigquery: BIGQUERY_CONFIG,
    cloudsql: CLOUDSQL_CONFIG,
    mysql: MYSQL_CONFIG,
    hive: HIVE_CONFIG,
};