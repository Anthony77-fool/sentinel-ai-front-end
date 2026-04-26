import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { 
  IoPersonOutline, 
  IoBusinessOutline, 
  IoMailOutline, 
  IoCalendarClearOutline,
  IoLocationOutline,
  IoBriefcaseOutline,
  IoTimeOutline,
  IoKeyOutline,
  IoShieldCheckmarkOutline,
  IoPencil,
  IoInformationCircleOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

// Helper component for detail rows
const DetailRow = ({ icon: Icon, label, value, isDate }) => {
  const formattedValue = isDate && value 
    ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : value;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 group">
      <div className="p-2.5 bg-gray-50 group-hover:bg-[#89A1EF]/10 rounded-xl text-gray-400 group-hover:text-[#89A1EF] transition-colors">
        <Icon className="size-4" />
      </div>
      <div className="flex-1">
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5">{formattedValue || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default function Profile({ sidebarCollapsed }) {
  // ── TanStack Query Implementation ──
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' 
        }
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

  // Loading State
  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <SiGooglegemini className="animate-spin size-8 text-[#89A1EF]" />
    </div>
  );

  // Fallback data if API returns empty
  const user = profile?.user || {};
  const organization = profile?.organization || { 
    business_name: "No Organization Linked", 
    entity_type: "N/A" 
  };

  return (
    <>
      <Helmet>
        <title>SentinelAI | My Profile</title>
      </Helmet>

      <div className={`mt-16 transition-all duration-300 p-8 min-h-screen bg-gray-50/50 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        
        {/* ── Page Header ── */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Organization Profile</h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Manage your personal administrative details and organization settings.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
              <div className="size-2 rounded-full bg-green-500 animate-pulse"/>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">System Active</span>
          </div>
        </div>

        <div className="max-w-7xl grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* ── LEFT COLUMN: Admin Image & organization Summary ── */}
          <div className="xl:col-span-1 space-y-8 sticky top-24">
            <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
               {/* Background Accent */}
               <div className="absolute top-0 right-0 w-40 h-40 bg-[#89A1EF]/5 rounded-full blur-3xl -mr-20 -mt-20" />
               
              {/* Profile Image Container */}
              <div className="relative group mb-6">
                <img 
                  src={user.profile_image} 
                  alt={`${user.first_name} ${user.last_name}`} 
                  className="size-32 rounded-full border-4 border-white shadow-xl shadow-[#89A1EF]/20 object-cover ring-2 ring-[#89A1EF]/10"
                />
                <button className="absolute bottom-1 right-1 bg-[#89A1EF] text-white p-2 rounded-full shadow-lg hover:bg-[#768bd9] transition-all cursor-pointer border-2 border-white">
                    <IoPencil className="size-4"/>
                </button>
              </div>

              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {`${user.first_name} ${user.last_name}`}
              </h2>
              
              <div className="inline-flex items-center gap-2 mt-2 px-3.5 py-1.5 bg-[#89A1EF] text-white rounded-full">
                <IoKeyOutline className="size-3.5" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest">
                  {user.role}
                </span>
              </div>

              <hr className="w-full border-gray-100 my-8" />

              <div className="w-full space-y-2">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider text-left pl-1">Primary Organization</p>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 w-full">
                    <div className="p-3 bg-white rounded-xl text-[#89A1EF] shadow-sm border border-gray-100">
                        <IoBusinessOutline className="size-6" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate">{organization.business_name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{organization.entity_type}</p>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Metadata Pill */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-inner bg-gray-50/50">
                <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5">
                    <IoTimeOutline/> Account Created:
                </p>
                <p className="text-[10px] text-gray-600 font-mono font-bold">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-CA') : '---'}
                </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Detailed Information ── */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Personal Details Card */}
            <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                    <div className="p-3 bg-[#89A1EF]/10 rounded-xl text-[#89A1EF]">
                        <IoPersonOutline className="size-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-xl tracking-tight">Personal Access Details</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Your SentinelAI Credentials</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                    <DetailRow icon={IoPersonOutline} label="First Name" value={user.first_name} />
                    <DetailRow icon={IoPersonOutline} label="Last Name" value={user.last_name} />
                    <DetailRow icon={IoMailOutline} label="Email Address" value={user.email} />
                    <DetailRow icon={IoBriefcaseOutline} label="Administrative Role" value={user.role} />
                </div>
            </div>

            {/* Organization Details Card */}
            <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                        <IoBusinessOutline className="size-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-xl tracking-tight">Organization Profile</h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Official Corporate Information</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <DetailRow icon={IoBusinessOutline} label="Business Name" value={organization.business_name} />
                    <DetailRow icon={IoCalendarClearOutline} label="Founding Date" value={organization.founding_date} isDate />
                    <DetailRow icon={IoShieldCheckmarkOutline} label="Entity Type" value={organization.entity_type} />
                    <DetailRow icon={IoLocationOutline} label="Registered Address" value={organization.address} />
                </div>
            </div>

            {/* System Information Box */}
             <div className="mt-8 p-6 bg-gradient-to-br from-blue-50/80 to-white border border-blue-100/50 rounded-[1.5rem] shadow-inner">
                <div className="flex gap-4">
                  <IoInformationCircleOutline className="text-[#89A1EF] size-6 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 font-bold mb-1">System Record Integrity</p>
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                      These records are derived from the master `users` and `organizations` tables. 
                      Last system sync occurred on {new Date().toLocaleTimeString()}. 
                      For security reasons, changing the registered email or organization name requires contacting SentinelAI enterprise support.
                    </p>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
    </>
  );
}