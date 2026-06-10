import React from 'react';
import { format } from 'date-fns';

export const PostCard = ({ post }) => {
  const profile = post?.profiles;

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
          {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={`${profile.full_name || profile.username}'s avatar`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
              {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-800 truncate">
              {profile?.full_name || profile?.username || 'Anonymous'}
            </h3>
            {profile?.username && (
              <span className="text-sm text-gray-500">@{profile.username}</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy') : 'Recently'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-5">
        {post.title && (
          <h4 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h4>
        )}
        {post.content && (
          <p className="text-gray-600 leading-relaxed">{post.content}</p>
        )}
      </div>

      {/* Image */}
      {post.image_url && (
        <div className="mb-5 rounded-xl overflow-hidden border border-gray-100">
          <img 
            src={post.image_url} 
            alt={post.title || 'Post image'} 
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-8 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-600">
          <i className="fa-regular fa-heart text-lg"></i>
          <span className="text-sm font-medium">{post.likes_count || 0}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <i className="fa-regular fa-comment text-lg"></i>
          <span className="text-sm font-medium">{post.comments_count || 0}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 ml-auto">
          <i className="fa-regular fa-bookmark text-lg"></i>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
