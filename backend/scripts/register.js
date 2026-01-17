require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const User = require("../src/models/User");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (q) =>
  new Promise((resolve) => rl.question(q, resolve));

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const username = await question("Kullanıcı adı: ");
    const password = await question("Şifre: ");

    const exists = await User.findOne({ username });
    if (exists) {
      console.log("Bu kullanıcı zaten var");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword
    });

    console.log("Kullanıcı başarıyla oluşturuldu");
    process.exit(0);
  } catch (err) {
    console.error("Hata:", err);
    process.exit(1);
  }
};

run();