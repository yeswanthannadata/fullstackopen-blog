const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  let body = request.body
  if (!('likes' in body)) {
    body.likes = 0
  }
  if (('title' in body) && ('url' in body)) {
    const blog = new Blog(body)
    const result = await blog.save()
    return response.status(201).json(result)
  } else {
    return response.status(400).end()
  }
})

module.exports = blogRouter