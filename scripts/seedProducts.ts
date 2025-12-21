import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
// For seeding we might need SERVICE_ROLE_KEY if RLS policies block anon inserts.
// But usually for local/dev we might use anon if policies allow, or just assume we have access.
// Let's try anon key first, assuming we have an "insert" policy or are admin.
// Actually, for scripts, best practice is SERVICE ROLE if available, but users usually don't put it in .env.local for frontend.
// I'll stick to what I have. If it fails due to RLS, I might need the user to relax RLS or provide service key.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = ['Rompers', 'Sleepwear', 'Bonnets', 'Booties'];

const products = [
    // ROMPERS
    {
        name: 'Oatmeal Waffle Knit Romper',
        description: 'A cozy, textured waffle knit romper made from 100% organic cotton. Perfect for layering.',
        base_price: 42.00,
        category: 'Rompers',
        image_url: 'https://images.unsplash.com/photo-1522771753062-5a31a5052055?q=80&w=1000&auto=format&fit=crop', // Placeholder
        sku: 'ROM-001'
    },
    {
        name: 'Sage Muslin Romper',
        description: 'Breathable muslin cotton romper in a soft sage green. Ideal for warmer days.',
        base_price: 38.00,
        category: 'Rompers',
        image_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop',
        sku: 'ROM-002'
    },
    {
        name: 'Terracotta Linen Romper',
        description: 'Durable and stylish linen blend romper. Gets softer with every wash.',
        base_price: 45.00,
        category: 'Rompers',
        image_url: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000&auto=format&fit=crop',
        sku: 'ROM-003'
    },
    {
        name: 'Cloud Grey Knit',
        description: 'Ultra-soft knit romper for maximum comfort during nap time.',
        base_price: 40.00,
        category: 'Rompers',
        image_url: 'https://plus.unsplash.com/premium_photo-1675183690669-64b6473d1d06?q=80&w=1000&auto=format&fit=crop',
        sku: 'ROM-004'
    },
    {
        name: 'Floral Print Romper',
        description: 'Vintage-inspired floral print on organic cotton poplin.',
        base_price: 48.00,
        category: 'Rompers',
        image_url: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1000&auto=format&fit=crop',
        sku: 'ROM-005'
    },

    // SLEEPWEAR
    {
        name: 'Starry Night Sleeper',
        description: 'Footed sleeper with zipper for easy changes. Star pattern.',
        base_price: 36.00,
        category: 'Sleepwear',
        image_url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop',
        sku: 'SLP-001'
    },
    {
        name: 'Bamboo Zip Suit - Cream',
        description: 'Silky smooth bamboo viscose sleeper. Temperature regulating.',
        base_price: 40.00,
        category: 'Sleepwear',
        image_url: 'https://images.unsplash.com/photo-1621452773781-0f992ee03591?q=80&w=1000&auto=format&fit=crop',
        sku: 'SLP-002'
    },
    {
        name: 'Bamboo Zip Suit - Blush',
        description: 'Silky smooth bamboo viscose sleeper in soft blush.',
        base_price: 40.00,
        category: 'Sleepwear',
        image_url: 'https://images.unsplash.com/photo-1617331945415-46c2d829dc78?q=80&w=1000&auto=format&fit=crop',
        sku: 'SLP-003'
    },
    {
        name: 'Organic Ribbed PJ Set',
        description: 'Two-piece ribbed pajama set for toddlers.',
        base_price: 38.00,
        category: 'Sleepwear',
        image_url: 'https://images.unsplash.com/photo-1610147323479-a7fb11ffd5dd?q=80&w=1000&auto=format&fit=crop',
        sku: 'SLP-004'
    },
    {
        name: 'Cozy Fleece Sleeper',
        description: 'Warm fleece sleeper for colder nights.',
        base_price: 32.00,
        category: 'Sleepwear',
        image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
        sku: 'SLP-005'
    },

    // BONNETS
    {
        name: 'Heirloom Knit Bonnet',
        description: 'Hand-knitted bonnet with tie closure. Classic style.',
        base_price: 28.00,
        category: 'Bonnets',
        image_url: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop',
        sku: 'BON-001'
    },
    {
        name: 'Linen Sun Bonnet',
        description: 'Lightweight linen bonnet with brim for sun protection.',
        base_price: 32.00,
        category: 'Bonnets',
        image_url: 'https://images.unsplash.com/photo-1520013327943-b3a8a3c05932?q=80&w=1000&auto=format&fit=crop',
        sku: 'BON-002'
    },
    {
        name: 'Sherpa Ear Flap Hat',
        description: 'Cozy sherpa lined hat with ear flaps.',
        base_price: 30.00,
        category: 'Bonnets',
        image_url: 'https://images.unsplash.com/photo-1544126566-47aee829399a?q=80&w=1000&auto=format&fit=crop',
        sku: 'BON-003'
    },
    {
        name: 'Eyelet Lace Bonnet',
        description: 'Delicate lace bonnet for special occasions.',
        base_price: 35.00,
        category: 'Bonnets',
        image_url: 'https://images.unsplash.com/photo-1604595856114-15024b455648?q=80&w=1000&auto=format&fit=crop',
        sku: 'BON-004'
    },
    {
        name: 'Pixie Hood Bonnet',
        description: 'Pointed pixie style bonnet in soft wool blend.',
        base_price: 34.00,
        category: 'Bonnets',
        image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop',
        sku: 'BON-005'
    },

    // BOOTIES
    {
        name: 'Leather Moccasins',
        description: 'Soft-sole leather moccasins, fringe detail.',
        base_price: 45.00,
        category: 'Booties',
        image_url: 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=1000&auto=format&fit=crop',
        sku: 'BOO-001'
    },
    {
        name: 'Knit Booties - Cream',
        description: 'Hand-knit booties with tie.',
        base_price: 24.00,
        category: 'Booties',
        image_url: 'https://images.unsplash.com/photo-1543327170-ae69cb0eb2f6?q=80&w=1000&auto=format&fit=crop',
        sku: 'BOO-002'
    },
    {
        name: 'Fleece Lined Booties',
        description: 'Stay-on booties with velcro closure and fleece lining.',
        base_price: 30.00,
        category: 'Booties',
        image_url: 'https://images.unsplash.com/photo-1520268155208-5d2ee5204487?q=80&w=1000&auto=format&fit=crop',
        sku: 'BOO-003'
    },
    {
        name: 'Suede Pre-Walkers',
        description: 'Classic suede shoes for pre-walkers.',
        base_price: 42.00,
        category: 'Booties',
        image_url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
        sku: 'BOO-004'
    },
    {
        name: 'Organic Cotton Socks (3-Pack)',
        description: 'Essential ribbed socks in neutral tones.',
        base_price: 18.00,
        category: 'Booties',
        image_url: 'https://images.unsplash.com/photo-1588698939105-09d2f2607474?q=80&w=1000&auto=format&fit=crop',
        sku: 'BOO-005'
    }
];

const sizes = ['NB', '0-3M', '3-6M', '6-12M', '12-18M'];

async function seed() {
    console.log('🌱 Starting seed...');

    for (const product of products) {
        try {
            // 1. Insert Product
            // We use 'upsert' based on SKU if possible, or just insert.
            // Since SKU is not a PK usually, check if exists first to avoid dupes if running multiple times.

            const { data: existing } = await supabase
                .from('products')
                .select('id')
                .eq('sku', product.sku)
                .single();

            let productId = existing?.id;

            if (!productId) {
                const { data, error } = await supabase
                    .from('products')
                    .insert({
                        name: product.name,
                        description: product.description,
                        base_price: product.base_price,
                        category: product.category,
                        sku: product.sku,
                        image_url: product.image_url
                    })
                    .select()
                    .single();

                if (error) {
                    console.error(`Error inserting ${product.name}:`, error.message);
                    continue;
                }
                productId = data.id;
                console.log(`Inserted ${product.name}`);
            } else {
                console.log(`Skipping ${product.name} (already exists)`);
            }

            // 2. Insert Variants
            if (productId && product.category !== 'Booties') { // Booties might differ but let's just seed sizes for clothes
                for (const size of sizes) {
                    const { error: varError } = await supabase
                        .from('product_variants')
                        .upsert({
                            product_id: productId,
                            size: size,
                            color: 'Default', // Simplify for now
                            inventory_count: Math.floor(Math.random() * 20), // Random stock
                            sku_variant: `${product.sku}-${size}`
                        }, { onConflict: 'sku_variant' }); // Assuming sku_variant logic or just rely on insert

                    // If we don't have constraints, just insert. Ideally we have unique constraint on product+size+color
                }
            }

        } catch (e) {
            console.error('Unexpected error:', e);
        }
    }

    console.log('✅ Seeding complete!');
}

seed();
