-- 物件管理テーブル
-- Supabaseの SQL Editor で実行してください
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null,
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- RLS（行レベルセキュリティ）を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ参照できる
create policy "Select own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分が登録した物件として登録できる
create policy "Insert own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "Update own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "Delete own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
