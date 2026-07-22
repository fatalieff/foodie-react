import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CreatePostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Recipe');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const categories = [
    'Recipe',
    'Experience',
    'Tip',
    'Food Recommendation',
    'Other'
  ];

  useEffect(() => {
    // Initial user fetch for UI (avatar etc)
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      // 1. Verify user at the exact moment of submission
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      // 2. Stop and alert if user is not found or there is an auth error
      if (authError || !user) {
        alert('Please log in first.');
        setLoading(false);
        return;
      }

      // 3. Use upsert to handle profile (insert if not exists, do nothing if exists)
      const { error: upsertProfileError } = await supabase
        .from('profiles')
        .upsert([ 
          { 
            id: user.id, 
            username: user.user_metadata?.username || user.email.split('@')[0], 
            full_name: user.user_metadata?.username || user.email.split('@')[0],
            avatar_url: null
          } 
        ], { onConflict: 'id' });
      
      if (upsertProfileError) {
        console.error('Profile upsert error:', upsertProfileError);
        // Don't throw here, just log it and continue - profile might already exist
      }

      // 4. Explicitly use user.id in the INSERT query to prevent foreign key errors
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title: title.trim() || null,
            content: content.trim(),
            category,
            user_id: user.id, // Explicitly use the verified user ID
            username: user.user_metadata?.username || user.email.split('@')[0],
            likes_count: 0,
            comments_count: 0
          }
        ]);

      if (error) {
        // Log the specific error to help debugging
        console.error('Supabase Insert Error:', error);
        throw error;
      }

      // Clear form on success
      setTitle('');
      setContent('');
      
      // Notify parent to refresh feed
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
      alert('Could not create post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Don't show form if not logged in
  if (!currentUser) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 text-center">
        <p className="text-[#666666] mb-4">Please log in to create a post.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#f0e6de] rounded-2xl p-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] mb-8 transition-all duration-300 hover:shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f0e6de] shrink-0 bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white font-bold">
            {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 space-y-3">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#fff5ee] border border-[#f0e6de] focus:ring-2 focus:ring-[#F03328]/20 focus:border-[#F03328] rounded-2xl py-3 px-4 text-gray-800 font-bold transition-all mb-3"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Add a title (optional)"
                className="w-full bg-[#fff5ee] border border-[#f0e6de] focus:ring-2 focus:ring-[#F03328]/20 focus:border-[#F03328] rounded-2xl py-3 px-4 text-gray-800 font-bold placeholder:text-gray-400 transition-all mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="What's on your mind? Share your food story..."
                rows="3"
                className="w-full bg-[#fff5ee] border border-[#f0e6de] focus:ring-2 focus:ring-[#F03328]/20 focus:border-[#F03328] rounded-2xl py-3 px-4 text-gray-700 placeholder:text-gray-400 resize-none transition-all"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#f0e6de]">
          <div className="flex items-center gap-2 text-[#666666]">
            <button type="button" className="hover:text-[#F03328] transition-colors p-2 rounded-2xl hover:bg-[#fff5ee]">
              <i className="fa-regular fa-image text-xl"></i>
            </button>
            <button type="button" className="hover:text-[#FF9E0C] transition-colors p-2 rounded-2xl hover:bg-[#fff5ee]">
              <i className="fa-regular fa-face-smile text-xl"></i>
            </button>
            <button type="button" className="hover:text-green-600 transition-colors p-2 rounded-2xl hover:bg-[#fff5ee]">
              <i className="fa-solid fa-location-dot text-xl"></i>
            </button>
          </div>
          
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className={`bg-gradient-to-r from-[#F03328] to-[#FF9E0C] text-white px-8 py-2.5 rounded-3xl font-bold shadow-[0_4px_14px_rgba(240,51,40,0.3)] transition-all duration-300 flex items-center gap-2 ${
              loading || !content.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_8px_24px_rgba(240,51,40,0.4)] hover:-translate-y-0.5 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Posting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i>
                Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
