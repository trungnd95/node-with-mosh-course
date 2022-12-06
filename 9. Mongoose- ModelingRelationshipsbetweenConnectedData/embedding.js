const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/connected_data')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting"));

const authorSchema = new mongoose.Schema({
  name: String, 
  bio: String, 
  website: String,
})
const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, 
  author: authorSchema
}));

const createAuthor = async function(name, bio, website) {
  const author = new Author({name, bio, website});
  await author.save();
  return author;
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

const updateAuthor = async function(courseId, authorName) {
  // 1. 
  // const course = await Course.findById(courseId);
  // course.author.name = authorName;
  // await course.save();

  // 2. 
  await Course.updateOne({_id: courseId}, {
    $set: {
      author: {
        name: authorName
      }
    }
  });
}

//createAuthor("Cris", "Bio", "criscv.com");
createCourse("Reactjs", new Author({name: "Cris", bio: "Bio", website: "Wes Site"}));

// updateAuthor("638ef408d548d62b79aa8e4f", "New author`");
