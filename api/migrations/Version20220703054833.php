<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220703054833 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE respondent_opinions (respondent_id INT NOT NULL, opinion_id INT NOT NULL, INDEX IDX_9926A734CE80CD19 (respondent_id), INDEX IDX_9926A73451885A6A (opinion_id), PRIMARY KEY(respondent_id, opinion_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE respondent_opinions ADD CONSTRAINT FK_9926A734CE80CD19 FOREIGN KEY (respondent_id) REFERENCES respondent (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE respondent_opinions ADD CONSTRAINT FK_9926A73451885A6A FOREIGN KEY (opinion_id) REFERENCES opinion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE respondent DROP FOREIGN KEY FK_409B515051885A6A');
        $this->addSql('DROP INDEX IDX_409B515051885A6A ON respondent');
        $this->addSql('ALTER TABLE respondent DROP opinion_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE respondent_opinions');
        $this->addSql('ALTER TABLE respondent ADD opinion_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B515051885A6A FOREIGN KEY (opinion_id) REFERENCES opinion (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_409B515051885A6A ON respondent (opinion_id)');
    }
}
