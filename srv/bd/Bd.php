<?php

class Bd
{
  private static ?PDO $pdo = null;

  static function pdo(): PDO
  {
    if (self::$pdo === null) {

      self::$pdo = new PDO(
        // cadena de conexión
        "mysql:host=localhost;dbname=gyman",
        // usuario
        "root",
        // contraseña
        "",
        // Opciones: pdos no persistentes y lanza excepciones.
        [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
      );

      self::$pdo->exec(
        "CREATE TABLE IF NOT EXISTS SUCURSAL (
          SUC_ID VARCHAR(500) NOT NULL,
          SUC_NOMBRE TEXT NOT NULL,
          SUC_UBICACION TEXT NOT NULL,
          SUC_IMAGEN TEXT NOT NULL,
          SUC_IMAGENES TEXT NULL,
          SUC_ESTADO TEXT NOT NULL,
          SUC_MODIFICACION INTEGER NOT NULL,
          SUC_ELIMINADA INTEGER NOT NULL,
          CONSTRAINT SUC_PK PRIMARY KEY (SUC_ID),
          CONSTRAINT SUC_ID_NV CHECK (CHAR_LENGTH(SUC_ID) > 0),
          CONSTRAINT SUC_NOM_NV CHECK (CHAR_LENGTH(SUC_NOMBRE) > 0),
          CONSTRAINT SUC_UBI_NV CHECK (CHAR_LENGTH(SUC_UBICACION) > 0),
          CONSTRAINT SUC_IMA_NV CHECK (CHAR_LENGTH(SUC_IMAGEN) > 0),
          CONSTRAINT SUC_EST_NV CHECK (CHAR_LENGTH(SUC_ESTADO) > 0)
        ) ENGINE=InnoDB"
      );
    }

    return self::$pdo;
  }
}
