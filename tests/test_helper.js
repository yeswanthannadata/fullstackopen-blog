const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Google',
    'author': 'Sundar Pichai',
    'url': 'http://google.com',
    'likes': 3,
    'id': '62d194b343e04eff93123b49'
  },
  {
    'title': 'Meta',
    'author': 'Mark Zuckerburg',
    'url': 'http://meta.com',
    'likes': 8,
    'id': '62d194d243e04eff93123b4b'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }