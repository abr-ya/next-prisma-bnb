-- Unique pin title within the same trip (PostgreSQL treats NULL tripId as distinct rows).
CREATE UNIQUE INDEX "Pin_tripId_title_key" ON "Pin"("tripId", "title");
