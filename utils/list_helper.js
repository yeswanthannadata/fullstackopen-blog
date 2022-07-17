const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const greaterCheck = (prevItem, item) => prevItem.likes > item.likes ? prevItem : item
  const favouriteItem = blogs.reduce(greaterCheck)
  const { title, author, likes } = favouriteItem
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authorCount = (acc, item) => {
    const index = acc.findIndex(each => each.author === item.author)
    index > -1 ? acc[index].blogs = acc[index].blogs + 1 : acc.push({ author: item.author, blogs: 1 })
    return acc
  }
  const result = blogs.reduce(authorCount, [])
  return result.reduce((prevItem, item) => prevItem.blogs > item.blogs ? prevItem : item)
}

const mostLikes = (blogs) => {
  const authorLikes = (acc, item) => {
    const index = acc.findIndex(each => each.author === item.author)
    index > -1 ? acc[index].likes = acc[index].likes + item.likes : acc.push({ author: item.author, likes: item.likes })
    return acc
  }
  const result = blogs.reduce(authorLikes, [])
  return result.reduce((prevItem, item) => prevItem.likes > item.likes ? prevItem : item)
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }