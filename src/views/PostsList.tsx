import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';
import AddPostModal from './AddPostModal.tsx';
import EditPostModal from './EditPostModal.tsx';
import DeleteConfirmationModal from './DeleteConfirmationModal.tsx';
import '../PostsList.css';

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  // Load posts from localStorage and fetch the data from API
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
      setLoading(false);
    } else {
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          if (!response.ok) throw new Error(`Error: ${response.status}`);
          const data: Post[] = await response.json();
          localStorage.setItem('posts', JSON.stringify(data));
          setPosts(data);
          setLoading(false);
        } catch (error) {
          notification.error({
            message: 'Failed to fetch posts',
            description: 'There was an error fetching posts from the API.',
          });
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, []);

  const handleAddPost = (values: { title: string; body: string }) => {
    const newPost = { id: Date.now(), ...values };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    notification.success({ message: 'Post Created', description: 'The post has been created successfully.' });
    setIsAddModalVisible(false);
  };

  const handleEditPost = (values: { title: string; body: string }) => {
    if (editingPost) {
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id ? { ...post, ...values } : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      notification.success({ message: 'Post Updated', description: 'The post has been updated successfully.' });
      setIsEditModalVisible(false);
      setEditingPost(null);
    }
  };

  const handleDelete = () => {
    if (postToDelete !== null) {
      const updatedPosts = posts.filter((post) => post.id !== postToDelete);
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      notification.success({ message: 'Post Deleted', description: 'The post has been deleted successfully.' });
      setIsDeleteModalVisible(false);
      setPostToDelete(null);
    }
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setIsEditModalVisible(true);
  };

  const openDeleteModal = (postId: number) => {
    setPostToDelete(postId);
    setIsDeleteModalVisible(true);
  };


  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Body', dataIndex: 'body', key: 'body' },
    {
      title: (
        <div className="actions-column">
          Actions
        </div>
      ),
      key: 'actions',
      render: (_: string, record: Post) => (
        <>
          <div className="btns">
            <Button
              className="edit-btn"
              type="link"
              onClick={() => openEditModal(record)}
            >
              Edit
            </Button>
            <Button
              className="delete-btn"
              type="link"
              danger
              onClick={() => openDeleteModal(record.id)} 
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="header-actions">
        <h1 className="allposts">All Posts</h1>
        <Button
          type="primary"
          className="add-btn"
          onClick={() => setIsAddModalVisible(true)}
        >
          + Add Post
        </Button>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <Table dataSource={posts} columns={columns} rowKey="id" />
      )}

      <AddPostModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} onSubmit={handleAddPost} />

      {editingPost && (
        <EditPostModal
          visible={isEditModalVisible}
          onCancel={() => {
            setIsEditModalVisible(false);
            setEditingPost(null);
          }}
          onSubmit={handleEditPost}
          initialValues={editingPost}
        />
      )}

      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default PostsList;
