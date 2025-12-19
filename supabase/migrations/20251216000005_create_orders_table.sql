-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id), -- Nullable for guest checkout
  status text not null default 'pending', -- pending, paid, shipped, cancelled
  total_amount numeric not null,
  shipping_address jsonb not null,
  contact_email text not null,
  stripe_payment_id text -- For future use
);

-- Create order items table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) not null,
  variant_id uuid references product_variants(id), -- Optional if product has no variants
  quantity integer not null,
  price_at_time numeric not null -- Store price at time of purchase
);

-- Enable RLS
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies for orders
-- Users can view their own orders
create policy "Users can view their own orders" on orders
  for select using (auth.uid() = user_id);

-- Anyone can create an order (for guest checkout)
create policy "Anyone can create an order" on orders
  for insert with check (true);

-- Policies for order_items
-- Users can view items of their own orders
create policy "Users can view their own order items" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Anyone can insert order items (linked to the order they just created)
create policy "Anyone can insert order items" on order_items
  for insert with check (true);
