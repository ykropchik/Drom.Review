<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220630032511 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE opinion (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, estimate VARCHAR(255) NOT NULL, INDEX IDX_AB02B0271E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE respondent (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, question_id INT DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, status VARCHAR(20) NOT NULL, INDEX IDX_409B5150A76ED395 (user_id), INDEX IDX_409B51501E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B0271E27F6BF FOREIGN KEY (question_id) REFERENCES question (id)');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B5150A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B51501E27F6BF FOREIGN KEY (question_id) REFERENCES question (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE opinion');
        $this->addSql('DROP TABLE respondent');
    }
}
