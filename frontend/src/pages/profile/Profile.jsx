import DashboardLayout from "../../components/layout/DashboardLayout";
import useProfile from "../../hooks/useProfile";

import {
  UserCircle2,
  Mail,
  CalendarDays,
} from "lucide-react";

function Profile() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl font-bold text-white">
            Loading...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  const user = data.data;

  return (
    <DashboardLayout>

      {/* Page Title */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your account information.
        </p>

      </div>

      {/* Profile Card */}

      <div
        className="
          max-w-3xl
          bg-[#141b2d]
          border
          border-slate-700
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            p-10
            flex
            items-center
            gap-6
          "
        >

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-white/20
              flex
              items-center
              justify-center
              text-white
              text-4xl
              font-bold
              border-4
              border-white/30
            "
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              {user.name}
            </h2>

            <p className="text-blue-100 mt-1">
              CollabSpace AI User
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-8 space-y-8">

          <div className="flex items-center gap-5">

            <UserCircle2
              size={28}
              className="text-blue-400"
            />

            <div>

              <p className="text-slate-400 text-sm">
                Full Name
              </p>

              <h3 className="text-xl font-semibold text-white">
                {user.name}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-5">

            <Mail
              size={28}
              className="text-blue-400"
            />

            <div>

              <p className="text-slate-400 text-sm">
                Email Address
              </p>

              <h3 className="text-xl text-white">
                {user.email}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-5">

            <CalendarDays
              size={28}
              className="text-blue-400"
            />

            <div>

              <p className="text-slate-400 text-sm">
                Member Since
              </p>

              <h3 className="text-xl text-white">
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Profile;