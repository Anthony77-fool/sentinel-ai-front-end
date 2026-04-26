import React from "react";
import { 
  IoPersonOutline, 
  IoBusinessOutline, 
  IoMailOutline, 
  IoCalendarClearOutline,
  IoLocationOutline,
  IoBriefcaseOutline,
  IoShieldCheckmarkOutline,
  IoInformationCircleOutline
} from "react-icons/io5";

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

export function RightCol({ user, organization }) {

  return (

    <>

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

    </>

  );

}