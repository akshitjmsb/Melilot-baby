-- Clean up existing dummy data if needed (optional, but good for idempotency if we were using a fixed set)
-- TRUNCATE products CASCADE; -- Commented out to avoid accidental data loss of user's work, but safe for a fresh dev env.

-- Product 1: Oatmeal Linen Romper
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Heirloom Oatmeal Linen Romper',
    'Crafted from 100% European flax linen, this heirloom-quality romper is designed for timeless comfort. Features wooden buttons down the front for easy changes and a relaxed fit perfect for play or nap time. Breathable, hypoallergenic, and softer with every wash.',
    68.00,
    'Rompers',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2OEY8-CKcxUQus87bFyimNTyJochCwOMOGJDuWKMK575xBSt50RfRkpQqx-2DKW_1i57o_fdhnkOCDnj5BiZGCUd1aWD09Q8QcoJNoX0ctPYJ9Jw8h_TepQe0QXGU02xjAra__qOyZCab3-n1z2K7mgpfkfolgOZTkwap6lRTQCKz93aotHnMujrpDLD8CQqmRgVGtIoO0O0_d4_7aG5oOuYUTsH5tymdW3semnH-Lc0_8IGkf4uUI4waz4VFkOFylbB77K6_IQ',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', -- Placeholder video
    ARRAY['https://placehold.co/400x500?text=360+View+1', 'https://placehold.co/400x500?text=360+View+2', 'https://placehold.co/400x500?text=360+View+3', 'https://placehold.co/400x500?text=360+View+4'],
    ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuD2OEY8-CKcxUQus87bFyimNTyJochCwOMOGJDuWKMK575xBSt50RfRkpQqx-2DKW_1i57o_fdhnkOCDnj5BiZGCUd1aWD09Q8QcoJNoX0ctPYJ9Jw8h_TepQe0QXGU02xjAra__qOyZCab3-n1z2K7mgpfkfolgOZTkwap6lRTQCKz93aotHnMujrpDLD8CQqmRgVGtIoO0O0_d4_7aG5oOuYUTsH5tymdW3semnH-Lc0_8IGkf4uUI4waz4VFkOFylbB77K6_IQ', 'https://placehold.co/400x500?text=Detail+Back', 'https://placehold.co/400x500?text=Detail+Texture'],
    'Oatmeal Linen Romper | Organic Baby Clothes | Petit Coton',
    'Shop our heirloom quality Oatmeal Linen Romper. Breathable, organic, and perfect for sensitive skin. Hand-made in Montreal.',
    ARRAY['baby romper', 'linen clothing', 'organic baby clothes', 'neutral baby outfit'],
    'RMP-LIN-OAT-001'
);

INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0-3M', 'Oatmeal', 15, 'RMP-LIN-OAT-001-03'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '3-6M', 'Oatmeal', 20, 'RMP-LIN-OAT-001-36'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '6-12M', 'Oatmeal', 10, 'RMP-LIN-OAT-001-612');


-- Product 2: Cloud White Knit Cardigan
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Cloud White Knit Cardigan',
    'A soft, chunky knit cardigan made from 100% organic cotton yarn. Perfect for layering on chilly days. Features durable buttons and a classic textured stitch pattern.',
    54.00,
    'Sleepwear', -- Putting in Sleepwear/Tops for now
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAMb3yq9vwuLTGGVe5NBmPk49nP92H1Fvma5lYN_Ct8AG1nh2rAbkHuOieGHBspvmCzyDbPQRdLyYQZTsZZYlVkHtdQ_e8Xod8QFACN6kZVYMBRE5y8LPqVbmblhh5Y0bB3VQkLxObojn4VYkGTBZdm6W4vZag8zFp7aUWXWTyaP6cuNmpnp2-Yw0mbFEC0ZlBqChciTlcsKt3SojboI5w3QH4RX6bFR_mt0A7-9q_rtOzgzOw8yDHrX750rCyfeyBDkrnye8IgsQ',
    NULL,
    ARRAY['https://placehold.co/400x500?text=Cardigan+Front', 'https://placehold.co/400x500?text=Cardigan+Back'],
    ARRAY['https://placehold.co/400x500?text=Detail+Knitting'],
    'Cloud White Knit Cardigan | Baby Sweaters',
    'Keep your little one warm with our organic cotton knit cardigan in Cloud White. Soft, durable, and stylish.',
    ARRAY['baby cardigan', 'knit sweater', 'organic cotton', 'white baby coat'],
    'KNT-WHT-002'
);

INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '0-6M', 'White', 25, 'KNT-WHT-002-06'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '6-12M', 'White', 25, 'KNT-WHT-002-12');


-- Product 3: Sage Green Muslin Swaddle
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Sage Green Muslin Swaddle',
    'Our signature bamboo-cotton blend muslin swaddle. Breathable, lightweight, and gentle. Generously sized at 47"x47" for easy wrapping.',
    28.00,
    'Accessories',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBD8MiwQ3ak6YufGhUlmuPjO4pNgjesTYKUiBhprLhwQT1S2-juxGbe5-1-heHEORW6fP7BMt6oYaczhQbyId4rmOhkFBfWH4YjuuTatXO7UATWgh7HuFzJI8oNMuUmw4oUelTMl3-Mx2bYmizuCVbjlSn5KstqDqK3T5ZSiFVEzDAiejWesjkO5eal5HaUA1NeZ0UJZAeLfkO9lGobhApcHSAY_iiePpAjDSL1fmydr9nlEAtLN86KD6Bvo3Hc-7slgQEXGN4k6w',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    NULL,
    ARRAY['https://placehold.co/400x500?text=Swaddle+Flat', 'https://placehold.co/400x500?text=Swaddle+Folded'],
    'Sage Green Muslin Swaddle | Bamboo Baby Blanket',
    'Ultra-soft bamboo muslin swaddle in a calming Sage Green. Perfect for nursing, swaddling, or as a stroller cover.',
    ARRAY['muslin swaddle', 'bamboo blanket', 'sage green baby', 'newborn essential'],
    'SWD-SAGE-003'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'One Size', 'Sage', 100, 'SWD-SAGE-003-OS');


-- Product 4: Petal Pink Bonnet
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'Petal Pink Wool Bonnet',
    'A vintage-inspired bonnet hand-knit from merino wool. Keeps ears warm without overheating. Ties gently under the chin.',
    32.00,
    'Bonnets',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAdJCj1GJ6tveBfLe4MV2Iy4KAwqV180_cth4az5ns9IAOHueejLnaaNzYVIoGiF3-mWiLxcIrYQFzBNWx4aHgVVMWgKZhtuKi3lHYrpZGVw8V8LYMaB0IgysJ1lhZX_A6zKt3RgYkkHDY_7X-Lt5oSUVRpnL-SqNbUdKZQyZLqsU-9nVBxEA1sRLM_l9XRoD2HQrcTs1bM-LPGQchvNWrsCPVNZIzLRI1_HXP8uEw-9PBQC0Rzl2hsTN70vLzWVAkh5GgDMiy6XA',
    NULL,
    NULL,
    ARRAY['https://placehold.co/400x500?text=Bonnet+Side'],
    'Petal Pink Wool Bonnet | Vintage Baby Hat',
    'Hand-knit merino wool bonnet in Petal Pink. Vintage style for modern babies.',
    ARRAY['baby bonnet', 'wool hat', 'pink baby accessory'],
    'BON-PNK-004'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '0-6M', 'Pink', 12, 'BON-PNK-004-06');


-- Product 5: Charcoal Wool Booties
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
    'Charcoal Wool Booties',
    'Cozy booties with a secure ribbed cuff that actually stays on. Made from ethically sourced wool with a suede sole for grip.',
    38.00,
    'Booties',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAv_pAM6P1ZjSMhcjTvgsG6F29tVaQ0j-V_9rkjKPGbJteZK2fTvdQCWBZun1aXUe-CpMch8BfNx-lrSEX_GRUH7z4Hd__HXlotP5UfvOkOAMXCprKDpgGbtyDD-x975_eo66OBx96A7mEl3QN8ms0mpjTzzxIK0lgJ-MinLKwUr8Gw4h6InU94wapg5TXBEMTAmhnFFHXC1-e6izc04wTxTIPbaXvKixhT8b0aE-OXbW6CByDpJswD9yArqi6_06F5_oXe7UVVLA',
    NULL,
    NULL,
    NULL,
    'Charcoal Wool Booties | Stay-On Baby Shoes',
    'Wool booties that stay on. Charcoal grey with suede soles.',
    ARRAY['baby booties', 'wool shoes', 'stay on booties'],
    'BOT-CHR-005'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '0–6M', 'Charcoal', 18, 'BOT-CHR-005-06'),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '6–12M', 'Charcoal', 20, 'BOT-CHR-005-12');


-- Product 6: Newborn Gift Set
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66',
    'Newborn Gift Set - Earth Tones',
    'The perfect welcome gift. Includes one ribbed sleeper, one bonnet, and a wooden teether. Packed in a reusable canvas pouch.',
    120.00,
    'Sets',
    'https://images.unsplash.com/photo-1544126566-47e989b6f849?q=80&w=2574&auto=format&fit=crop',
    NULL,
    NULL,
    ARRAY['https://placehold.co/400x500?text=Gift+Box', 'https://placehold.co/400x500?text=Inside+View'],
    'Newborn Gift Set | Organic Baby Shower Gift',
    'Curated newborn essentials in beautiful earth tones. The ultimate baby shower gift.',
    ARRAY['baby gift set', 'newborn bundle', 'organic baby shower'],
    'SET-EARTH-006'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'NB', 'Multi', 8, 'SET-EARTH-006-NB');

-- Product 7: Ribbed Organic Leggings
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    '16eebc99-9c0b-4ef8-bb6d-6bb9bd380a77',
    'Ribbed Organic Leggings',
    'Stretchy, comfortable leggings with a gentle waistband. Designed to fit over cloth diapers.',
    24.00,
    'Bottoms',
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2670&auto=format&fit=crop',
    NULL,
    NULL,
    NULL,
    'Ribbed Organic Leggings | Baby Pants',
    'Everyday organic leggings. Soft, stretchy, and sustainable.',
    ARRAY['baby leggings', 'organic pants', 'ribbed baby clothes'],
    'LEG-SND-007'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('16eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '3-6M', 'Sand', 30, 'LEG-SND-007-36'),
('16eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '6-12M', 'Sand', 30, 'LEG-SND-007-612');

-- Product 8: Fleece Vest
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    '27eebc99-9c0b-4ef8-bb6d-6bb9bd380a88',
    'Teddy Bear Fleece Vest',
    'Adorable faux-shearling vest made from recycled materials. Adds instant warmth and cuteness to any outfit.',
    42.00,
    'Outerwear',
    'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=2635&auto=format&fit=crop',
    NULL,
    NULL,
    NULL,
    'Teddy Fleece Vest | Baby Outerwear',
    'Cozy teddy bear vest for babies. Recycled materials, warm and cute.',
    ARRAY['baby vest', 'fleece jacket', 'baby outerwear'],
    'VST-TED-008'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('27eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', '12-18M', 'Brown', 15, 'VST-TED-008-1218');

-- Product 9: Starry Night Bamboo Sleeper
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    '38eebc99-9c0b-4ef8-bb6d-6bb9bd380a99',
    'Bamboo Sleeper - Starry Night',
    'Two-way zipper footie pajama made from temperature-regulating bamboo viscose. Features a subtle starry night print in navy.',
    36.00,
    'Sleepwear',
    'https://images.unsplash.com/photo-1622329775369-0263f357f892?q=80&w=2670&auto=format&fit=crop',
    NULL,
    NULL,
    NULL,
    'Starry Night Bamboo Sleeper | Baby Pajamas',
    'Soft bamboo sleeper with 2-way zipper. Navy blue star print.',
    ARRAY['bamboo sleeper', 'baby pajamas', 'star print baby clothes'],
    'SLP-STR-009'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('38eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '0-3M', 'Navy', 40, 'SLP-STR-009-03'),
('38eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '3-6M', 'Navy', 35, 'SLP-STR-009-36');

-- Product 10: Drool Bibs
INSERT INTO products (id, name, description, base_price, category, image_url, video_url, images_360, gallery_images, seo_title, seo_description, seo_keywords, sku)
VALUES (
    '49eebc99-9c0b-4ef8-bb6d-6bb9bd380a00',
    'Organic Cotton Drool Bibs (3-Pack)',
    'Super absorbent bandana bibs with adjustable snaps. Keeps baby dry and stylish. Pack includes: Sage, Oatmeal, and Rust.',
    18.00,
    'Accessories',
    'https://images.unsplash.com/photo-1604467715878-83e57e8bc129?q=80&w=2576&auto=format&fit=crop',
    NULL,
    NULL,
    NULL,
    'Organic Bandana Bibs | Baby Drool Bibs',
    '3-pack of absorbent organic cotton bibs. Adjustable sizing and trendy colors.',
    ARRAY['baby bibs', 'bandana bibs', 'teething bib'],
    'BIB-MUL-010'
);
INSERT INTO product_variants (product_id, size, color, inventory_count, sku_variant) VALUES
('49eebc99-9c0b-4ef8-bb6d-6bb9bd380a00', 'One Size', 'Multi', 100, 'BIB-MUL-010-OS');
