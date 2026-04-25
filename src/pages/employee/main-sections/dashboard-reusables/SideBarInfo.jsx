import { MonitorItem } from "./MonitorItem";
import { 
  IoInformationCircleOutline,
} from "react-icons/io5";

export function SideBarInfo({ user }) {

  return (

    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-[#89A1EF]">
          <IoInformationCircleOutline className="size-5" />
          <h3 className="font-bold text-gray-800 text-sm">Security Policy</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          SentinelAI prevents accidental leaks of PII (Names, Emails, Passwords). All data remains within organization bounds.
        </p>
        <ul className="space-y-3">
          <MonitorItem label="Anonymization" status="Active" />
          <MonitorItem label="Session ID" status={`#${user?.id || '000'}`} />
          <MonitorItem label="Audit Visibility" status="Restricted" />
        </ul>
      </div>
    </div>

  );

}