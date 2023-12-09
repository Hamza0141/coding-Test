const mysql = require("mysql2/promise");
require("dotenv").config();

// This SQL design is modeled after the structure provided by pvcfittingsonline.com for valve products. The original design can be found at https://www.pvcfittingsonline.com/valves.html.


// connecting to the data base through .env
const pool = mysql.createPool({
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});
// creating main  product table 

const majorProducts = `CREATE TABLE IF NOT EXISTS MajorProducts (
    MajorProductID INT PRIMARY KEY,
    MajorProductName VARCHAR(255) NOT NULL
)`;

// creating subProduct table with in connection of majorProduct
 const SubProducts = `CREATE TABLE IF NOT EXISTS SubProducts (
    SubProductID INT PRIMARY KEY,
    SubProductName VARCHAR(255) NOT NULL,
    MajorProductID INT,
    FOREIGN KEY (MajorProductID) REFERENCES MajorProducts(MajorProductID)
)`;

const ProductDescriptions = `CREATE TABLE IF NOT EXISTS ProductDescriptions (
    ProductID INT PRIMARY KEY,
    ProductType VARCHAR(20) CHECK (ProductType IN ('Major', 'Sub')) NOT NULL,
    Description TEXT 
)`;
// creating ProductImages table for each products 
const ProductImages = `CREATE TABLE IF NOT EXISTS ProductImages (
    ImageID INT PRIMARY KEY,
    MajorProductID INT,
    SubProductID INT,
    ImageUrl VARCHAR(255),
    FOREIGN KEY (MajorProductID) REFERENCES MajorProducts(MajorProductID) ON DELETE CASCADE,
    FOREIGN KEY (SubProductID) REFERENCES SubProducts(SubProductID) ON DELETE CASCADE
)`;


(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(majorProducts);
    await connection.query(SubProducts);
    await connection.query(ProductDescriptions);
    await connection.query(ProductImages);

    // Inserting test data for Valves if needed (if insertion script run twice may cause data duplication leading to errors)

    // await connection.query(
    //   "INSERT INTO MajorProducts (MajorProductID, MajorProductName) VALUES (200, 'Valves')"
    // );
    // await connection.query(
    //   "INSERT INTO SubProducts (SubProductID, SubProductName, MajorProductID) VALUES (201, 'PVC Ball Valves', 200), (202, 'PVC Gate Valves', 200)"
    // );
    // await connection.query(
    //   "INSERT INTO ProductDescriptions (ProductID, ProductType, Description) VALUES (4, 'Major', 'Description for Valves'), (5, 'Sub', 'Description for PVC Ball Valves'), (6, 'Sub', 'Description for PVC Gate Valves')"
    // );

    // await connection.query(
    //   "INSERT INTO ProductImages (ImageID, MajorProductID, ImageUrl) VALUES (4, 200, 'https://example.com/valve.jpg')"
    // );
    // await connection.query(
    //   "INSERT INTO ProductImages (ImageID, SubProductID, ImageUrl) VALUES (5, 201, 'https://example.com/pvc_ball_valve.jpg')"
    // );
    // await connection.query(
    //       "INSERT INTO ProductImages (ImageID, SubProductID, ImageUrl) VALUES (6, 202, 'https://example.com/pvc_gate_valve.jpg')"
    //     );

    connection.release();
    console.log("Tables created and data inserted successfully.");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
})();


module.exports = pool;