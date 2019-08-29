const express = require("express");
const     mongoose = require("mongoose");
const     bodyParser = require("body-parser");
const    passport = require("passport");
const   users = require("./routes/api/users");
const   dorm = require("./routes/api/dorm")
const  facilities = require('./routes/api/facilities')
const    app = express();
const    path = require('path');
const    multer = require('multer')
const    fs = require('fs-extra')




// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  })
);
app.use('/api/public/', express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')));

//mongoose.Promise = global.Promise

// DB Config
const dbCon = require("./config/keys")


mongoose
  .connect(
    dbCon.url
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



// Passport middleware
//app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api", users);
app.use("/api", facilities);
app.use("/api", dorm );

// Send message for default URL
app.get('/', (req, res) => res.send('Success Bgst !'));



const port =  80;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
