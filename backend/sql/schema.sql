CREATE TABLE IF NOT EXISTS water_quality (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site_id INT,
  date DATE,
  day VARCHAR(20),
  month VARCHAR(20),
  year INT,
  chlorophyll FLOAT,
  dissolved_oxygen FLOAT,
  salinity FLOAT,
  turbidity FLOAT,
  oxygen_saturation FLOAT,
  temperature FLOAT,
  pH FLOAT,
  suspended_solids FLOAT,
  ammonia FLOAT,
  total_nitrogen FLOAT,
  total_phosphorus FLOAT
);

CREATE TABLE IF NOT EXISTS enterococci (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site_id INT,
  sample_datetime DATETIME,
  day VARCHAR(20),
  month VARCHAR(20),
  year INT,
  hour INT,
  minute INT,
  enterococci_value INT
);

CREATE TABLE IF NOT EXISTS daily_rainfall (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site_id INT,
  datetime DATETIME,
  day VARCHAR(20),
  month VARCHAR(20),
  year INT,
  rainfall_mm FLOAT
);
