import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import mealRoutes from './routes/meal.js';
import login from './routes/login.js';
import register from './routes/register.js';
import forgotpassword from './routes/forgotpassword.js';
import resetpassword from './routes/resetpassword.js';
import goal from './routes/goal.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//Lấy dữ liệu thức ăn
app.use('/', mealRoutes);
app.use('/meal', mealRoutes);

//Đăng nhập
app.use('/login', login)

//Đăng ký
app.use('/register', register)

//Quên mật khẩu
app.use('/forgotpassword', forgotpassword)

//Thay đổi mật khẩu
app.use('/resetpassword', resetpassword)

//Cập nhật bodyIndex
app.use('/goal', goal)



const CONNECTION_STRING = 'mongodb://localhost:27017/DATN';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
