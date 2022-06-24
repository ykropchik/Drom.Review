<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623035006 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE grade (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE question (id INT AUTO_INCREMENT NOT NULL, text VARCHAR(1024) NOT NULL, rating LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', specialization_id INT NOT NULL, grade_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE review (id INT AUTO_INCREMENT NOT NULL, date_start DATETIME NOT NULL, date_end DATETIME DEFAULT NULL, user_id INT NOT NULL, respondents LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', self_review VARCHAR(255) DEFAULT NULL, qualification LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', status VARCHAR(255) NOT NULL, history LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE specialization (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE specialization_grades (id INT AUTO_INCREMENT NOT NULL, specialization_id INT NOT NULL, grade_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, full_name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_qualification (id INT AUTO_INCREMENT NOT NULL, specialization_id INT DEFAULT NULL, grade_id INT DEFAULT NULL, user_id INT NOT NULL, INDEX IDX_599C5D9EFA846217 (specialization_id), INDEX IDX_599C5D9EFE19A1A8 (grade_id), INDEX IDX_599C5D9EA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EFA846217 FOREIGN KEY (specialization_id) REFERENCES specialization (id)');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EFE19A1A8 FOREIGN KEY (grade_id) REFERENCES grade (id)');
        $this->addSql('ALTER TABLE user_qualification ADD CONSTRAINT FK_599C5D9EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_qualification DROP FOREIGN KEY FK_599C5D9EFE19A1A8');
        $this->addSql('ALTER TABLE user_qualification DROP FOREIGN KEY FK_599C5D9EFA846217');
        $this->addSql('ALTER TABLE user_qualification DROP FOREIGN KEY FK_599C5D9EA76ED395');
        $this->addSql('DROP TABLE grade');
        $this->addSql('DROP TABLE question');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE specialization');
        $this->addSql('DROP TABLE specialization_grades');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_qualification');
    }
}