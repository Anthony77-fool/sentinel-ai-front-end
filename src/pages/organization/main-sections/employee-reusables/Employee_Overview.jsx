import { 
  IoPeopleOutline, 
  IoAddOutline,
  IoPulseOutline
} from "react-icons/io5";

import Card from "../../../../components/organization/Card";

export function Employee_Overview({ stats }) {

  return (

    <>

      {/* ── Employee Overview ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          title="Total Registered Accounts"
          value={stats.total.toString()}
          icon={<IoPeopleOutline />}
          trend={`+${stats.total.toString()}`}
          trendUp={true}
          sub="joined this month"
          sparkData={[10, 15, 12, 20, 25, 30, 35]} // Showing registration growth
        />
        <Card 
          title="Active Now"
          value={stats.active_now.toString()}
          icon={<IoPulseOutline />}
          trend="Steady"
          trendUp={true}
          sub="currently in gateway"
          sparkData={[5, 8, 4, 7, 6, 9, 8]} // Real-time pulse visualization
        />
        <Card 
          title="New Registrations"
          value={stats.new_today.toString()}
          icon={<IoAddOutline />}
          trend="Today"
          trendUp={true}
          sub="automated via signup"
          sparkData={[1, 0, 2, 0, 1, 3, 1]} // Daily sign-up peaks
        />
      </div>

    </>

  );

}