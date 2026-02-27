const { getPool } = require("../config/database");

exports.getCourseDetails = async (req, res) => {
  let connection;
  const courseId = req.params.id; 
  const sql = "SELECT * FROM courses WHERE id = ?"; 

  try {
    connection = await getPool().getConnection();
    const [results] = await connection.query(sql, [courseId]);
    if (results.length === 0) {
      res.status(404).send("Course not found");
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).send("Error fetching course details");
  } finally {
    if (connection) await connection.release();
  }
};
