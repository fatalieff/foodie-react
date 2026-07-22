import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export const PostCard = ({ post }) => {
  console.log('Post data in PostCard:', post);
  
  // Handle different possible profile locations (Supabase might return it as an array or object)
  let profile = post?.user || post?.profiles;
  if (Array.isArray(profile) && profile.length > 0) {
    profile = profile[0];
  }

  // Get display name with fallbacks - prioritize the new post.username column!
  const displayName = post.username || profile?.full_name || profile?.username || 'Anonymous';
  const displayUsername = post.username || profile?.username || null;
  const avatarInitial = displayName.charAt(0) || '?';

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-[#f0e6de] rounded-2xl p-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f0e6de] shrink-0">
          {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={`${displayName}'s avatar`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white font-bold">
              {avatarInitial}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#333333] truncate">
              {displayName}
            </h3>
            {displayUsername && (
              <span className="text-sm text-[#666666]">@{displayUsername}</span>
            )}
          </div>
          <p className="text-xs text-[#999999] mt-1">
            {post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy') : 'New'}
          </p>
        </div>
      </div>

      {/* Category Badge */}
      {post.category && (
        <div className="mb-4">
          <span className="inline-block px-4 py-1 bg-gradient-to-br from-[#FFF5EE] to-[#FFE8D6] text-[#F03328] font-nunito font-bold text-sm rounded-full">
            {post.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="mb-5">
        {post.title && (
          <h4 className="text-lg font-bold text-[#333333] mb-2">{post.title}</h4>
        )}
        {post.content && (
          <p className="text-[#666666] leading-relaxed">{post.content}</p>
        )}
      </div>

      {/* Image */}
      {post.image_url && (
        <div className="mb-5 rounded-2xl overflow-hidden border border-[#f0e6de]">
          <img 
            src={post.image_url} 
            alt={post.title || 'Post image'} 
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-8 pt-3 border-t border-[#f0e6de]">
        <button className="flex items-center gap-2 text-[#666666] hover:text-[#F03328] transition-colors">
          <i className="fa-regular fa-heart text-lg"></i>
          <span className="text-sm font-medium">{post.likes_count || 0}</span>
        </button>
        <button className="flex items-center gap-2 text-[#666666] hover:text-[#FF9E0C] transition-colors">
          <i className="fa-regular fa-comment text-lg"></i>
          <span className="text-sm font-medium">{post.comments_count || 0}</span>
        </button>
        <button className="flex items-center gap-2 text-[#666666] hover:text-[#F03328] transition-colors ml-auto">
          <i className="fa-regular fa-bookmark text-lg"></i>
        </button>
      </div>
    </motion.article>
  );
};

export default PostCard;
