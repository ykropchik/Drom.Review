<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623064208 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE opinion (id INT AUTO_INCREMENT NOT NULL, question_id INT DEFAULT NULL, respondent_id INT NOT NULL, уы�estimate VARCHAR(1023) DEFAULT NULL, INDEX IDX_AB02B0271E27F6BF (question_id), INDEX IDX_AB02B027CE80CD19 (respondent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE respondent (id INT AUTO_INCREMENT NOT NULL, review_id INT DEFAULT NULL, user_id INT NOT NULL, comment VARCHAR(512) DEFAULT NULL, approved LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', user_comment VARCHAR(255) DEFAULT NULL, INDEX IDX_409B51503E2E969B (review_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B0271E27F6BF FOREIGN KEY (question_id) REFERENCES question (id)');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B027CE80CD19 FOREIGN KEY (respondent_id) REFERENCES respondent (id)');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B51503E2E969B FOREIGN KEY (review_id) REFERENCES review (id)');
        $this->addSql('ALTER TABLE review ADD subject_id INT DEFAULT NULL, DROP respondents');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C623EDC87 FOREIGN KEY (subject_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_794381C623EDC87 ON review (subject_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B027CE80CD19');
        $this->addSql('DROP TABLE opinion');
        $this->addSql('DROP TABLE respondent');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C623EDC87');
        $this->addSql('DROP INDEX IDX_794381C623EDC87 ON review');
        $this->addSql('ALTER TABLE review ADD respondents LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', DROP subject_id');
    }
}
