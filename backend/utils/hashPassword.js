const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the password to hash: ", async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("Hashed Password:", hashedPassword);
  rl.close();
});


//Enter the password to hash: admin2023
//Hashed Password: $2a$10$729RAv4pQrb59bAE8QODDuAGJChNJApqP2HmF5mGo93TPtBZkYKDO