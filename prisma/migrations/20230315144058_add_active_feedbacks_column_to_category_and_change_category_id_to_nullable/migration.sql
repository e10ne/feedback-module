-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `feedbacks_category_id_fkey`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `active_feedbacks` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `feedbacks` MODIFY `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
