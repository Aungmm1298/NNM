-- =============================================
-- Supabase Setup for Portfolio Contact Form
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. Create the contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name        text        NOT NULL,
    email       text        NOT NULL,
    message     text        NOT NULL,
    created_at  timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone (anonymous visitors) to INSERT a message
CREATE POLICY "Allow public inserts"
    ON contact_messages
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- 4. Only authenticated users (you) can READ messages
CREATE POLICY "Allow authenticated reads"
    ON contact_messages
    FOR SELECT
    TO authenticated
    USING (true);
