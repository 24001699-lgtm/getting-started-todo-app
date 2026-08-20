const GREETINGS = [
  "Tao là Bùi Tiến Thành!",
  "Chúng mày là con tao!",
  "Mấy thằng nhóc!",
  "Nhìn cái chó gì"
];

module.exports = async (req, res) => {
  res.send({
    greeting: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
  });
};