-- Add rich media columns
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS images_360 TEXT[], -- Array of URLs for 360 view
ADD COLUMN IF NOT EXISTS gallery_images TEXT[]; -- Array of additional gallery images

-- Add SEO columns
ALTER TABLE products
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS seo_keywords TEXT[];

-- Update RLS to allow reading these new columns (already covered by "Select *" logic but good practice to verify policies, which we did and they are effectively "true" for public)
