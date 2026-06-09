import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('User not found');
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#F03328] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="nunito text-xl font-medium text-[#666666] animate-pulse">
          Fetching user details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-[#F03328] text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold nunito mb-2 text-[#2D2D2D]">User Not Found</h2>
        <p className="text-[#666666] mb-6">We couldn't find the person you're looking for.</p>
        <button 
          onClick={() => navigate('/users')}
          className="bg-[#F03328] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#d42a20] transition-colors"
        >
          Back to Community
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-4xl mx-auto px-4">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-[#666666] hover:text-[#F03328] transition-colors font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#f0e6de] overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#FF9E0C] to-[#F03328]"></div>
        <div className="px-8 pb-12">
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-full flex items-center justify-center text-[#F03328] text-5xl font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-3xl font-bold nunito text-[#2D2D2D] mb-2">{user.name}</h1>
              <p className="text-[#F03328] font-semibold mb-6">@{user.username}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#666666]">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#F03328]">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold opacity-50">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#666666]">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#F03328]">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold opacity-50">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#666666]">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#F03328]">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold opacity-50">Website</p>
                    <p className="font-medium">{user.website}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <h4 className="font-bold nunito text-[#2D2D2D] mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-building text-[#F03328]"></i> Company
                </h4>
                <p className="text-xl font-semibold text-[#2D2D2D] mb-1">{user.company.name}</p>
                <p className="text-sm text-[#666666] italic">"{user.company.catchPhrase}"</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <h4 className="font-bold nunito text-[#2D2D2D] mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-[#F03328]"></i> Address
                </h4>
                <p className="text-[#666666]">
                  {user.address.street}, {user.address.suite}<br />
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
