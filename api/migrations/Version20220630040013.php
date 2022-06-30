<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220630040013 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE review_respondents DROP FOREIGN KEY FK_EE3E9D2A76ED395');
        $this->addSql('DROP INDEX IDX_EE3E9D2A76ED395 ON review_respondents');
        $this->addSql('ALTER TABLE review_respondents DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE review_respondents CHANGE user_id respondent_id INT NOT NULL');
        $this->addSql('ALTER TABLE review_respondents ADD CONSTRAINT FK_EE3E9D2CE80CD19 FOREIGN KEY (respondent_id) REFERENCES respondent (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_EE3E9D2CE80CD19 ON review_respondents (respondent_id)');
        $this->addSql('ALTER TABLE review_respondents ADD PRIMARY KEY (review_id, respondent_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE review_respondents DROP FOREIGN KEY FK_EE3E9D2CE80CD19');
        $this->addSql('DROP INDEX IDX_EE3E9D2CE80CD19 ON review_respondents');
        $this->addSql('ALTER TABLE review_respondents DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE review_respondents CHANGE respondent_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE review_respondents ADD CONSTRAINT FK_EE3E9D2A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_EE3E9D2A76ED395 ON review_respondents (user_id)');
        $this->addSql('ALTER TABLE review_respondents ADD PRIMARY KEY (review_id, user_id)');
    }
}
