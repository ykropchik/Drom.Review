<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623070730 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE question CHANGE specialization_id specialization_id INT DEFAULT NULL, CHANGE grade_id grade_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EFA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id)');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EFE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id)');
        $this->addSql('CREATE INDEX IDX_B6F7494EFA846217 ON question (specialization_id)');
        $this->addSql('CREATE INDEX IDX_B6F7494EFE19A1A8 ON question (grade_id)');
        $this->addSql('ALTER TABLE review CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_794381C6A76ED395 ON review (user_id)');
        $this->addSql('ALTER TABLE specialization_grades MODIFY id INT NOT NULL');
        $this->addSql('ALTER TABLE specialization_grades DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE specialization_grades DROP id');
        $this->addSql('ALTER TABLE specialization_grades ADD CONSTRAINT FK_6D36A695FA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE specialization_grades ADD CONSTRAINT FK_6D36A695FE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_6D36A695FA846217 ON specialization_grades (specialization_id)');
        $this->addSql('CREATE INDEX IDX_6D36A695FE19A1A8 ON specialization_grades (grade_id)');
        $this->addSql('ALTER TABLE specialization_grades ADD PRIMARY KEY (specialization_id, grade_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494EFA846217');
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494EFE19A1A8');
        $this->addSql('DROP INDEX IDX_B6F7494EFA846217 ON question');
        $this->addSql('DROP INDEX IDX_B6F7494EFE19A1A8 ON question');
        $this->addSql('ALTER TABLE question CHANGE specialization_id specialization_id INT NOT NULL, CHANGE grade_id grade_id INT NOT NULL');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6A76ED395');
        $this->addSql('DROP INDEX IDX_794381C6A76ED395 ON review');
        $this->addSql('ALTER TABLE review CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE specialization_grades DROP FOREIGN KEY FK_6D36A695FA846217');
        $this->addSql('ALTER TABLE specialization_grades DROP FOREIGN KEY FK_6D36A695FE19A1A8');
        $this->addSql('DROP INDEX IDX_6D36A695FA846217 ON specialization_grades');
        $this->addSql('DROP INDEX IDX_6D36A695FE19A1A8 ON specialization_grades');
        $this->addSql('ALTER TABLE specialization_grades ADD id INT AUTO_INCREMENT NOT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
    }
}
