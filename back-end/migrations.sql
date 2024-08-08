CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `refreshToken` VARCHAR(512) NULL
);
ALTER TABLE
    `users` ADD UNIQUE `users_username_unique`(`username`);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);

CREATE TABLE `exercises`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `target` VARCHAR(255) NOT NULL,
    `gifUrl` VARCHAR(255) NULL,
    `instructions` JSON NULL,
    `bodyPart` VARCHAR(255) NOT NULL,
    `secondaryMuscles` JSON NULL,
    `equipment` VARCHAR(255) NULL
);

CREATE TABLE `training_programs`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `date_start` DATE NULL,
    `date_end` DATE NULL,
    `id_user` BIGINT UNSIGNED NOT NULL
);

ALTER TABLE
    `training_programs` ADD CONSTRAINT `training_programs_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `users`(`id`) ON DELETE CASCADE;

CREATE TABLE `exercises_training`(
    `id_exercise` BIGINT UNSIGNED NOT NULL,
    `id_scheda` BIGINT UNSIGNED NOT NULL,
    `series` BIGINT NOT NULL,
    `reps` BIGINT NOT NULL,
    `rest` TIME NOT NULL,
    `weight` BIGINT NULL,
    `weight_max_rm` BIGINT NULL,
    `video` VARCHAR(255) NULL
);

ALTER TABLE
    `exercises_training` ADD CONSTRAINT `exercises_training_id_scheda_foreign` FOREIGN KEY(`id_scheda`) REFERENCES `training_programs`(`id`) ON DELETE CASCADE;

ALTER TABLE
    `exercises_training` ADD CONSTRAINT `exercises_training_id_exercise_foreign` FOREIGN KEY(`id_exercise`) REFERENCES `exercises`(`id`) ON DELETE CASCADE;