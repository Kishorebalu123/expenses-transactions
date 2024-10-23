const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, db) => {
  const { username, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const query = `
      INSERT INTO users (username,password) VALUES (?,?);`;
       await db.run(query,[username,hashedPassword]);
      res.send("User registered successfully");
  } else {
    res.status = 400;
    res.send("User already exists");
  }


};

const loginUser = async (req, res, db) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;
    const dbUser = await db.get(query,[username]);
    if (dbUser === undefined) {
      res.status(400);
      res.send("Invalid User");
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched === true) {
     console.log(dbUser.id)
        const payload = {id: dbUser.id};
          const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        res.send({jwtToken});
      } else {
        res.status(400);
        res.send("Invalid Password");
      }
    }
};

module.exports = { registerUser, loginUser };
