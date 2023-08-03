const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser, logout } = require('./controllers/users')
const { NotFoundError } = require('./errors/errorClasses')
const { pageNotFoundErrorMessage, limitErrorMessage } = require('./errors/messages');
const error = require('./middlewares/error');
const { loginValidation, signUpValidation } = require('./middlewares/validation/userValidation')

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(requestLogger)

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { message: limitErrorMessage },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter)
app.post('/signin', loginValidation, login);
app.post('/signup', signUpValidation, createUser);
app.use(auth)
app.use('/users', users);
app.use('/cards', cards);
app.patch('*', (req, res) => {
  throw new NotFoundError(pageNotFoundErrorMessage);
});
app.use('/logout', logout)

mongoose.connect(DB_URL);

app.use(errorLogger)
app.use(errors())
app.use(error)
app.listen(PORT);
