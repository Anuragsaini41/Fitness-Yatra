import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Menu,
  MenuItem,
  CircularProgress,
  Badge,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import {
  ThumbUp,
  ThumbDown,
  Comment,
  MoreVert,
  Send,
  Sort,
  Search,
  FilterList,
  Bookmark,
  BookmarkBorder,
  ArrowUpward,
  ArrowDownward,
  QuestionAnswer,
  FitnessCenter,
  RestaurantMenu,
  DirectionsRun,
  CheckCircle,
} from '@mui/icons-material';

import { motion } from 'framer-motion';
import { ref, onValue, push, update, remove, set, get, serverTimestamp } from 'firebase/database';
import { database } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import TimeAgo from 'react-timeago';

const Community = () => {
  const theme = useTheme();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [postMenuAnchor, setPostMenuAnchor] = useState(null);
  const [activePostId, setActivePostId] = useState(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedPostForComment, setSelectedPostForComment] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [viewingPostId, setViewingPostId] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [replyingToComment, setReplyingToComment] = useState(null);
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);

  const scrollToTopRef = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const postsRef = ref(database, 'community/posts');

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      let postsArray = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          postsArray.push({
            id: key,
            ...data[key],
            likeCount: data[key].likes ? Object.keys(data[key].likes).length : 0,
            dislikeCount: data[key].dislikes ? Object.keys(data[key].dislikes).length : 0,
            commentCount: data[key].commentCount || 0,
            isLikedByUser: data[key].likes && data[key].likes[currentUser.uid] ? true : false,
            isDislikedByUser:
              data[key].dislikes && data[key].dislikes[currentUser.uid] ? true : false,
            isSavedByUser: data[key].savedBy && data[key].savedBy[currentUser.uid] ? true : false,
          });
        });

        // Apply sorting
        if (sortOrder === 'newest') {
          postsArray.sort((a, b) => b.timestamp - a.timestamp);
        } else if (sortOrder === 'oldest') {
          postsArray.sort((a, b) => a.timestamp - b.timestamp);
        } else if (sortOrder === 'mostLiked') {
          postsArray.sort((a, b) => b.likeCount - a.likeCount);
        } else if (sortOrder === 'mostCommented') {
          postsArray.sort((a, b) => b.commentCount - a.commentCount);
        }
      }

      setPosts(postsArray);
      setLoading(false);
    });
  }, [currentUser, sortOrder]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle creating a new post
  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      showSnackbar('Please provide both title and content for your post', 'error');
      return;
    }

    try {
      const newPost = {
        userId: currentUser.uid,
        username: userProfile?.username || currentUser.displayName || 'Anonymous User',
        userPhotoURL: currentUser.photoURL || '',
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        timestamp: Date.now(),
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0,
      };

      const postRef = push(ref(database, 'community/posts'));
      await set(postRef, newPost);

      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('general');
      setNewPostDialogOpen(false);
      showSnackbar('Post created successfully!', 'success');
    } catch (error) {
      console.error('Error creating post:', error);
      showSnackbar('Failed to create post. Please try again.', 'error');
    }
  };

  // Handle liking a post
  const handleLikePost = async (postId) => {
    if (!currentUser) {
      showSnackbar('Please log in to like posts', 'error');
      return;
    }

    try {
      const post = posts.find((p) => p.id === postId);
      const postRef = ref(database, `community/posts/${postId}`);

      if (post.isLikedByUser) {
        // User already liked, so remove the like
        await update(postRef, {
          [`likes/${currentUser.uid}`]: null,
        });
      } else {
        // Add like and remove dislike if exists
        const updates = {
          [`likes/${currentUser.uid}`]: true,
        };

        if (post.isDislikedByUser) {
          updates[`dislikes/${currentUser.uid}`] = null;
        }

        await update(postRef, updates);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      showSnackbar('Failed to update like. Please try again.', 'error');
    }
  };

  // Handle disliking a post
  const handleDislikePost = async (postId) => {
    if (!currentUser) {
      showSnackbar('Please log in to dislike posts', 'error');
      return;
    }

    try {
      const post = posts.find((p) => p.id === postId);
      const postRef = ref(database, `community/posts/${postId}`);

      if (post.isDislikedByUser) {
        // User already disliked, so remove the dislike
        await update(postRef, {
          [`dislikes/${currentUser.uid}`]: null,
        });
      } else {
        // Add dislike and remove like if exists
        const updates = {
          [`dislikes/${currentUser.uid}`]: true,
        };

        if (post.isLikedByUser) {
          updates[`likes/${currentUser.uid}`] = null;
        }

        await update(postRef, updates);
      }
    } catch (error) {
      console.error('Error disliking post:', error);
      showSnackbar('Failed to update dislike. Please try again.', 'error');
    }
  };

  // Handle saving/bookmarking a post
  const handleSavePost = async (postId) => {
    if (!currentUser) {
      showSnackbar('Please log in to save posts', 'error');
      return;
    }

    try {
      const post = posts.find((p) => p.id === postId);
      const postRef = ref(database, `community/posts/${postId}`);

      if (post.isSavedByUser) {
        // User already saved, so unsave
        await update(postRef, {
          [`savedBy/${currentUser.uid}`]: null,
        });
        showSnackbar('Post removed from saved items', 'success');
      } else {
        // Save the post
        await update(postRef, {
          [`savedBy/${currentUser.uid}`]: true,
        });
        showSnackbar('Post saved successfully', 'success');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      showSnackbar('Failed to save post. Please try again.', 'error');
    }
  };

  // Handle opening comment dialog
  const handleOpenCommentDialog = (postId) => {
    setSelectedPostForComment(postId);
    setCommentDialogOpen(true);
    loadComments(postId);
  };

  // Load comments for a post
  const loadComments = async (postId) => {
    setLoadingComments(true);

    try {
      const commentsRef = ref(database, `community/comments/${postId}`);
      onValue(commentsRef, (snapshot) => {
        const data = snapshot.val();
        let commentsArray = [];

        if (data) {
          Object.keys(data).forEach((key) => {
            commentsArray.push({
              id: key,
              ...data[key],
              likeCount: data[key].likes ? Object.keys(data[key].likes).length : 0,
              isLikedByUser: data[key].likes && data[key].likes[currentUser.uid] ? true : false,
            });
          });

          // Sort comments by timestamp (newest first)
          commentsArray.sort((a, b) => b.timestamp - a.timestamp);
        }

        setPostComments(commentsArray);
        setLoadingComments(false);
      });
    } catch (error) {
      console.error('Error loading comments:', error);
      setLoadingComments(false);
      showSnackbar('Failed to load comments. Please try again.', 'error');
    }
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      showSnackbar('Please enter a comment', 'error');
      return;
    }

    try {
      const commentData = {
        userId: currentUser.uid,
        username: userProfile?.username || currentUser.displayName || 'Anonymous User',
        userPhotoURL: currentUser.photoURL || '',
        content: newComment,
        timestamp: Date.now(),
        replyToId: replyingToComment?.id || null,
        replyToUsername: replyingToComment?.username || null,
      };

      // Add comment to database
      await push(ref(database, `community/comments/${selectedPostForComment}`), commentData);

      // Update comment count on the post
      const postRef = ref(database, `community/posts/${selectedPostForComment}`);
      const postSnapshot = await get(postRef);
      const postData = postSnapshot.val();

      await update(postRef, {
        commentCount: (postData.commentCount || 0) + 1,
      });

      setNewComment('');
      setReplyingToComment(null);
      showSnackbar('Comment added successfully', 'success');
    } catch (error) {
      console.error('Error adding comment:', error);
      showSnackbar('Failed to add comment. Please try again.', 'error');
    }
  };

  // Handle liking a comment
  const handleLikeComment = async (commentId) => {
    if (!currentUser) {
      showSnackbar('Please log in to like comments', 'error');
      return;
    }

    try {
      const comment = postComments.find((c) => c.id === commentId);
      const commentRef = ref(database, `community/comments/${selectedPostForComment}/${commentId}`);

      if (comment.isLikedByUser) {
        // User already liked, so remove the like
        await update(commentRef, {
          [`likes/${currentUser.uid}`]: null,
        });
      } else {
        // Add like
        await update(commentRef, {
          [`likes/${currentUser.uid}`]: true,
        });
      }
    } catch (error) {
      console.error('Error liking comment:', error);
      showSnackbar('Failed to update like. Please try again.', 'error');
    }
  };

  // Handle replying to a comment
  const handleReplyToComment = (comment) => {
    setReplyingToComment(comment);
    setNewComment(`@${comment.username} `);
  };

  // Delete a post (if user is the owner)
  const handleDeletePost = async (postId) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (post.userId !== currentUser.uid) {
        showSnackbar('You can only delete your own posts', 'error');
        return;
      }

      // Delete comments first
      await remove(ref(database, `community/comments/${postId}`));

      // Delete the post
      await remove(ref(database, `community/posts/${postId}`));

      showSnackbar('Post deleted successfully', 'success');
      handleClosePostMenu();
    } catch (error) {
      console.error('Error deleting post:', error);
      showSnackbar('Failed to delete post. Please try again.', 'error');
    }
  };

  // Utility function to show snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Menu handlers
  const handleOpenCategoryMenu = (event) => {
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setCategoryMenuAnchor(null);
  };

  const handleOpenSortMenu = (event) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setSortMenuAnchor(null);
  };

  const handleOpenPostMenu = (event, postId) => {
    setPostMenuAnchor(event.currentTarget);
    setActivePostId(postId);
  };

  const handleClosePostMenu = () => {
    setPostMenuAnchor(null);
    setActivePostId(null);
  };

  // Filter posts based on search query and filter category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;

    // For "My Posts" tab, filter by current user's posts
    if (tabValue === 1 && post.userId !== currentUser?.uid) {
      return false;
    }

    // For "Saved Posts" tab, filter by posts saved by current user
    if (tabValue === 2 && !post.isSavedByUser) {
      return false;
    }

    return matchesSearch && matchesCategory;
  });

  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'workout':
        return <FitnessCenter fontSize="small" />;
      case 'nutrition':
        return <RestaurantMenu fontSize="small" />;
      case 'cardio':
        return <DirectionsRun fontSize="small" />;
      case 'question':
        return <QuestionAnswer fontSize="small" />;
      default:
        return <CheckCircle fontSize="small" />;
    }
  };

  // Function to get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'workout':
        return 'primary';
      case 'nutrition':
        return 'success';
      case 'cardio':
        return 'secondary';
      case 'question':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    scrollToTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        ref={scrollToTopRef}
        sx={{
          mt: { lg: '96px', xs: '60px' },
          p: { lg: 5, xs: 2 },
          background:
            'linear-gradient(135deg, rgba(250,250,252,0.9) 0%, rgba(245,247,250,0.9) 100%)',
          borderRadius: 4,
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)',
          minHeight: '80vh',
        }}
      >
        <Typography
          variant="h3"
          mb={2}
          fontWeight="800"
          textAlign="center"
          sx={{
            background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          Fitness Community
        </Typography>

        <Typography
          variant="h6"
          mb={4}
          textAlign="center"
          color="text.secondary"
          fontWeight="400"
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Share your fitness experiences, ask questions, and connect with others on their fitness
          journey
        </Typography>

        {!currentUser ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 4,
              maxWidth: 600,
              mx: 'auto',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h5" mb={3}>
              Please login to join our fitness community
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/login"
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                boxShadow: '0 10px 20px -10px rgba(229, 57, 53, 0.5)',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  boxShadow: '0 15px 25px -10px rgba(229, 57, 53, 0.6)',
                  background: 'linear-gradient(90deg, #d32f2f 0%, #f44336 100%)',
                },
              }}
            >
              Login to Participate
            </Button>
          </Paper>
        ) : (
          <Container maxWidth="lg">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
              }}
            >
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    mb: { xs: 2, md: 0 },
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'primary.main',
                      height: 3,
                      borderRadius: '3px 3px 0 0',
                    },
                    '& .Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 600,
                    },
                  }}
                >
                  <Tab label="All Posts" />
                  <Tab label="My Posts" />
                  <Tab label="Saved Posts" />
                </Tabs>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={<FilterList />}
                    onClick={handleOpenCategoryMenu}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    {filterCategory === 'all'
                      ? 'All Categories'
                      : `${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}`}
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<Sort />}
                    onClick={handleOpenSortMenu}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    {sortOrder === 'newest'
                      ? 'Newest'
                      : sortOrder === 'oldest'
                        ? 'Oldest'
                        : sortOrder === 'mostLiked'
                          ? 'Most Liked'
                          : 'Most Commented'}
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<QuestionAnswer />}
                    color="primary"
                    onClick={() => setNewPostDialogOpen(true)}
                    sx={{
                      ml: { xs: 0, sm: 2 },
                      borderRadius: 2,
                      background: 'linear-gradient(90deg, #e53935 0%, #ff5252 100%)',
                      boxShadow: '0 4px 15px -7px rgba(229, 57, 53, 0.5)',
                      '&:hover': {
                        boxShadow: '0 6px 20px -7px rgba(229, 57, 53, 0.6)',
                        background: 'linear-gradient(90deg, #d32f2f 0%, #f44336 100%)',
                      },
                    }}
                  >
                    New Post
                  </Button>
                </Box>

                <Menu
                  anchorEl={categoryMenuAnchor}
                  open={Boolean(categoryMenuAnchor)}
                  onClose={handleCloseCategoryMenu}
                >
                  <MenuItem
                    onClick={() => {
                      setFilterCategory('all');
                      handleCloseCategoryMenu();
                    }}
                  >
                    All Categories
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilterCategory('general');
                      handleCloseCategoryMenu();
                    }}
                  >
                    General
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilterCategory('workout');
                      handleCloseCategoryMenu();
                    }}
                  >
                    Workout
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilterCategory('nutrition');
                      handleCloseCategoryMenu();
                    }}
                  >
                    Nutrition
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilterCategory('cardio');
                      handleCloseCategoryMenu();
                    }}
                  >
                    Cardio
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilterCategory('question');
                      handleCloseCategoryMenu();
                    }}
                  >
                    Questions
                  </MenuItem>
                </Menu>

                <Menu
                  anchorEl={sortMenuAnchor}
                  open={Boolean(sortMenuAnchor)}
                  onClose={handleCloseSortMenu}
                >
                  <MenuItem
                    onClick={() => {
                      setSortOrder('newest');
                      handleCloseSortMenu();
                    }}
                  >
                    Newest First
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortOrder('oldest');
                      handleCloseSortMenu();
                    }}
                  >
                    Oldest First
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortOrder('mostLiked');
                      handleCloseSortMenu();
                    }}
                  >
                    Most Liked
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortOrder('mostCommented');
                      handleCloseSortMenu();
                    }}
                  >
                    Most Commented
                  </MenuItem>
                </Menu>
              </Box>

              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3 },
                  }}
                />
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                  <CircularProgress />
                </Box>
              ) : filteredPosts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No posts found
                  </Typography>
                  <Typography color="text.secondary">
                    {tabValue === 0
                      ? 'Be the first to create a post in this community!'
                      : tabValue === 1
                        ? "You haven't created any posts yet."
                        : "You haven't saved any posts yet."}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setNewPostDialogOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    Create Your First Post
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {filteredPosts.map((post) => (
                    <Grid item xs={12} key={post.id}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                src={post.userPhotoURL}
                                alt={post.username}
                                sx={{ width: 40, height: 40, mr: 2 }}
                              >
                                {post.username?.charAt(0).toUpperCase() || 'A'}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="600">
                                  {post.username}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  <TimeAgo date={post.timestamp} />
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Chip
                                icon={getCategoryIcon(post.category)}
                                label={
                                  post.category.charAt(0).toUpperCase() + post.category.slice(1)
                                }
                                color={getCategoryColor(post.category)}
                                size="small"
                                variant="outlined"
                              />
                              {post.userId === currentUser?.uid && (
                                <IconButton
                                  size="small"
                                  sx={{ ml: 1 }}
                                  onClick={(e) => handleOpenPostMenu(e, post.id)}
                                >
                                  <MoreVert />
                                </IconButton>
                              )}
                            </Box>
                          </Box>

                          <Typography variant="h6" gutterBottom>
                            {post.title}
                          </Typography>

                          <Typography variant="body1" paragraph>
                            {post.content.length > 300
                              ? `${post.content.substring(0, 300)}...`
                              : post.content}
                          </Typography>

                          {post.content.length > 300 && (
                            <Button
                              size="small"
                              sx={{ mb: 2, textTransform: 'none' }}
                              onClick={() => handleOpenCommentDialog(post.id)}
                            >
                              Read More
                            </Button>
                          )}

                          <Divider sx={{ my: 2 }} />

                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                size="small"
                                color={post.isLikedByUser ? 'primary' : 'default'}
                                onClick={() => handleLikePost(post.id)}
                              >
                                <ThumbUp fontSize="small" />
                              </IconButton>
                              <Typography variant="body2" sx={{ mx: 0.5 }}>
                                {post.likeCount}
                              </Typography>

                              <IconButton
                                size="small"
                                color={post.isDislikedByUser ? 'error' : 'default'}
                                onClick={() => handleDislikePost(post.id)}
                                sx={{ ml: 1 }}
                              >
                                <ThumbDown fontSize="small" />
                              </IconButton>
                              <Typography variant="body2" sx={{ mx: 0.5 }}>
                                {post.dislikeCount}
                              </Typography>

                              <Button
                                startIcon={<Comment fontSize="small" />}
                                size="small"
                                sx={{ ml: 2, textTransform: 'none' }}
                                onClick={() => handleOpenCommentDialog(post.id)}
                              >
                                {post.commentCount}{' '}
                                {post.commentCount === 1 ? 'comment' : 'comments'}
                              </Button>
                            </Box>

                            <IconButton
                              color={post.isSavedByUser ? 'primary' : 'default'}
                              onClick={() => handleSavePost(post.id)}
                            >
                              {post.isSavedByUser ? <Bookmark /> : <BookmarkBorder />}
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>

            {/* Floating button to scroll back to top */}
            {filteredPosts.length > 5 && (
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 20,
                  right: 20,
                  zIndex: 10,
                }}
              >
                <IconButton
                  color="primary"
                  size="large"
                  onClick={scrollToTop}
                  sx={{
                    bgcolor: 'background.paper',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                    '&:hover': { bgcolor: 'background.paper', transform: 'scale(1.1)' },
                  }}
                >
                  <ArrowUpward />
                </IconButton>
              </Box>
            )}

            {/* Post Menu */}
            <Menu
              anchorEl={postMenuAnchor}
              open={Boolean(postMenuAnchor)}
              onClose={handleClosePostMenu}
            >
              <MenuItem
                onClick={() => {
                  handleDeletePost(activePostId);
                }}
              >
                Delete Post
              </MenuItem>
            </Menu>

            {/* Comment Dialog */}
            <Dialog
              open={commentDialogOpen}
              onClose={() => setCommentDialogOpen(false)}
              fullWidth
              maxWidth="md"
            >
              {selectedPostForComment && (
                <>
                  <DialogTitle>
                    <Typography variant="h6" component="div">
                      {posts.find((p) => p.id === selectedPostForComment)?.title ||
                        'Post Discussion'}
                    </Typography>
                  </DialogTitle>
                  <DialogContent dividers>
                    {/* Full post content */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={posts.find((p) => p.id === selectedPostForComment)?.userPhotoURL}
                          alt={posts.find((p) => p.id === selectedPostForComment)?.username}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        >
                          {posts
                            .find((p) => p.id === selectedPostForComment)
                            ?.username?.charAt(0)
                            .toUpperCase() || 'A'}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="600">
                            {posts.find((p) => p.id === selectedPostForComment)?.username}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            <TimeAgo
                              date={posts.find((p) => p.id === selectedPostForComment)?.timestamp}
                            />
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body1" paragraph>
                        {posts.find((p) => p.id === selectedPostForComment)?.content}
                      </Typography>

                      <Divider sx={{ my: 2 }} />
                    </Box>

                    {/* Comments section */}
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                      Comments (
                      {posts.find((p) => p.id === selectedPostForComment)?.commentCount || 0})
                    </Typography>

                    {loadingComments ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        {/* Comment form */}
                        <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
                          <Avatar
                            src={currentUser?.photoURL}
                            alt={currentUser?.displayName}
                            sx={{ width: 40, height: 40, mr: 2 }}
                          >
                            {currentUser?.displayName?.charAt(0).toUpperCase() || 'A'}
                          </Avatar>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            variant="outlined"
                            size="small"
                          />
                          <IconButton
                            color="primary"
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            sx={{ ml: 1 }}
                          >
                            <Send />
                          </IconButton>
                        </Box>

                        {/* Show if replying to someone */}
                        {replyingToComment && (
                          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Replying to <b>{replyingToComment.username}</b>
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => {
                                setReplyingToComment(null);
                                setNewComment('');
                              }}
                              sx={{ ml: 1, textTransform: 'none' }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        )}

                        {/* Comments list */}
                        <List>
                          {postComments.length === 0 ? (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              align="center"
                              sx={{ py: 4 }}
                            >
                              No comments yet. Be the first to comment!
                            </Typography>
                          ) : (
                            postComments.map((comment) => (
                              <ListItem
                                key={comment.id}
                                alignItems="flex-start"
                                sx={{
                                  pl: comment.replyToId ? 6 : 2,
                                  borderLeft: comment.replyToId
                                    ? `2px solid ${theme.palette.divider}`
                                    : 'none',
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar src={comment.userPhotoURL} alt={comment.username}>
                                    {comment.username?.charAt(0).toUpperCase() || 'A'}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                      <Typography component="span" variant="subtitle2">
                                        {comment.username}
                                        {comment.replyToUsername && (
                                          <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            {' '}
                                            replied to <b>{comment.replyToUsername}</b>
                                          </Typography>
                                        )}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        <TimeAgo date={comment.timestamp} />
                                      </Typography>
                                    </Box>
                                  }
                                  secondary={
                                    <>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        sx={{ display: 'inline', whiteSpace: 'pre-wrap' }}
                                      >
                                        {comment.content}
                                      </Typography>
                                      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                          size="small"
                                          color={comment.isLikedByUser ? 'primary' : 'default'}
                                          onClick={() => handleLikeComment(comment.id)}
                                        >
                                          <ThumbUp fontSize="small" />
                                        </IconButton>
                                        <Typography variant="caption" sx={{ mx: 0.5 }}>
                                          {comment.likeCount}
                                        </Typography>

                                        <Button
                                          size="small"
                                          onClick={() => handleReplyToComment(comment)}
                                          sx={{ ml: 2, textTransform: 'none' }}
                                        >
                                          Reply
                                        </Button>
                                      </Box>
                                    </>
                                  }
                                />
                              </ListItem>
                            ))
                          )}
                        </List>
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setCommentDialogOpen(false)}>Close</Button>
                  </DialogActions>
                </>
              )}
            </Dialog>

            {/* New Post Dialog */}
            <Dialog
              open={newPostDialogOpen}
              onClose={() => setNewPostDialogOpen(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>Create a New Post</DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={newPostCategory}
                        label="Category"
                        onChange={(e) => setNewPostCategory(e.target.value)}
                      >
                        <MenuItem value="general">General</MenuItem>
                        <MenuItem value="workout">Workout</MenuItem>
                        <MenuItem value="nutrition">Nutrition</MenuItem>
                        <MenuItem value="cardio">Cardio</MenuItem>
                        <MenuItem value="question">Question</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      inputProps={{ maxLength: 100 }}
                      helperText={`${newPostTitle.length}/100 characters`}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Content"
                      multiline
                      rows={6}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setNewPostDialogOpen(false)}>Cancel</Button>
                <Button
                  variant="contained"
                  onClick={handleCreatePost}
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                >
                  Post
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Community;
