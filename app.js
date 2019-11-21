var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

const port = 3000
const Schema = mongoose.Schema;

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    _id: {type: Schema.Types.ObjectId },
    title: String,
    image: String,
    body: String,
    created: {type: Date, default:Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get('/blogs', function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('ERROR!');
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req,res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
    //redirect to index
});

//Show route
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render('show', {blog: foundBlog});
        }
    });
});

//Edit 
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit",{blog:foundBlog});
        }
    });
});

//Update route
app.put("/blogs/:id", function(req,res){
    //res.send("UPDATE ROUTE");
    console.log("put request");
    console.log(req.params);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        console.log(err);
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

// DELETE Route
app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(port, function(){
    console.log('SERVER IS RUNNING');
})
