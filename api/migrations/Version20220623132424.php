<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623132424 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE grade (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE opinion (id INT AUTO_INCREMENT NOT NULL, question_id INT DEFAULT NULL, respondent_id INT NOT NULL, estimate VARCHAR(1023) DEFAULT NULL, INDEX IDX_AB02B0271E27F6BF (question_id), INDEX IDX_AB02B027CE80CD19 (respondent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE question (id INT AUTO_INCREMENT NOT NULL, specialization_id INT DEFAULT NULL, grade_id INT DEFAULT NULL, text VARCHAR(1024) NOT NULL, rating LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_B6F7494EFA846217 (specialization_id), INDEX IDX_B6F7494EFE19A1A8 (grade_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE respondent (id INT AUTO_INCREMENT NOT NULL, review_id INT DEFAULT NULL, user_id INT NOT NULL, comment VARCHAR(512) DEFAULT NULL, approved LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', user_comment VARCHAR(255) DEFAULT NULL, INDEX IDX_409B51503E2E969B (review_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE review (id INT AUTO_INCREMENT NOT NULL, subject_id INT DEFAULT NULL, qualification_id INT DEFAULT NULL, date_start DATETIME NOT NULL, date_end DATETIME DEFAULT NULL, self_review VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, history LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_794381C623EDC87 (subject_id), INDEX IDX_794381C61A75EE38 (qualification_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE specialization (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE specialization_grades (specialization_id INT NOT NULL, grade_id INT NOT NULL, INDEX IDX_6D36A695FA846217 (specialization_id), INDEX IDX_6D36A695FE19A1A8 (grade_id), PRIMARY KEY(specialization_id, grade_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, full_name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_qualification (id INT AUTO_INCREMENT NOT NULL, specialization_id INT DEFAULT NULL, grade_id INT DEFAULT NULL, user_id INT NOT NULL, INDEX IDX_599C5D9EFA846217 (specialization_id), INDEX IDX_599C5D9EFE19A1A8 (grade_id), INDEX IDX_599C5D9EA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B0271E27F6BF FOREIGN KEY (question_id) REFERENCES question (id)');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B027CE80CD19 FOREIGN KEY (respondent_id) REFERENCES respondent (id)');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EFA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id)');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EFE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id)');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B51503E2E969B FOREIGN KEY (review_id) REFERENCES review (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C623EDC87 FOREIGN KEY (subject_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C61A75EE38 FOREIGN KEY (qualification_id) REFERENCES user_qualification (id)');
        $this->addSql('ALTER TABLE specialization_grades ADD CONSTRAINT FK_6D36A695FA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE specialization_grades ADD CONSTRAINT FK_6D36A695FE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EFA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id)');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EFE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id)');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494EFE19A1A8');
        $this->addSql('ALTER TABLE specialization_grades DROP FOREIGN KEY FK_6D36A695FE19A1A8');
        $this->addSql('ALTER TABLE user_qualification DROP FOREIGN KEY FK_599C5D9EFE19A1A8');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B0271E27F6BF');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B027CE80CD19');
        $this->addSql('ALTER TABLE respondent DROP FOREIGN KEY FK_409B51503E2E969B');
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494EFA846217');
        $this->addSql('ALTER TABLE specialization_grades DROP FOREIGN KEY FK_6D36A695FA846217');
        $this->addSql('ALTER TABLE user_qualification DROP FOREIGN KEY FK_599C5D9EFA846217');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C623EDC87');
        $this->addSql('ALTER TABLE user_qualification DROP FOREIGN KEY FK_599C5D9EA76ED395');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C61A75EE38');
        $this->addSql('DROP TABLE grade');
        $this->addSql('DROP TABLE opinion');
        $this->addSql('DROP TABLE question');
        $this->addSql('DROP TABLE respondent');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE specialization');
        $this->addSql('DROP TABLE specialization_grades');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_qualification');
    }
}
