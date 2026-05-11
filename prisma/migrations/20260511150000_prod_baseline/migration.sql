-- Baseline migration: the production database schema already existed before Prisma Migrate
-- was introduced. No DDL runs here — you mark this migration as applied instead.
--
-- One-time setup on production / existing DB:
--   1) npx prisma migrate resolve --applied 20260511150000_prod_baseline
--
-- Then either:
--   A) Index Pin_tripId_title_key NOT created yet → npx prisma migrate deploy
--   B) Index already applied manually          → npx prisma migrate resolve --applied 20260511153000_pin_trip_title_unique

SELECT 1;
