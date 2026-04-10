create table users (
    id bigserial primary key,
    email varchar(255) not null unique,
    password_hash varchar(255) not null,
    full_name varchar(120) not null,
    created_at timestamptz not null default now()
);

create table portfolios (
    id bigserial primary key,
    user_id bigint not null references users(id),
    name varchar(120) not null,
    base_currency char(3) not null,
    created_at timestamptz not null default now()
);

create table holdings (
    id bigserial primary key,
    portfolio_id bigint not null references portfolios(id),
    symbol varchar(20) not null,
    asset_type varchar(20) not null,
    quantity numeric(19, 4) not null,
    average_cost numeric(19, 4) not null,
    currency char(3) not null,
    created_at timestamptz not null default now()
);

create table transactions (
    id bigserial primary key,
    holding_id bigint not null references holdings(id),
    type varchar(20) not null,
    quantity numeric(19, 4) not null,
    price numeric(19, 4) not null,
    trade_date date not null,
    created_at timestamptz not null default now()
);

create index idx_portfolios_user_id on portfolios(user_id);
create index idx_holdings_portfolio_id on holdings(portfolio_id);
create index idx_transactions_holding_id on transactions(holding_id);
