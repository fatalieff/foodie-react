import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import CreatePostForm from '../components/CreatePostForm';

export const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

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
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-compass text-[#F03328]"></i>
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                    <i className="fa-solid fa-fire text-orange-500"></i>
                    Trending
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    Popular
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
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
                <h1 className="text-3xl font-bold text-gray-900 font-nunito">
                  Community Feed
                </h1>
                <p className="text-gray-500 mt-1">
                  Discover what food lovers are talking about!
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
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 p-8">
                <i className="fa-solid fa-triangle-exclamation text-5xl text-[#F03328] mb-4"></i>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h3>
                <p className="text-gray-500">{error}</p>
                <button 
                  onClick={() => fetchPosts()} 
                  className="mt-4 px-4 py-2 bg-gray-100 rounded-lg font-medium hover:bg-gray-200"
                >
                  Try again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200 p-8">
                <i className="fa-solid fa-utensils text-6xl text-gray-200 mb-6"></i>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz gönderi yok</h3>
                <p className="text-gray-500">Be the first to share something delicious!</p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>

          {/* Right Column - Discover (Desktop only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-fire text-[#FF9E0C]"></i>
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {['#Foodie', '#Homemade', '#HealthyEats', '#DessertLovers'].map((tag) => (
                    <a 
                      key={tag} 
                      href="#" 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-gray-700">{tag}</span>
                      <span className="text-xs text-gray-400 font-medium">1.2k posts</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Who to Follow</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">Chef Gordon</p>
                        <p className="text-xs text-gray-500">@gordoneats</p>
                      </div>
                      <button className="text-xs font-bold text-[#F03328] border border-[#F03328] px-3 py-1 rounded-full hover:bg-[#F03328] hover:text-white transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
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
