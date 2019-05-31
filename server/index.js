const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passportService');

mongoose.connect(keys.MONGODB_URI, {
	useNewUrlParser: true
}).then(() => console.log('Connected to MongoDB ...'))
.catch(err => console.error('Could not connect to MongoDB:‌', err));

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY] 
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5008;
app.listen(PORT);