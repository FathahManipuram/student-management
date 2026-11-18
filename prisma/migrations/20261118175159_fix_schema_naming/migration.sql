/*
Safe schema corrections:
- Rename User.password to User.passwordHash.
- Rename Grade.assesmentName to Grade.assessmentName.
- Change Student.dateOfBirth from DATETIME to DATE.
- Rename the Grade composite unique index.
*/

-- Drop the old unique index before renaming its column.
DROP INDEX `Grade_enrollmentId_assesmentName_key` ON `grade`;

-- Rename the existing Grade column without losing data.
ALTER TABLE `grade`
RENAME COLUMN `assesmentName` TO `assessmentName`;

-- Rename the existing User column without losing data.
ALTER TABLE `user` RENAME COLUMN `password` TO `passwordHash`;

-- Change the date column type.
ALTER TABLE `student` MODIFY `dateOfBirth` DATE NULL;

-- Create the unique index with the corrected column name.
CREATE UNIQUE INDEX `Grade_enrollmentId_assessmentName_key` ON `Grade` (
    `enrollmentId`,
    `assessmentName`
);