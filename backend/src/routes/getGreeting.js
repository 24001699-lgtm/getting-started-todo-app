const GREETINGS = [
  "Xin chào thế giới",
  "Đây là hiển thị của lời chào",
];

module.exports = async (req, res) => {
  res.send({
    greeting: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
  });
};