<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220703040459 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE review_respondents');
        $this->addSql('ALTER TABLE respondent ADD review_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE respondent ADD CONSTRAINT FK_409B51503E2E969B FOREIGN KEY (review_id) REFERENCES review (id)');
        $this->addSql('CREATE INDEX IDX_409B51503E2E969B ON respondent (review_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE review_respondents (review_id INT NOT NULL, respondent_id INT NOT NULL, INDEX IDX_EE3E9D23E2E969B (review_id), INDEX IDX_EE3E9D2CE80CD19 (respondent_id), PRIMARY KEY(review_id, respondent_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE review_respondents ADD CONSTRAINT FK_EE3E9D23E2E969B FOREIGN KEY (review_id) REFERENCES review (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE review_respondents ADD CONSTRAINT FK_EE3E9D2CE80CD19 FOREIGN KEY (respondent_id) REFERENCES respondent (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE respondent DROP FOREIGN KEY FK_409B51503E2E969B');
        $this->addSql('DROP INDEX IDX_409B51503E2E969B ON respondent');
        $this->addSql('ALTER TABLE respondent DROP review_id');
    }
}
