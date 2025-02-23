-- Create the ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Create the foods table
CREATE TABLE IF NOT EXISTS foods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the food_ingredients junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS food_ingredients (
    food_id INTEGER,
    ingredient_id INTEGER,
    FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (food_id, ingredient_id)
);

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER IF NOT EXISTS foods_update_timestamp
AFTER UPDATE ON foods
BEGIN
    UPDATE foods SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- Insert sample ingredients using INSERT OR IGNORE
INSERT OR IGNORE INTO ingredients (name) VALUES
    ('Tomato'),
    ('Cheese'),
    ('Pepperoni'),
    ('Flour'),
    ('Basil');

-- Delete existing sample foods to avoid duplicates
DELETE FROM foods WHERE name IN ('Pizza', 'Pasta', 'Salad');

-- Insert sample foods
INSERT INTO foods (name, description) VALUES
    ('Pizza', 'Delicious cheesy pizza'),
    ('Pasta', 'Classic Italian pasta'),
    ('Salad', 'Fresh garden salad');

-- Delete existing food-ingredient relationships
DELETE FROM food_ingredients 
WHERE food_id IN (SELECT id FROM foods WHERE name IN ('Pizza', 'Pasta', 'Salad'));

-- Connect foods with ingredients
INSERT INTO food_ingredients (
    food_id,
    ingredient_id
)
SELECT f.id, i.id
FROM foods f, ingredients i
WHERE 
    (f.name = 'Pizza' AND i.name IN ('Tomato', 'Cheese', 'Pepperoni', 'Basil'))
    OR (f.name = 'Pasta' AND i.name IN ('Tomato', 'Cheese', 'Basil'))
    OR (f.name = 'Salad' AND i.name IN ('Tomato', 'Basil'));
