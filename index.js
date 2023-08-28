console.log("hello")

const { render } = require("ejs")
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require('dotenv').config()

const User = require("./models/userSchema")
const Product = require("./models/product-schema")
const Order = require("./models/orderSchema")
const { read } = require("fs")

const user = new User
const dburi = process.env.SOURCE;

mongoose.connect(dburi)
    .then(() => {
        console.log("db connected")
        app.listen(8080, () => {
            console.log("Backend")
        })
    })
    .catch((err) => {
        console.log(err)
    })

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs")
app.set('views', path.join(__dirname, "./views"))

app.get("/", (req, res) => {
    console.log("Success")
    res.sendFile("./views/homepage.html", { root: __dirname })
})

app.get("/Product", (req, res) => {
    console.log("Success")
    res.sendFile("./views/product.html", { root: __dirname })
})

app.get("/login", (req, res) => {
    console.log("Success")
    res.sendFile("./views/login.html", { root: __dirname })
})

app.get("/signup", (req, res) => {
    console.log("Success")
    res.sendFile("./views/signup.html", { root: __dirname })
})

app.post("/signup", async(req, res) => {

    try {
        console.log(req.body.username);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        await newUser.save()
            .then((result) => {
                res.status(201).render("userhome", { checkUser: newUser })
            }).catch((err) => {
                console.log(err)
            })

    } catch (error) {
        res.status(400).send(error)
    }
})

app.post("/login", async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        console.log(`${username} and ${password}`)

        const checkUser = await User.findOne({ username: username })
        if (checkUser.password === password) {
            console.log("Login Successfull")
            res.status(201).render("userhome", { checkUser })
        } else {
            res.send("Incorrect password")
        }
    } catch (error) {
        res.status(400).send("Invalid username")
    }

})

app.get("/logout", async(req, res) => {
    try {
        res.clearCookie('nToken');
        const result = await Product.deleteMany();
        console.log("logged out")
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.get("/userHome", (req, res) => {
    console.log(user)
    res.render("userHome", { user })
})

app.get("/userProduct", (req, res) => {
    res.render("userProduct", { user })
})

app.get("/home", (req, res) => {
    res.sendFile("./views/homepage.html", { root: __dirname })
})

app.get("/contact", (req, res) => {
    res.sendFile("./views/contact.html", { root: __dirname })
})

app.get("/add-to-cart-one", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Roadster Womens Jeans",
            description: "A very comfortable Jeans for Women",
            price: "800",
            image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2322596/2019/8/16/6623cfcb-a038-4615-94f5-d0042d091d051565934010168-Roadster-Women-Blue-Skinny-Fit-Mid-Rise-Highly-Distressed-St-1.jpg"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-two", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Roadster Mens Jeans",
            description: "A very comfortable Jeans for Men",
            price: "700",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIbT9Y82ql0jk0PnAm9h0es3CRvSrKXo80Xw&usqp=CAU"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-three", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Nike Shoes for Men",
            description: "Stylish and comfortable Shoes for Men",
            price: "1000",
            image: "https://navbharattimes.indiatimes.com/apna-bazaar/fashion/footwear/grab-discount-up-to-48-percent-on-best-nike-running-shoes-for-men/thumb/msid-94832174,imgsize-47148,width-1200,height-900,resizemode-75/nike-running-shoes-on-amazon-94832174.jpg"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-four", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Nike Womens Shoes",
            description: "Stylish and comfortable Shoes for Women",
            price: "1100",
            image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e8e530a3-2317-4783-819b-40860281daaf/streakfly-road-racing-shoes-V17qZm.png"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-five", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Ethnic Wear for Women ",
            description: "Green colour elegant ethnic wear for Women",
            price: "2500",
            image: "data:image/jpeg;base64,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"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-six", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Ethnic Wear for Men",
            description: "A stylish Ethnic wear for Men",
            price: "2000",
            image: "https://assets.panashindia.com/media/catalog/product/cache/4/small_image/262x377/9df78eab33525d08d6e5fb8d27136e95/7/9/790mw05-ks1227.jpg"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-seven", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Short Dress for Women",
            description: "Party wear A-line dress<br>for women",
            price: "1100",
            image: "https://img101.urbanic.com/goods-pic/a0bd08fdabd84216915ece5ff3a60afc_w1000_q90"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-eight", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Shirt for Men",
            description: "A stylish Checked Shirt for Men",
            price: "799",
            image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/10341699/2022/8/25/c23fd879-a9b3-4515-a181-558523a71b9b1661423122029-LOCOMOTIVE-Men-Black--Grey-Slim-Fit-Checked-Casual-Shirt-342-1.jpg"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-nine", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Half-sleeve Shirt for Men",
            description: "A stylish Half sleeved comfy Shirt for Men",
            price: "799",
            image: "https://cdn.shopify.com/s/files/1/0752/6435/products/IMG_0043_4d81c6fa-5783-4baa-81f2-43b183e05466.jpg?v=1674813294"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-ten", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Gown for Women",
            description: "An elegant sparkled Gown<br>for Women",
            price: "1799",
            image: "https://img.joomcdn.net/3772d1480a24180eea8e5a0ddad6352ba1aedd90_original.jpeg"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-eleven", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Hoodie for Men",
            description: "A Cotton Hooded Hoodie<br>for Men",
            price: "899",
            image: "https://m.media-amazon.com/images/I/61+-QxjrlhL._UX569_.jpg"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/add-to-cart-twelve", async(req, res) => {
    try {
        console.log("new prod")
        const newProduct = new Product({
            name: "Boat Headphones",
            description: "Boat Black Wireless Headphones",
            price: "1500",
            image: "https://images-eu.ssl-images-amazon.com/images/I/513PuLtilUL._AC_UL600_SR600,400_.jpg"
        })
        console.log(newProduct.name)
        await newProduct.save()
            .then((result) => {
                try {
                    Product.find({}, function(err, products) {
                        console.log("product", products);
                        res.render("cart", { productlist: products })
                    })
                } catch (error) {
                    res.send(error)
                }
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/cart", (req, res) => {
    try {
        Product.find({}, function(err, products) {
            res.render("cart", { productlist: products })
        })
    } catch (error) {
        res.send(error)
    }
})

app.delete("/cart/:id", async(req, res) => {
    try {
        const id = req.params.id;
        Product.findByIdAndDelete(id)
            .then(result => {
                res.json({ redirect: "/cart" });
            })
    } catch (err) {
        console.log(err);
    }
});

app.get("/order", (req, res) => {
    res.sendFile("./views/Orderdetails.html", { root: __dirname })
})

app.post("/orderdetails", async(req, res) => {

    try {
        console.log(req.body.firstname);
        console.log(Product);
        const total = 0;
        const newOrder = new Order({
            firstname: req.body.firstname,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pinCode: req.body.pincode,
            phone: req.body.phone

        })

        console.log("save")
        await newOrder.save()
            .then((result) => {
                Product.find({}, function(err, products) {
                    res.render("confirmed", {
                        newOrder,
                        productlist: products
                    })
                })
            }).catch((err) => {
                console.log(err)
            })

    } catch (error) {
        res.status(400).send(error)
    }
})