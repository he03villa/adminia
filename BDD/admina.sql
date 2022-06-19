-- MySQL Script generated by MySQL Workbench
-- Sat Jun 18 18:47:36 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema intermed_luchomix2
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `intermed_luchomix2` ;

-- -----------------------------------------------------
-- Schema intermed_luchomix2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `intermed_luchomix2` DEFAULT CHARACTER SET utf8 ;
USE `intermed_luchomix2` ;

-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`usuario` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  `email` LONGTEXT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_nacimeinto` DATE NOT NULL,
  `password` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`rol` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`usuario_has_rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`usuario_has_rol` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`usuario_has_rol` (
  `usuario_id` INT NOT NULL,
  `rol_id` INT NOT NULL,
  PRIMARY KEY (`usuario_id`, `rol_id`),
  INDEX `fk_usuario_has_rol_rol1_idx` (`rol_id` ASC),
  INDEX `fk_usuario_has_rol_usuario_idx` (`usuario_id` ASC),
  CONSTRAINT `fk_usuario_has_rol_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `intermed_luchomix2`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_rol_rol1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `intermed_luchomix2`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`tipo_propiedad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`tipo_propiedad` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`tipo_propiedad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  `descripcion` LONGTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`cojunto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`cojunto` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`cojunto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  `direccion` LONGTEXT NOT NULL,
  `ciudad` LONGTEXT NOT NULL,
  `departamento` LONGTEXT NOT NULL,
  `codigo_postal` VARCHAR(7) NOT NULL,
  `codigo` LONGTEXT NOT NULL,
  `status` INT NOT NULL DEFAULT 0,
  `fecha_creacion` DATETIME NOT NULL,
  `correo` LONGTEXT NOT NULL,
  `password` LONGTEXT NOT NULL,
  `tipo_propiedad_id` INT NOT NULL,
  `usuario_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_propiedad_tipo_propiedad1_idx` (`tipo_propiedad_id` ASC),
  INDEX `fk_cojunto_usuario1_idx` (`usuario_id` ASC),
  CONSTRAINT `fk_propiedad_tipo_propiedad1`
    FOREIGN KEY (`tipo_propiedad_id`)
    REFERENCES `intermed_luchomix2`.`tipo_propiedad` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cojunto_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `intermed_luchomix2`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`propiedad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`propiedad` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`propiedad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `cojunto_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_propiedad_cojunto1_idx` (`cojunto_id` ASC),
  CONSTRAINT `fk_propiedad_cojunto1`
    FOREIGN KEY (`cojunto_id`)
    REFERENCES `intermed_luchomix2`.`cojunto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`usuario_has_propiedad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`usuario_has_propiedad` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`usuario_has_propiedad` (
  `usuario_id` INT NOT NULL,
  `propiedad_id` INT NOT NULL,
  `statud` INT NOT NULL,
  PRIMARY KEY (`usuario_id`, `propiedad_id`),
  INDEX `fk_usuario_has_propiedad_usuario1_idx` (`usuario_id` ASC),
  INDEX `fk_usuario_has_propiedad_propiedad1_idx` (`propiedad_id` ASC),
  CONSTRAINT `fk_usuario_has_propiedad_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `intermed_luchomix2`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_propiedad_propiedad1`
    FOREIGN KEY (`propiedad_id`)
    REFERENCES `intermed_luchomix2`.`propiedad` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`tipo_revision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`tipo_revision` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`tipo_revision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  `descripcion` LONGTEXT NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intermed_luchomix2`.`revision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intermed_luchomix2`.`revision` ;

CREATE TABLE IF NOT EXISTS `intermed_luchomix2`.`revision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  `ruta` LONGTEXT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `tipo_revision_id` INT NOT NULL,
  `propiedad_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_revision_tipo_revision1_idx` (`tipo_revision_id` ASC),
  INDEX `fk_revision_propiedad1_idx` (`propiedad_id` ASC),
  CONSTRAINT `fk_revision_tipo_revision1`
    FOREIGN KEY (`tipo_revision_id`)
    REFERENCES `intermed_luchomix2`.`tipo_revision` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_revision_propiedad1`
    FOREIGN KEY (`propiedad_id`)
    REFERENCES `intermed_luchomix2`.`propiedad` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
