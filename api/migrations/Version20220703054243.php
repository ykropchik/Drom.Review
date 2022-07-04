<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220703054243 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE respondent DROP FOREIGN KEY FK_409B51501E27F6BF');
        $this->addSql('DROP INDEX IDX_409B51501E27F6BF ON respondent');
        $this->addSql('ALTER TABLE respondent CHANGE question_id opinion_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B515051885A6A FOREIGN KEY (opinion_id) REFERENCES opinion (id)');
        $this->addSql('CREATE INDEX IDX_409B515051885A6A ON respondent (opinion_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE respondent DROP FOREIGN KEY FK_409B515051885A6A');
        $this->addSql('DROP INDEX IDX_409B515051885A6A ON respondent');
        $this->addSql('ALTER TABLE respondent CHANGE opinion_id question_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B51501E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_409B51501E27F6BF ON respondent (question_id)');
    }
}
