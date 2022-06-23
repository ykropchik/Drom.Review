<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623084526 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE qualification (id INT AUTO_INCREMENT NOT NULL, specialization_id INT DEFAULT NULL, grade_id INT DEFAULT NULL, INDEX IDX_B712F0CEFA846217 (specialization_id), INDEX IDX_B712F0CEFE19A1A8 (grade_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_qualifications (user_id INT NOT NULL, qualification_id INT NOT NULL, INDEX IDX_CE0ED15A76ED395 (user_id), INDEX IDX_CE0ED151A75EE38 (qualification_id), PRIMARY KEY(user_id, qualification_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE qualification ADD CONSTRAINT FK_B712F0CEFA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id)');
        $this->addSql('ALTER TABLE qualification ADD CONSTRAINT FK_B712F0CEFE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id)');
        $this->addSql('ALTER TABLE user_qualifications ADD CONSTRAINT FK_CE0ED15A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_qualifications ADD CONSTRAINT FK_CE0ED151A75EE38 FOREIGN KEY (qualification_id) REFERENCES qualification (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE user_qualification');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_qualifications DROP FOREIGN KEY FK_CE0ED151A75EE38');
        $this->addSql('CREATE TABLE user_qualification (id INT AUTO_INCREMENT NOT NULL, specialization_id INT DEFAULT NULL, grade_id INT DEFAULT NULL, user_id INT NOT NULL, INDEX IDX_599C5D9EA76ED395 (user_id), INDEX IDX_599C5D9EFA846217 (specialization_id), INDEX IDX_599C5D9EFE19A1A8 (grade_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EFA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EFE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('DROP TABLE qualification');
        $this->addSql('DROP TABLE user_qualifications');
    }
}
