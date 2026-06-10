import React from 'react';

export const PostSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 animate-pulse">
      {/* Header: Avatar + Username + Date */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      {/* Content: Title + Text */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Image placeholder */}
      <div className="w-full h-56 bg-gray-200 rounded-xl"></div>

      {/* Footer: Likes + Comments */}
      <div className="flex items-center gap-8 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          <div className="h-3 bg-gray-200 rounded w-10"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
