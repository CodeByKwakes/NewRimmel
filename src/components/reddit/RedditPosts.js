import React, { PropTypes } from 'react'

const RedditPosts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post.title}</li>
    )}
  </ul>
)

RedditPosts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default RedditPosts
