/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from '../hooks/useObserver';
import PostService from './../API/PostService';
import PostFilter from './../components/PostFilter';
import PostForm from './../components/PostForm';
import PostsList from './../components/PostsList';
import MyButton from './../components/UI/button/MyButton';
import Loader from './../components/UI/Loader/Loader';
import MyModal from './../components/UI/MyModal/MyModal';
import { useFetching } from './../hooks/useFetching';
import { usePosts } from './../hooks/usePosts';
import './../styles/App.css'
import { getPagesCount } from './../utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef()
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPagesCount(totalCount, limit))
    })

  useObserver(
    lastElement,
    !filter.query.length && page < totalPages,
    isPostLoading,
    () => setPage(page + 1),
    filter.query)
  useEffect(() => {
    fetchPosts(limit, page)
  }, [limit, page]);

  // callback
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <div>
        <MyButton
          style={{ marginTop: '20px',marginRight:'5px'  }}
          onClick={() => setModal(true)}
        >
          New Post
        </MyButton>
        <MyButton
          onClick={() => setLimit(100)}
        >
          Show all Posts
        </MyButton>
        <MyModal
          visible={modal}
          setVisible={setModal}
        >
          <PostForm create={createPost} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      {postError &&
        <h1>Some error ocured - {postError}</h1>
      }
      <div className='PostList'>
        {!postError &&
          < PostsList
            remove={removePost}
            posts={sortedAndSearchedPosts}
            title="Posts list"
          />}
      </div>
      <div
        ref={lastElement}
        style={{ marginTop: '10px', height: '20px', background: '#f3f3f33b' }}>
      </div>
      {isPostLoading &&
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Loader />
        </div>
      }
    </div>
  );
}

export default Posts;