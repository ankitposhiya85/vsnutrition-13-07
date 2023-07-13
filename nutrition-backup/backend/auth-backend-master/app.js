const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const auth = require("./auth");
const Cart  = require("./db/cartmodle");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        mobile: request.body.mobile,
        name: request.body.name,
        address: request.body.address,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });

        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            name: user.name,
            mobile: user.mobile,
            address: user.address,
            token,
          });

        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// authentication endpoint

app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});


// getting all users data

app.get("/getUserData", async (request, response) => {
  try {
    const allUser = await User.find({   });
    response.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error)
  }
});

// deleting user by id

app.delete("/deleteUser", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.body.id });
    res.send({ status: "deleted", data: deleteUser });
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateUser", async (req, res) => {
  try {
    const updateUser = await User.upadteOne({ _id: req.body.id });
    User.name = req.body.name;
    User.email = req.body.email;
    User.mobile = req.body.mobile;
    User.address = req.body.address;
    res.send({ status: "Updated", data: updateUser });

    User.save().then(emp => {
      res.json('Employee Updated Successfully');
    })
  }
  catch (error) {
    res.status(400).send("Unable To Update User");
  };
});

app.put("/updatePassword", async (req, res) => {
  try {
    const updatePassword = await User.upadteOne({ _id: req.body.id });
    User.password = req.body.password
    res.send({ status: "updated", data: updatePassword});
  } catch (error) {
    
  }  
});

app.post("/addProduct", (req, res) => {
  const cart = new Cart({
    productid: req.body.productid,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quntity,
    userId: req.body.userId,
  });

  // save the new user
  cart
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      res.status(201).send({
        message: "Data saved Successfully",
        result,
      });

    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      res.status(500).send({
        message: "Error saving data",
        error,
      });
    });
})

app.delete("/deleteProduct", async (req, res) => {
  try {
    const deleteProduct = await Cart.deleteOne( {productid: req.body.productid} );
    res.send({ status: "deleted", data: deleteProduct})
  } catch (error) {
    console.log(error);
  }
})


module.exports = app;