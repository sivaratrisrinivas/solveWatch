-- Create tables for storing historical CoW Protocol data

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    uid TEXT PRIMARY KEY,
    owner TEXT NOT NULL,
    sell_token TEXT NOT NULL,
    buy_token TEXT NOT NULL,
    sell_amount TEXT NOT NULL,
    buy_amount TEXT NOT NULL,
    valid_to BIGINT NOT NULL,
    app_data TEXT NOT NULL,
    fee_amount TEXT NOT NULL,
    kind TEXT NOT NULL,
    partially_fillable BOOLEAN NOT NULL,
    status TEXT NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
    block_number BIGINT NOT NULL,
    log_index INTEGER NOT NULL,
    order_uid TEXT NOT NULL REFERENCES orders(uid),
    owner TEXT NOT NULL,
    sell_token TEXT NOT NULL,
    buy_token TEXT NOT NULL,
    sell_amount TEXT NOT NULL,
    buy_amount TEXT NOT NULL,
    sell_amount_before_fees TEXT,
    tx_hash TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (block_number, log_index)
);

-- Solver performance table (inferred from trade data)
CREATE TABLE IF NOT EXISTS solver_performance (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    trades_count INTEGER NOT NULL,
    avg_gas_used REAL NOT NULL,
    total_gas_used BIGINT NOT NULL,
    success_rate REAL NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_creation_date ON orders(creation_date);
CREATE INDEX IF NOT EXISTS idx_trades_timestamp ON trades(timestamp);
CREATE INDEX IF NOT EXISTS idx_trades_order_uid ON trades(order_uid);
