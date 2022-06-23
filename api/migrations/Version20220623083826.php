<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623083826 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE review ADD specialization_id INT DEFAULT NULL, ADD grade_id INT DEFAULT NULL, DROP qualification');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6FA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6FE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id)');
        $this->addSql('CREATE INDEX IDX_794381C6FA846217 ON review (specialization_id)');
        $this->addSql('CREATE INDEX IDX_794381C6FE19A1A8 ON review (grade_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6FA846217');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6FE19A1A8');
        $this->addSql('DROP INDEX IDX_794381C6FA846217 ON review');
        $this->addSql('DROP INDEX IDX_794381C6FE19A1A8 ON review');
        $this->addSql('ALTER TABLE review ADD qualification LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', DROP specialization_id, DROP grade_id');
    }
}
