const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
 
async function updateAuthor(courseid){
  const course = await Course.update({_id: courseid}, {
    $set: {
      'author': 'adsfasdfsadfa'
    }
  })
}

//createCourse('Node Course', [new Author({ name: 'Mosh' }),
//new Author({ name: 'sssss' })]);

async function addAuthor(courseid, author){
  const course = await Course.findById(courseid);
  course.authors.push(author);
  course.save();
}

// addAuthor('5b64be5486883869d4c673d8', new Author({
//   name: 'aaaa',
//   bio: 'PHD',
//   website: 'http:\\www.aaaaaaaa.net'
// }));

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId) ;
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
 }

 removeAuthor('5b64be5486883869d4c673d8', '5b64bf830a8c6e69fc63ffc6');

//updateAuthor('5b63b6dd3ef8ed452839ec63');
