var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require('path');

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.listen(3000);



// body parser : passmongo: TR9g5mOsgFapqzVJ

// parse application/x-www-form-urlencoded
//phân tích cú pháp ứng dụng / x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); 
app.use('./public/upload', express.static('upload'));
app.use(express.static('./public/upload'))

// Cho phép truy cập từ cổng khác (port 4200)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// end 


// mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sangnt99:TR9g5mOsgFapqzVJ@cluster0.u4h7jio.mongodb.net/BookStore?retryWrites=true&w=majority",
  function (err) {
    if (err) {
      console.log("Loi roi cha noi oi! .-.");
    } else {
      console.log("database connected!!!");
    }
  }
);

const category = require("./modules/category");
const book = require("./modules/book");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/cate", function (req, res) {
  res.render("cate");
});

app.post("/cate", function (req, res) {
  var newCate = new category({
    name: req.body.txtCate,
    Book_id: [],
  });
  newCate.save(function (err) {
    if (err) {
      console.log("Lai loi roi cha oi!!");
      res.json({ result: 0 });
    } else {
      console.log("successfull!");
      res.json({ result: 1 });
    }
  });
});

// app.get("/img", function (req,res) {
//   res.send(`<img src="./public/upload/1654066421812-sach1.jpg" alt="">`)
// })

//multer (upload file) 
var multer = require("multer");
const Book = require("./modules/book");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Only image are allowed!"));
    }
  },
}).single("BookImage"); //tên ảnh sách (thẻ input)
// end of configing libralies


// Viết api cho FE
app.post("/api/cate", function(req,res) {
  category.find(function (err,items) {
    if (err) {
      res.json({kq:0, "err:":err});
    }else{
      res.json(items);
    }
  })
});

app.post("/api/book", function(req,res) {
  book.find(function (err,items) {
    if (err) {
      res.json({kq:0, "err:":err});
    }else{
      res.json(items);
    }
  });
});

app.get("/api/book/image", function(req,res) {
  book.find(function (err,items) {
    if (err) {
      res.json({kq:0, "err:":err});
    }else{
      res.json(items.image);
    }
  });
});



// end api

app.get("/book", function (req, res) {
  // tìm mọi item trong bảng category và truyền vào biến mới. Gọi biến này ở add book page
  category.find(function (err, items) {
    if (err) {
      res.send("404! not found!");
    } else {
      console.log(items);
      res.render("book", { Cates: items });
    }
  });
});

app.post("/book", function (req, res) {
  // upload image of book
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading.");
      res.json({ result: 0, "err:": err });
    } else if (err) {
      console.log("An unknown error occurred when uploading." + err);
      res.json({ result: 0, "err:": err });
    } else {
      console.log("Upload is okay");
      console.log(req.file); // Thông tin file đã upload
      // res.send({"result":1, "file:": req.file});
    }

    // save book
    var book = new Book({
      name: req.body.txtName,
      image: req.file.filename,
      file: req.body.txtFile,
    });
    book.save(function (err) {
      if (err) {
        res.json({
          kq: 1,
          err: "Error!! Save book fail",
        });
      } else {
        // update Books_id

        //có 3 thông số: 1: là tìm cái gì, 2: tìm được rồi thì làm cái gì, 3: 1 hành động để kiểm tra

        category.findOneAndUpdate(
          //hàm tìm kiếm và update
          { _id: req.body.selectCate }, // lấy id từ category
          { $push: { Books_id: book._id } }, // đẩy id vừa lấy vào chuỗi Books_id
          function (err) {
            //kiểm tra lỗi nếu có
            if (err) {
              res.json({ kq: 0, err: "save book fail!" });
            } else {
              res.json({ kq: 1, "book id": book._id });
            }
          }
        );
      }
    });
  });
});
