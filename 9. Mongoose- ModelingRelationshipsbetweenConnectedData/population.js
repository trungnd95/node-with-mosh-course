const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/connected_data')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting"));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String, 
  bio: String, 
  website: String,
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, 
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

const createAuthor = async function(name, bio, website) {
  const author = new Author({name, bio, website});
  const result = await author.save();
  console.log(result);
}

const createCourse = async function(name, author){
  const course = new Course({name, author});
    const result = await course.save();
    console.log(result);
}

const listCourses = async function() {
  const courses = await Course.find().populate("author", "-_id").select();
  console.log(courses);
}

//createAuthor("Cris", "Bio", "criscv.com");
// createCourse("Nodejs", "638ecc3e7f5da37ae2b5879d");

listCourses();