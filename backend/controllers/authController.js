const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.LIBRARIAN_EMAIL ||
    password !== process.env.LIBRARIAN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { email, role: "librarian" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
};

module.exports = { login };