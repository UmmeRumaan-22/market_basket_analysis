const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ===============================
// SIGNUP
// ===============================

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECK EMAIL EXISTS
    const checkSql =
      "SELECT * FROM users WHERE email=?";

    db.query(
      checkSql,
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Database Error",
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        // HASH PASSWORD
        const hashedPassword =
          await bcrypt.hash(password, 10);

        // INSERT USER
        const sql =
          "INSERT INTO users(name,email,password) VALUES(?,?,?)";

        db.query(
          sql,
          [name, email, hashedPassword],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message:
                  "Registration Failed",
              });
            }

            res.status(201).json({
              message:
                "User Registered Successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// LOGIN
// ===============================

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    const sql =
      "SELECT * FROM users WHERE email=?";

    db.query(
      sql,
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Database Error",
          });
        }

        if (result.length === 0) {
          return res.status(400).json({
            message: "User Not Found",
          });
        }

        const user = result[0];

        // COMPARE PASSWORD
        const isMatch =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }

        // GENERATE TOKEN
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({
          message: "Login Successful",
          token,
          user,
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
