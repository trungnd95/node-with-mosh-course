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
  authors: [authorSchema]
}));

const createCourse = async function(name, authors){
  const course = new Course({name, authors});
  const result = await course.save();
  console.log(result);
}

const addAuthor = async function(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  const result = await course.save();
  console.log(result);
}

const deleteAuthor = async function(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  await author.remove();
  await course.save();
}

// createCourse("Nextjs", [
//   new Author({name: "A", bio: "Bio", website: "Websites"}),
//   new Author({name: "B", bio: "Bio", website: "Websites"}),
// ]);

// addAuthor("638efa6c0f6d33d7c6948265", new Author({
//   name: "added author",
//   bio: "Bio",
//   website: "xxx"
// }))

deleteAuthor("638efa6c0f6d33d7c6948265", "638efb7852ba0cc62aa36602");


