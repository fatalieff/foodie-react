import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import CreatePostForm from '../components/CreatePostForm';

export const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          created_at,
          likes_count,
          comments_count,
          user_id,
          username,
          category
        `)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        throw fetchError;
      }

      console.log('Fetched posts data:', data);
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*');

      if (fetchError) {
        console.error('Error fetching users:', fetchError);
        return;
      }
      
      // Exclude current user if available
      const filteredUsers = currentUser 
        ? data.filter(user => user.id !== currentUser.id) 
        : data;
        
      setUsers(filteredUsers || []);
    } catch (err) {
      console.error('Error in fetchUsers:', err);
    }
  }, [currentUser]);

  const fetchFollowing = useCallback(async () => {
    try {
      if (!currentUser) return;
      const { data, error: fetchError } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', currentUser.id);

      if (fetchError) {
        console.error('Error fetching following:', fetchError);
        return;
      }
      setFollowing(data.map(f => f.following_id));
    } catch (err) {
      console.error('Error in fetchFollowing:', err);
    }
  }, [currentUser]);

  const handleFollow = async (userId) => {
    try {
      const { error } = await supabase
        .from('follows')
        .insert([{ follower_id: currentUser.id, following_id: userId }]);

      if (error) {
        console.error('Error following user:', error);
        return;
      }
      setFollowing([...following, userId]);
    } catch (err) {
      console.error('Error in handleFollow:', err);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', currentUser.id)
        .eq('following_id', userId);

      if (error) {
        console.error('Error unfollowing user:', error);
        return;
      }
      setFollowing(following.filter(id => id !== userId));
    } catch (err) {
      console.error('Error in handleUnfollow:', err);
    }
  };

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getCurrentUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
      fetchFollowing();
    }
  }, [currentUser, fetchUsers, fetchFollowing]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Sidebar (Desktop only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-[#f0e6de] rounded-2xl p-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-[#333333] mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-compass text-[#F03328]"></i>
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#fff9f5] text-[#666666] font-medium transition-colors">
                    <i className="fa-solid fa-fire text-[#FF9E0C]"></i>
                    Trending
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#fff9f5] text-[#666666] font-medium transition-colors">
                    <i className="fa-solid fa-star text-[#FF9E0C]"></i>
                    Popular
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#fff9f5] text-[#666666] font-medium transition-colors">
                    <i className="fa-solid fa-users text-blue-500"></i>
                    Following
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Middle Column - Feed */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#333333] font-nunito">
                  Community Feed
                </h1>
                <p className="text-[#666666] mt-1">
                  Discover conversations from food lovers!
                </p>
              </div>
            </div>

            {/* Create Post Form */}
            <CreatePostForm onPostCreated={fetchPosts} />

            {/* Skeletons or Posts */}
            {loading ? (
              <div className="space-y-6">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#f0e6de] p-8">
                <i className="fa-solid fa-triangle-exclamation text-5xl text-[#F03328] mb-4"></i>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Something went wrong</h3>
                <p className="text-[#666666]">{error}</p>
                <button 
                  onClick={() => fetchPosts()} 
                  className="mt-4 px-4 py-2 bg-[#fff9f5] rounded-2xl font-medium hover:bg-[#fff5ee] text-[#333333] border border-[#f0e6de]"
                >
                  Try again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#f0e6de] p-8">
                <i className="fa-solid fa-utensils text-6xl text-[#f0e6de] mb-6"></i>
        <h3 className="text-xl font-bold text-[#333333] mb-2">No posts yet</h3>
        <p className="text-[#666666]">Be the first to share something delicious!</p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>

          {/* Right Column - Discover (Desktop only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-[#f0e6de] rounded-2xl p-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-[#333333] mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-fire text-[#FF9E0C]"></i>
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {['#Foodie', '#HomeCooking', '#HealthyEating', '#SweetTooth'].map((tag) => (
                    <a 
                      key={tag} 
                      href="#" 
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#fff9f5] transition-colors"
                    >
                      <span className="text-sm font-bold text-[#333333]">{tag}</span>
                      <span className="text-xs text-[#999999] font-medium">1.2k posts</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#f0e6de] rounded-2xl p-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-[#333333] mb-4">Who to Follow</h3>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <p className="text-xs text-[#999999]">No users to follow yet</p>
                  ) : (
                    users.map((user) => {
                      const isFollowing = following.includes(user.id);
                      return (
                        <div key={user.id} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white font-bold shrink-0">
                            {user.full_name?.charAt(0) || user.username?.charAt(0) || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#333333] truncate">
                              {user.full_name || user.username}
                            </p>
                            <p className="text-xs text-[#666666] truncate">
                              @{user.username}
                            </p>
                          </div>
                          <button
                            onClick={() => isFollowing ? handleUnfollow(user.id) : handleFollow(user.id)}
                            className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                              isFollowing
                                ? 'text-[#666666] border border-[#e0e0e0] hover:bg-[#f5f5f5]'
                                : 'text-[#F03328] border border-[#F03328] hover:bg-[#F03328] hover:text-white'
                            }`}
                          >
                            {isFollowing ? 'Following' : 'Follow'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;
