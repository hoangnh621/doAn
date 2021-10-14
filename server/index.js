const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Đây nà bà béo đấy')
});

app.listen(port, () => {
    console.log(`Server đang chạy ở cổng http://localhost:${port}`);
})