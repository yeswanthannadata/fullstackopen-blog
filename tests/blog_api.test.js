const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

test('blogs count should be matched', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('id key is defined inside the object', async () => {
  const blogs = await helper.blogsInDb()
  blogs.forEach(blog => expect(blog.id).toBeDefined())
}, 100000)

test('new blog creates and count increments', async () => {
  const blog = {
    title: 'Express JS',
    author: 'Yeswanth Annadata',
    url: 'ayeswanth.com',
    likes: 100
  }

  await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain('Express JS')
}, 100000)

test('no likes param, defaults to 0', async () => {
  const blog = {
    title: 'Express JS',
    author: 'Yeswanth Annadata',
    url: 'ayeswanth.com',
  }
  const response = await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
  expect(response.body.likes).toBe(0)
}, 100000)

test('title and url are mandatory', async () => {
  const blog = {
    author: 'Yeswanth Annadata',
    likes: 120
  }
  await api.post('/api/blogs').send(blog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
}, 100000)

test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).not.toContain(blogToDelete.title)
}, 100000)

test('update likes of a blog', async () => {
  const blogsInDb = await helper.blogsInDb()
  const blogToUpdate = blogsInDb[0]
  const blog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes+1
  }
  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog)

  expect(response.body.likes).toBe(blogToUpdate.likes+1)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})