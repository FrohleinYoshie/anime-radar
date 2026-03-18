CREATE TABLE anime_events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    published_at TEXT NOT NULL,
    anime_title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    event_start TEXT,
    event_end TEXT,
    is_hot INTEGER DEFAULT 0,
    status TEXT DEFAULT 'ANNOUNCED'
);

CREATE INDEX idx_category ON anime_events(category);
CREATE INDEX idx_anime_title ON anime_events(anime_title);
CREATE INDEX idx_published_at ON anime_events(published_at);