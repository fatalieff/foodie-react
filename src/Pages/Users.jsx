import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#F03328] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="nunito text-xl font-medium text-[#666666] animate-pulse">
          Loading users...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-[#F03328] text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold nunito mb-2 text-[#2D2D2D]">Something went wrong</h2>
        <p className="text-[#666666] mb-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[#F03328] font-bold tracking-widest uppercase text-xs mb-3 block">
          Our Team
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-nunito mb-6 bg-gradient-to-br from-[#2d2d2d] to-[#5c4033] bg-clip-text text-transparent">
          Meet Our <span className="text-[#F03328]">Community</span>
        </h1>
        <p className="text-[#666666] text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed font-nunito">
          Connecting people through the love of food. Our vibrant community of food enthusiasts and chefs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {users.map((user, index) => (
          <NavLink 
            to={`/users/${user.id}`} 
            key={user.id}
            className="group bg-white rounded-3xl border border-[#f0e6de] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(240,51,40,0.1)] text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#fff5ee] to-[#ffe8d6] rounded-full mx-auto mb-4 flex items-center justify-center text-[#F03328] text-2xl font-bold border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-500 font-nunito">
              {user.name.charAt(0)}
            </div>
            <h3 className="text-lg font-bold font-nunito text-[#2D2D2D] mb-1 group-hover:text-[#F03328] transition-colors">
              {user.name}
            </h3>
            <p className="text-[#666666] text-xs mb-4 font-nunito">{user.email}</p>
            <span className="inline-block text-[#F03328] text-xs font-bold border-b border-transparent group-hover:border-[#F03328] transition-all font-nunito">
              View Profile
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Users;
