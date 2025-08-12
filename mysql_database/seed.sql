
-- database/seed.sql
-- Seed data for WOGG Application

USE wogg_mysql_db;

-- Insert admin user (password: hashed 'admin123')
INSERT INTO users (email, password, role, status) VALUES
('admin@wogg.ro', '$2a$10$x8.yOqZ3SB1CJBxjV8DfnurRHAEqHT7LmPJ3GKKQ5nL8kJ9wQ7vDG', 'ADMIN', 'ACTIVE');

-- Insert sample users
INSERT INTO users (email, password, role, status) VALUES
('john.doe@yopmail.com', '$2a$10$x8.yOqZ3SB1CJBxjV8DfnurRHAEqHT7LmPJ3GKKQ5nL8kJ9wQ7vDG', 'USER', 'ACTIVE'),
('marie.dupont@yopmail.com', '$2a$10$x8.yOqZ3SB1CJBxjV8DfnurRHAEqHT7LmPJ3GKKQ5nL8kJ9wQ7vDG', 'USER', 'PENDING'),
('william.smith@yopmail.com', '$2a$10$x8.yOqZ3SB1CJBxjV8DfnurRHAEqHT7LmPJ3GKKQ5nL8kJ9wQ7vDG', 'USER', 'ACTIVE');



-- Insert creators
INSERT INTO creators (name, bio, birth_year, death_year, creator_type) VALUES
('Mojang Studios', 'Swedish video game developer based in Stockholm. A first-party developer for Xbox Game Studios, the studio is best known for developing the sandbox and survival game Minecraft, the best-selling video game of all time.', 2009, Null, 'STUDIO'),
('Epic Games', 'American company founded by CEO Tim Sweeney. The company is headquartered in Cary, North Carolina and has dozens of offices worldwide. Epic is a leading interactive entertainment company and provider of 3D engine technology.', 1991, NULL, 'Corporation'),
('Nintendo', 'Japanese multinational video game company headquartered in Kyoto. The company became internationally dominant in the 1980s after the arcade release of Donkey Kong (1981) and the Nintendo Entertainment System, which launched outside of Japan alongside Super Mario Bros. in 1985.', 1694, NULL, 'Corporation'),
('FromSoftware, Inc.', 'Japanese video game developer and publisher. Founded by Naotoshi Zin as a business software developer, the company released their first video game, King''s Field, for the PlayStation in 1994', 1986, NULL, 'STUDIO'),
('Rockstar Games, Inc.', 'American video game publisher based in New York City. The company was established as a subsidiary of Take-Two Interactive, using the assets Take-Two had previously acquired from BMG Interactive.', 1998, NULL, 'STUDIO'),
('Team Cherry', 'Small indie games team in Adelaide, South Australia. Our mission is to build crazy and exciting worlds for you to explore and conquer.', 2014, NULL, 'INDIE-TEAM'),
('ConcernedApe', 'Eric Lorenz Barone, known professionally as ConcernedApe, is an American video game designer and musician. He is best known for creating the 2016 video game Stardew Valley.', 1987, NULL, 'SINGLE-AUTHOR'),
('Riot Games, Inc.', 'American video game developer, publisher, and esports tournament organizer based in Los Angeles. It was founded in September 2006 by Brandon Beck and Marc Merrill to develop several tactical and spin-off games.', 2006, NULL, 'STUDIO'),
('Namco Ltd', 'A Japanese multinational video game and entertainment company founded in 1955. It operated video arcades and amusement parks globally, and produced video games, films, toys, and arcade cabinets.', 1955, 2006, 'CORPORATION'),
('Dong Nguyen (dotGears)', 'A Vietnamese game developer, best known as the creator of the popular mobile game Flappy Bird. He founded and leads the game development studio .GEARS (also known as dotGears)', 1985, NULL, 'SINGLE-AUTHOR'),
('Zhiduopin', 'Chinese manufacturer selling collectibles with organized themes and product lines', 2023, NULL, 'Corporation'),
('Paladone', 'Their products let consumers express themselves and interact with the brands and trends they love - connecting fans and fulfilling people''s innate desires for self-expression', 1994, NULL, 'Corporation')
;



-- Insert Video Games
-- A price of -111 means Free + In App Purchases (IAP)
-- A price of -222 means Price is unknown/Not Available (n/a)
INSERT INTO stocks (name, description, creator_id, product_type, creation_year, price, photo_url)
    VALUES
('Minecraft', 'Sandbox, open-world block-building game', 1, 'GAME', 2011, 29.99, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9611f013-c695-4295-8629-9efbf6ad91f5/d8fq705-9c593c93-37cc-4913-ab7f-7309ae72fc8c.jpg/v1/fill/w_1024,h_740,q_75,strp/minecraft_art_by_upacers_d8fq705-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzQwIiwicGF0aCI6IlwvZlwvOTYxMWYwMTMtYzY5NS00Mjk1LTg2MjktOWVmYmY2YWQ5MWY1XC9kOGZxNzA1LTljNTkzYzkzLTM3Y2MtNDkxMy1hYjdmLTczMDlhZTcyZmM4Yy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X7prt43SwPRTa8hoz50D_qGIfKCy02Boxtc_xDFsZpY'),
('Fortnite', 'Battle royale and creative sandbox game', 2, 'GAME', 2017, -111, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Fortnite_at_E3_2018_%2841868702965%29.jpg/330px-Fortnite_at_E3_2018_%2841868702965%29.jpg'),
('The Legend of Zelda: Breath of the Wild', 'Open-world adventure/action RPG', 3, 'GAME', 2017, 59.99, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2ccc4123-81ba-465b-a443-e377356b6d58/dbry65t-68bd9cb1-e7d9-4111-b2ab-4386d39d50ed.jpg/v1/fit/w_800,h_450,q_70,strp/zelda_breath_of_the_wild_triforce_wallpaper_by_mentalmars_dbry65t-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvMmNjYzQxMjMtODFiYS00NjViLWE0NDMtZTM3NzM1NmI2ZDU4XC9kYnJ5NjV0LTY4YmQ5Y2IxLWU3ZDktNDExMS1iMmFiLTQzODZkMzlkNTBlZC5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.fKg3gXYeA0SKdjOMXcqovVCzSn5iBonxV3nL5MeDYLw'),
('Elden Ring', 'Dark fantasy open-world RPG', 4, 'GAME', 2022, 59.99, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8efd62b4-05ec-4237-9336-abae8a8801fb/dgbs27i-b3c75331-a639-4ff5-b778-3f1b200bc50c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhlZmQ2MmI0LTA1ZWMtNDIzNy05MzM2LWFiYWU4YTg4MDFmYlwvZGdiczI3aS1iM2M3NTMzMS1hNjM5LTRmZjUtYjc3OC0zZjFiMjAwYmM1MGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-S6JCnS7EAj-ZZnfZfo6BTC7VvHaikTCQcnUOPAOMjI'),
('Grand Theft Auto V', 'Open-world action-adventure', 5, 'GAME', 2013, 45.99, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/203de7b9-0dab-43f1-b096-fdebb204fc22/d5jthui-3f2caf6f-4d52-4cd3-bdf3-c210e69b6b44.jpg/v1/fit/w_625,h_650,q_70,strp/grand_theft_auto_v___icon_by_ivances_d5jthui-375w-2x.jpg'),
('Animal Crossing: New Horizons', 'Social simulation', 3, 'GAME', 2020, 59.99, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e558db9c-ca9a-4fb7-af65-60c6c53244b8/dg20nde-87d154fb-66ae-49e9-bc6a-408ff0ec07c5.png/v1/fill/w_894,h_894/animal_crossing_new_horizons_dock_icon_by_lexiloo826_dg20nde-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvZTU1OGRiOWMtY2E5YS00ZmI3LWFmNjUtNjBjNmM1MzI0NGI4XC9kZzIwbmRlLTg3ZDE1NGZiLTY2YWUtNDllOS1iYzZhLTQwOGZmMGVjMDdjNS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.EDORNLcQ9dP9AIqKvF0VsnoPdHmbfJoJx9NhkMVv3os'),
('Hollow Knight', 'Metroidvania action-adventure', 6, 'GAME', 2017, 14.99, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c4c1bfd6-740f-4577-a3d0-0cb5b71fb2df/dfmmj3p-8ea2ffb1-e220-447a-aab9-7c0d68691650.png/v1/fit/w_512,h_512/hollow_knight_by_da_gamecovers_dfmmj3p-375w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvYzRjMWJmZDYtNzQwZi00NTc3LWEzZDAtMGNiNWI3MWZiMmRmXC9kZm1tajNwLThlYTJmZmIxLWUyMjAtNDQ3YS1hYWI5LTdjMGQ2ODY5MTY1MC5wbmciLCJ3aWR0aCI6Ijw9NTEyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.lpSBLM40L-9lVMPTgiCdSt6e90_uEBeLTWb0rQhba3E'),
('Stardew Valley', 'Farming simulation/RPG', 7, 'GAME', 2016, 14.99, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/adaede8c-c3ec-4497-8538-214f9b3f4c03/d9vnr9p-890f0d16-3adb-4a95-9d2f-cecebc6b2142.png/v1/fill/w_944,h_847,q_70,strp/_mods__all_villager_portraits_in_stardew_valley_by_our_times_d9vnr9p-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjEyNSIsInBhdGgiOiJcL2ZcL2FkYWVkZThjLWMzZWMtNDQ5Ny04NTM4LTIxNGY5YjNmNGMwM1wvZDl2bnI5cC04OTBmMGQxNi0zYWRiLTRhOTUtOWQyZi1jZWNlYmM2YjIxNDIucG5nIiwid2lkdGgiOiI8PTIzNjgifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Ar2XecGsPOdoD1GVf9ybjzcxRko3tIJOshAuWgf412I'),
('Valorant', 'Tactical hero shooter', 8, 'GAME', 2020, -111, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8adefab8-9a4e-4fa7-8ad7-e2e4cf9cf1e9/dgrizg7-b476191f-192c-45d4-974b-2d1b6f66f042.jpg/v1/fill/w_1192,h_670,q_70,strp/valoran_by_kikoldraws_dgrizg7-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ0MCIsInBhdGgiOiJcL2ZcLzhhZGVmYWI4LTlhNGUtNGZhNy04YWQ3LWUyZTRjZjljZjFlOVwvZGdyaXpnNy1iNDc2MTkxZi0xOTJjLTQ1ZDQtOTc0Yi0yZDFiNmY2NmYwNDIuanBnIiwid2lkdGgiOiI8PTI1NjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Bz92275qwqYlBH9FENXMlKZIAqIT8kp_z7z4UZmS0yg'),
('League of Legends', 'MOBA', 8, 'GAME', 2009, -111, 'https://assets.dearplayers.com/products/MV5BYjM2NmU3YmEtZDI1OC00NTQ5LWJmOGMtYmZmNGUyMWRlODBmXkEyXkFqcGdeQXVyNjU1OTg4OTM._V1__84.jpg'),
('Pac-Man', 'Maze arcade game, eat pellets and avoid ghosts', 9, 'GAME', 1980, -222, 'https://pyramidinternational.com/cdn/shop/files/wdc100822_bcbdcf86-0bfa-4374-aa02-690cc90c299d.jpg?v=1738716463'),
('GALAGA', 'Fixed shooter arcade game', 9, 'GAME', 1981, -222, 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_600/ncom/software/switch/70010000043851/e1836b7e3ca8e2109f5cf0adc3ecae95d72c20d9903afb155bc58573dfe8100d'),
('Flappy Bird', 'Side-scrolling endless runner game', 10, 'GAME', 2013, -222, 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/474/827/datas/original.jpg')
;


-- Insert Hardware for Rental
-- price here will indicate price per week (7 days)
INSERT INTO stocks (name, description, creator_id, product_type, creation_year, price, photo_url)
VALUES
('Nintendo Switch', 'Hybrid handheld/home gaming console. Note:Replacement cost = $349', 3, 'HARDWARE', 2017, 7, 'https://www.nintendo.com/sg/hardware/switch/img/menu/hardware-had.png')
;


-- Insert Merch
INSERT INTO stocks (name, description, creator_id, product_type, creation_year, price, photo_url)
VALUES
('Bricks Minions', 'Zhiduopin Q5040 Bricks featuring one of the Minions from Illumination. Micro building blocks that compete in the LEGO-alternative market', 11, 'MERCHANDISE', 2024, 17, 'https://ir.ozone.ru/s3/multimedia-1-0/wc1000/7047853920.jpg'),
('Bricks Spiderman', 'Zhiduopin Q5046 Bricks featuring Spiderman from Marvel. Micro building blocks that compete in the LEGO-alternative market', 11, 'MERCHANDISE', 2022, 15, 'https://kyotomerch.com/wp-content/uploads/2024/12/img_alibaba_1733434358_13-510x510.jpeg'),
('Swag PlayStation Icons Light', ' Level up your gaming setup with our LED neon sign available in a variety of colours, this playful sign is sure to add a touch of fun and nostalgia to any room.', 12, 'MERCHANDISE', 2018, 37, 'https://www.djsupplies.co.uk/cdn/shop/products/psiconsusb_1024x1024.jpg?v=1604356172')
;
 

-- Insert sample reservations
INSERT INTO reservations (user_id, product_id, quantity_reserved, status, reserved_at, expires_at)
VALUES
(2, 1, 2, 'PENDING', DATE_SUB(NOW(), INTERVAL 8 DAY), DATE_ADD(DATE_SUB(NOW(), INTERVAL 8 DAY), INTERVAL 10 DAY )),
(2, 5, 1, 'REDEEMED', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(DATE_SUB(NOW(), INTERVAL 2 DAY), INTERVAL 10 DAY )),
(3, 8, 1, 'PENDING', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_ADD(DATE_SUB(NOW(), INTERVAL 5 DAY), INTERVAL 10 DAY )),
(3, 14, 1, 'PENDING', DATE_SUB(NOW(), INTERVAL 4 DAY), DATE_ADD(DATE_SUB(NOW(), INTERVAL 4 DAY), INTERVAL 10 DAY )),
(4, 12, 3, 'PENDING', DATE_SUB(NOW(), INTERVAL 9 DAY), DATE_ADD(DATE_SUB(NOW(), INTERVAL 9 DAY), INTERVAL 10 DAY ));

-- Update redeemed reservation
UPDATE reservations SET redeemed_at = DATE_SUB(NOW(), INTERVAL 1 DAY) WHERE id = 2;

