import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CreatePostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Initial user fetch for UI (avatar etc)
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getUser();
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
        alert('Lütfen önce giriş yapın.');
        setLoading(false);
        return;
      }

      // 3. Profil var mı kontrol et, yoksa oluştur (Upsert mantığı)
      const { data: profileCheck, error: profileError } = await supabase 
        .from('profiles') 
        .select('id') 
        .eq('id', user.id) 
        .single(); 

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116: JSON object requested, but no rows returned
        console.error('Profile check error:', profileError);
      }

      if (!profileCheck) { 
        const { error: insertProfileError } = await supabase
          .from('profiles')
          .insert([ 
            { 
              id: user.id, 
              username: user.email.split('@')[0], // Geçici username 
              full_name: 'Test Kullanıcısı',
              avatar_url: null
            } 
          ]);
        
        if (insertProfileError) {
          console.error('Failed to create temporary profile:', insertProfileError);
          throw new Error('Profil oluşturulamadığı için gönderi paylaşılamıyor.');
        }
      }

      // 4. Explicitly use user.id in the INSERT query to prevent foreign key errors
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title: title.trim(),
            content: content.trim(),
            user_id: user.id, // Explicitly use the verified user ID
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
      alert('Gönderi paylaşılamadı: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-8 transition-all duration-300 hover:shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 shrink-0 bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white font-bold">
            {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 space-y-3">
            <input
              type="text"
              placeholder="Give your post a title (optional)"
              className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-[#F03328]/20 rounded-lg py-2 px-4 text-gray-800 font-bold placeholder:text-gray-400 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="What's on your mind? Share your foodie thoughts..."
              rows="3"
              className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-[#F03328]/20 rounded-lg py-3 px-4 text-gray-700 placeholder:text-gray-400 resize-none transition-all"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-4 text-gray-400">
            <button type="button" className="hover:text-[#F03328] transition-colors p-2 rounded-full hover:bg-red-50">
              <i className="fa-regular fa-image text-xl"></i>
            </button>
            <button type="button" className="hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50">
              <i className="fa-regular fa-face-smile text-xl"></i>
            </button>
            <button type="button" className="hover:text-green-500 transition-colors p-2 rounded-full hover:bg-green-50">
              <i className="fa-solid fa-location-dot text-xl"></i>
            </button>
          </div>
          
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className={`bg-gradient-to-r from-[#F03328] to-[#FF9E0C] text-white px-8 py-2.5 rounded-full font-bold shadow-md transition-all duration-300 flex items-center gap-2 ${
              loading || !content.trim() ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:shadow-lg hover:-translate-y-px active:scale-95'
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
                Post Now
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
