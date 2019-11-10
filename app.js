var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();
const port = 3000
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default:Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);
Blog.create({
    title:"Test Blog",
    image:"https://unsplash.com/photos/B-wYmhZGIsw",
    body:"This is test blog post."
});

//RESTFUL ROUTES

app.listen(port, function(){
    console.log('SERVER IS RUNNING');
})
