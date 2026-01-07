"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getUserMembership, getUserSchedule, updateUserProfile, getUserCreditBalance, getWeeklyUsage, getSubsidyInfo, getSubsidyBalance, getSubsidyUsage, getUserWaivers, UserProfile, UserMembership, UserScheduleResponse, UserCreditBalance, WeeklyUsage, SubsidyInfo, SubsidyBalance, SubsidyUsage, Waiver } from "@/services/userProfile";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  Mail,
  Phone,
  Edit3,
  Settings,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  FileText,
  ExternalLink
} from "lucide-react";

/**
 * ProfilePage:
 * User profile page showing personal information, membership details, and schedule
 */
export default function ProfilePage() {
  const { user, userProfile, isAuthenticated, loading: authLoading, jwt } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [scheduleTab, setScheduleTab] = useState("upcoming");
  const [membership, setMembership] = useState<UserMembership | null>(null);
  const [schedule, setSchedule] = useState<UserScheduleResponse>({ events: [], games: [], practices: [] });
  const [creditBalance, setCreditBalance] = useState<UserCreditBalance | null>(null);
  const [weeklyUsage, setWeeklyUsage] = useState<WeeklyUsage | null>(null);
  const [membershipLoading, setMembershipLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [creditsLoading, setCreditsLoading] = useState(true);
  const [membershipError, setMembershipError] = useState("");
  const [scheduleError, setScheduleError] = useState("");
  const [creditsError, setCreditsError] = useState("");
  const [subsidies, setSubsidies] = useState<SubsidyInfo[]>([]);
  const [subsidyBalance, setSubsidyBalance] = useState<SubsidyBalance | null>(null);
  const [subsidyUsage, setSubsidyUsage] = useState<SubsidyUsage[]>([]);
  const [subsidiesLoading, setSubsidiesLoading] = useState(true);
  const [subsidiesError, setSubsidiesError] = useState("");
  const [waivers, setWaivers] = useState<Waiver[]>([]);
  const [waiversLoading, setWaiversLoading] = useState(true);
  const [waiversError, setWaiversError] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch user data
  useEffect(() => {
    if (!isAuthenticated) return;

    // Log JWT token for debugging
    const jwtToken = localStorage.getItem('jwt');
    console.log("🔑 JWT Token:", jwtToken);

    const fetchUserData = async () => {
      // Fetch membership data
      try {
        setMembershipLoading(true);
        const membershipData = await getUserMembership();
        setMembership(membershipData);
      } catch (error: any) {
        console.error("Error fetching membership:", error);
        setMembershipError(error.message || "Failed to load membership data");
      } finally {
        setMembershipLoading(false);
      }

      // Fetch schedule data
      try {
        setScheduleLoading(true);
        const scheduleData = await getUserSchedule();
        setSchedule(scheduleData);
      } catch (error: any) {
        console.error("Error fetching schedule:", error);
        setScheduleError(error.message || "Failed to load schedule data");
      } finally {
        setScheduleLoading(false);
      }

      // Fetch credit data (user may not have a credit package - that's OK)
      try {
        setCreditsLoading(true);

        // Fetch credit balance - returns null if user has no credit package
        const credits = await getUserCreditBalance();
        setCreditBalance(credits);

        // Fetch weekly usage separately (returns null if not available)
        const usage = await getWeeklyUsage();
        setWeeklyUsage(usage);
      } catch (error: any) {
        // Only log auth errors, ignore others (user likely has no credit package)
        if (error.message?.includes('Authentication')) {
          console.error("Error fetching credits:", error);
          setCreditsError(error.message);
        } else {
          console.log("Credits not available for user (this is normal if no credit package)");
        }
      } finally {
        setCreditsLoading(false);
      }

      // Fetch subsidy data
      try {
        setSubsidiesLoading(true);

        // Fetch all subsidy data in parallel
        const [subsidyInfoData, subsidyBalanceData, subsidyUsageData] = await Promise.all([
          getSubsidyInfo().catch(() => []),
          getSubsidyBalance().catch(() => null),
          getSubsidyUsage().catch(() => [])
        ]);

        setSubsidies(subsidyInfoData);
        setSubsidyBalance(subsidyBalanceData);
        setSubsidyUsage(subsidyUsageData);
      } catch (error: any) {
        console.error("Error fetching subsidies:", error);
        setSubsidiesError(error.message || "Failed to load subsidy data");
      } finally {
        setSubsidiesLoading(false);
      }

      // Fetch waivers data
      try {
        setWaiversLoading(true);

        // Get user ID from userProfile or JWT
        const userId = userProfile?.id;
        if (userId) {
          const waiversData = await getUserWaivers(userId);
          setWaivers(waiversData);
        } else {
          console.log("⚠️ No user ID available for waivers fetch");
          setWaivers([]);
        }
      } catch (error: any) {
        console.error("Error fetching waivers:", error);
        if (error.message?.includes('404')) {
          // No waivers found - not an error
          setWaivers([]);
        } else {
          setWaiversError(error.message || "Failed to load waivers");
        }
      } finally {
        setWaiversLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, userProfile?.id]);

  // Profile tabs
  const profileTabs = [
    { id: "overview", label: "Overview" },
    { id: "membership", label: "Membership" },
    { id: "schedule", label: "My Schedule" },
    { id: "waivers", label: "Waivers" },
  ];

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time helper
  const formatTime = (dateString?: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to check if a date is in the future
  const isFuture = (dateString?: string) => {
    if (!dateString) return false;
    return new Date(dateString) > new Date();
  };

  // Filter schedule items by upcoming/completed
  const filterScheduleItems = (items: any[], dateField: string) => {
    return {
      upcoming: items.filter(item => isFuture(item[dateField])),
      completed: items.filter(item => !isFuture(item[dateField]))
    };
  };

  // Get filtered schedule data
  const filteredEvents = filterScheduleItems(schedule.events, 'start_at');
  const filteredGames = filterScheduleItems(schedule.games, 'start_time');
  const filteredPractices = filterScheduleItems(schedule.practices, 'start_time');

  // Get data for current tab
  const getCurrentScheduleData = () => {
    if (scheduleTab === "upcoming") {
      return {
        events: filteredEvents.upcoming,
        games: filteredGames.upcoming,
        practices: filteredPractices.upcoming
      };
    } else {
      return {
        events: filteredEvents.completed,
        games: filteredGames.completed,
        practices: filteredPractices.completed
      };
    }
  };

  const currentScheduleData = getCurrentScheduleData();

  // Helper functions for user display
  const getUserDisplayName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    if (userProfile?.first_name) {
      return userProfile.first_name;
    }
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    }
    if (userProfile?.first_name) {
      return userProfile.first_name[0].toUpperCase();
    }
    if (user?.displayName) {
      const nameParts = user.displayName.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getProfilePicture = () => {
    return userProfile?.photo_url || user?.photoURL || null;
  };

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (clickedDate: Date) => {
    // Check if there are activities on this date
    const dateString = clickedDate.toDateString();
    const hasActivity = schedule.events.some(event =>
      event.start_at && new Date(event.start_at).toDateString() === dateString
    ) || schedule.games.some(game =>
      game.start_time && new Date(game.start_time).toDateString() === dateString
    ) || schedule.practices.some(practice =>
      practice.start_time && new Date(practice.start_time).toDateString() === dateString
    );

    if (hasActivity) {
      // Navigate to schedule tab
      setActiveTab("schedule");
      // Determine if it's upcoming or completed
      const isUpcoming = clickedDate >= new Date();
      setScheduleTab(isUpcoming ? "upcoming" : "completed");
    }
  };

  // Edit profile functions
  const openEditModal = () => {
    setEditForm({
      first_name: userProfile?.first_name || "",
      last_name: userProfile?.last_name || "",
      phone: userProfile?.phone || ""
    });
    setIsEditModalOpen(true);
    setUpdateError("");
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditForm({});
    setUpdateError("");
  };

  const handleUpdateProfile = async () => {
    if (!userProfile?.id) {
      setUpdateError("No user ID found");
      return;
    }

    // Basic form validation
    if (!editForm.first_name?.trim()) {
      setUpdateError("First name is required");
      return;
    }

    if (!editForm.last_name?.trim()) {
      setUpdateError("Last name is required");
      return;
    }

    // Phone validation (if provided)
    if (editForm.phone && editForm.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,3}[\s\-]?[\(]?[\d]{1,4}[\)]?[\s\-]?[\d]{1,4}[\s\-]?[\d]{1,9}$/;
      if (!phoneRegex.test(editForm.phone.replace(/\s/g, ''))) {
        setUpdateError("Please enter a valid phone number");
        return;
      }
    }

    setIsUpdating(true);
    setUpdateError("");

    try {
      await updateUserProfile(userProfile.id, {
        ...editForm,
        first_name: editForm.first_name.trim(),
        last_name: editForm.last_name.trim(),
        phone: editForm.phone?.trim() || ""
      });
      // Refresh the page data or update the context
      window.location.reload(); // Simple approach - could be optimized
      closeEditModal();
    } catch (error: any) {
      setUpdateError(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-12">
        {/* Profile Header Card */}
        <div className="relative mb-8">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffb800]/10 via-transparent to-transparent rounded-2xl" />

          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border-2 border-[#ffb800]/30 overflow-hidden shadow-lg shadow-[#ffb800]/10">
                  {getProfilePicture() ? (
                    <img
                      src={getProfilePicture()!}
                      alt={getUserDisplayName()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#ffb800] to-[#ff8c00] flex items-center justify-center">
                      <span className="text-3xl font-bold text-black">
                        {getUserInitials()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {getUserDisplayName()}
                </h1>
                <p className="text-[#ffb800] font-medium mb-4">
                  {userProfile?.role?.charAt(0).toUpperCase() + userProfile?.role?.slice(1) || "Member"}
                </p>
                <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{userProfile?.email || user?.email}</span>
                  </div>
                  {userProfile?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{userProfile.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={openEditModal}
                className="px-5 py-2.5 bg-[#ffb800] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#ffb800]/20"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-1.5 mb-8">
          <nav className="flex gap-1">
            {profileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#ffb800] text-black shadow-lg shadow-[#ffb800]/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Membership Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#ffb800]/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-[#ffb800]" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Membership</h3>
                  </div>
                  {(userProfile?.membership_info || membership) ? (
                    <div>
                      <p className="text-xl font-semibold text-white mb-1">
                        {userProfile?.membership_info?.membership_name || membership?.membership_name}
                      </p>
                      {membership?.next_payment_date && (
                        <p className="text-sm text-gray-400">
                          Next payment {formatDate(membership.next_payment_date)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-500 text-sm mb-3">No active membership</p>
                      {/* Temporarily using Glofox link - old: onClick={() => router.push('/allmemberships') */}
                      <a
                        href="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffb800] text-sm font-medium hover:underline"
                      >
                        Browse Plans →
                      </a>
                    </div>
                  )}
                </div>

                {/* Credits Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span className="text-green-400 font-bold text-lg">$</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Credits</h3>
                  </div>
                  {creditsLoading ? (
                    <div className="animate-pulse">
                      <div className="h-7 bg-gray-700 rounded w-20 mb-1"></div>
                      <div className="h-4 bg-gray-700 rounded w-16"></div>
                    </div>
                  ) : creditBalance ? (
                    <div>
                      <p className="text-3xl font-bold text-white mb-1">{creditBalance.remaining_credits || 0}</p>
                      <p className="text-sm text-gray-400">credits remaining</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No credits</p>
                  )}
                </div>

                {/* Activity Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Upcoming</h3>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white mb-1">
                      {filteredEvents.upcoming.length + filteredGames.upcoming.length + filteredPractices.upcoming.length}
                    </p>
                    <p className="text-sm text-gray-400">scheduled activities</p>
                  </div>
                </div>
              </div>

              {/* Subsidy Quick View (if has subsidies) */}
              {subsidies.length > 0 && (
                <div className="bg-gradient-to-r from-[#ffb800]/5 to-transparent rounded-xl border border-[#ffb800]/20 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#ffb800]/10 flex items-center justify-center">
                        <span className="text-[#ffb800] font-bold text-xl">$</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Subsidy Balance</p>
                        <p className="text-2xl font-bold text-[#ffb800]">
                          ${subsidies.filter(s => s.status === 'active').reduce((sum, s) => sum + (s.remaining_balance || 0), 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('membership')}
                      className="text-[#ffb800] text-sm font-medium hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Calendar Section */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Calendar</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="text-sm font-medium text-white min-w-[140px] text-center">
                      {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                    <div key={i} className="text-center text-gray-500 font-medium py-2 text-xs">
                      {day}
                    </div>
                  ))}

                  {(() => {
                    const today = new Date();
                    const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
                    const lastDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0);
                    const startDate = new Date(firstDay);
                    startDate.setDate(startDate.getDate() - firstDay.getDay());

                    const days = [];
                    for (let i = 0; i < 42; i++) {
                      const currentDate = new Date(startDate);
                      currentDate.setDate(startDate.getDate() + i);

                      const isCurrentMonth = currentDate.getMonth() === calendarMonth.getMonth();
                      const isToday = currentDate.toDateString() === today.toDateString();
                      const hasActivity = schedule.events.some(event =>
                        event.start_at && new Date(event.start_at).toDateString() === currentDate.toDateString()
                      ) || schedule.games.some(game =>
                        game.start_time && new Date(game.start_time).toDateString() === currentDate.toDateString()
                      ) || schedule.practices.some(practice =>
                        practice.start_time && new Date(practice.start_time).toDateString() === currentDate.toDateString()
                      );

                      days.push(
                        <div
                          key={i}
                          onClick={() => handleDateClick(currentDate)}
                          className={`text-center py-2 relative cursor-pointer rounded-lg transition-colors ${
                            isCurrentMonth
                              ? isToday
                                ? 'bg-[#ffb800] text-black font-bold'
                                : hasActivity
                                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                                  : 'text-gray-300 hover:bg-gray-800'
                              : 'text-gray-600'
                          }`}
                        >
                          {currentDate.getDate()}
                          {hasActivity && !isToday && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#ffb800] rounded-full"></div>
                          )}
                        </div>
                      );
                    }
                    return days;
                  })()}
                </div>

                {/* Upcoming Activities */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <p className="text-sm font-medium text-gray-400 mb-3">Next Activities</p>
                  {filteredEvents.upcoming.length > 0 || filteredGames.upcoming.length > 0 || filteredPractices.upcoming.length > 0 ? (
                    <div className="space-y-2">
                      {[...filteredEvents.upcoming, ...filteredGames.upcoming, ...filteredPractices.upcoming]
                        .sort((a, b) => new Date(a.start_at || a.start_time || '').getTime() - new Date(b.start_at || b.start_time || '').getTime())
                        .slice(0, 3)
                        .map((activity, index) => {
                          const startTime = activity.start_at || activity.start_time;
                          return (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                              <div className="w-10 h-10 rounded-lg bg-[#ffb800]/10 flex items-center justify-center flex-shrink-0">
                                <Calendar className="h-4 w-4 text-[#ffb800]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {'program' in activity ? activity.program?.name :
                                   'home_team_name' in activity ? `${activity.home_team_name} vs ${activity.away_team_name}` :
                                   'team_name' in activity ? `${activity.team_name} Practice` : 'Activity'}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {startTime ? new Date(startTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ''}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No upcoming activities</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "membership" && (
            <>
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5">
              <h3 className="text-lg font-semibold text-white mb-6">Membership Details</h3>

              {membershipLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-16 bg-gray-700 rounded"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ) : membershipError ? (
                <div className="flex items-center text-red-400 p-4 bg-red-900/10 rounded-lg border border-red-900/20">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{membershipError}</span>
                </div>
              ) : membership ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#ffb800]/10 to-transparent rounded-xl border border-[#ffb800]/20">
                    <div className="w-14 h-14 rounded-xl bg-[#ffb800] flex items-center justify-center">
                      <CreditCard className="h-7 w-7 text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-white">{membership.membership_name}</p>
                      <p className="text-[#ffb800]">{membership.membership_plan_name}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      membership.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {membership.status?.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Start Date</p>
                      <p className="text-white font-medium">{formatDate(membership.start_date)}</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Renewal Date</p>
                      <p className="text-white font-medium">{formatDate(membership.renewal_date)}</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Next Payment</p>
                      <p className="text-[#ffb800] font-medium">{formatDate(membership.next_payment_date)}</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Price</p>
                      <p className="text-white font-medium">{membership.price || "N/A"}</p>
                    </div>
                  </div>

                  {membership.membership_description && (
                    <div className="p-4 bg-gray-800/30 rounded-xl">
                      <p className="text-sm text-gray-400 mb-2">Description</p>
                      <p className="text-gray-300">{membership.membership_description}</p>
                    </div>
                  )}

                  {membership.membership_benefits && (
                    <div className="p-4 bg-gray-800/30 rounded-xl">
                      <p className="text-sm text-gray-400 mb-2">Benefits</p>
                      <p className="text-gray-300">{membership.membership_benefits}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-gray-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">No Active Membership</h4>
                  <p className="text-gray-400 mb-6">You don't have an active membership yet.</p>
                  {/* Temporarily using Glofox link - old: onClick={() => router.push('/allmemberships') */}
                  <a
                    href="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-[#ffb800] text-black font-semibold rounded-xl hover:bg-[#e0a300] transition-colors inline-block"
                  >
                    Browse Memberships
                  </a>
                </div>
              )}
            </div>

            {/* Subsidies Section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5 mt-6">
              <h3 className="text-lg font-semibold text-white mb-6">Subsidies</h3>

              {subsidiesLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-gray-700 rounded-xl"></div>
                    <div className="h-20 bg-gray-700 rounded-xl"></div>
                    <div className="h-20 bg-gray-700 rounded-xl"></div>
                  </div>
                </div>
              ) : subsidiesError ? (
                <div className="flex items-center text-red-400 p-4 bg-red-900/10 rounded-lg border border-red-900/20">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{subsidiesError}</span>
                </div>
              ) : subsidies.length > 0 ? (
                <div className="space-y-6">
                  {/* Subsidy Balance Summary */}
                  {(() => {
                    const activeSubsidies = subsidies.filter(s => s.status === 'active');
                    const totalRemaining = activeSubsidies.reduce((sum, s) => sum + (s.remaining_balance || 0), 0);
                    const totalApproved = activeSubsidies.reduce((sum, s) => sum + (s.approved_amount || 0), 0);
                    const totalUsed = activeSubsidies.reduce((sum, s) => sum + (s.total_amount_used || 0), 0);

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-800/50 rounded-xl text-center">
                          <p className="text-xs text-gray-400 mb-2">Total Approved</p>
                          <p className="text-2xl font-bold text-white">${totalApproved.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-[#ffb800]/20 to-[#ffb800]/5 rounded-xl text-center border border-[#ffb800]/20">
                          <p className="text-xs text-gray-400 mb-2">Available Balance</p>
                          <p className="text-2xl font-bold text-[#ffb800]">${totalRemaining.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-xl text-center">
                          <p className="text-xs text-gray-400 mb-2">Used</p>
                          <p className="text-2xl font-bold text-gray-300">${totalUsed.toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Active Subsidies */}
                  {subsidies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Subsidy Details</h4>
                      <div className="space-y-3">
                        {subsidies.map((subsidy) => (
                          <div key={subsidy.id} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-white font-medium">{subsidy.provider?.name}</p>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                subsidy.status === 'active'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {subsidy.status?.toUpperCase()}
                              </span>
                            </div>
                            {subsidy.reason && (
                              <p className="text-gray-400 text-sm mb-3">{subsidy.reason}</p>
                            )}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500 text-xs">Approved</p>
                                <p className="text-white">${subsidy.approved_amount?.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Used</p>
                                <p className="text-gray-300">${subsidy.total_amount_used?.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Remaining</p>
                                <p className="text-[#ffb800] font-medium">${subsidy.remaining_balance?.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Valid From</p>
                                <p className="text-white">{formatDate(subsidy.valid_from)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Usage */}
                  {subsidyUsage.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Usage</h4>
                      <div className="space-y-2">
                        {subsidyUsage.slice(0, 5).map((usage) => {
                          const formatTransactionType = (type: string) => {
                            const typeMap: Record<string, string> = {
                              'membership_payment': 'Membership Payment',
                              'event_payment': 'Event Payment',
                              'credit_purchase': 'Credit Purchase',
                              'refund': 'Refund',
                            };
                            return typeMap[type] || type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                          };

                          return (
                            <div key={usage.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                              <div className="flex-1">
                                <p className="text-white text-sm">{formatTransactionType(usage.transaction_type)}</p>
                                <p className="text-gray-500 text-xs">{formatDate(usage.date)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-[#ffb800]">
                                  -${usage.subsidy_applied?.toFixed(2)}
                                </p>
                                {usage.customer_paid > 0 && (
                                  <p className="text-xs text-gray-500">
                                    You paid: ${usage.customer_paid?.toFixed(2)}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-gray-500">$</span>
                  </div>
                  <p className="text-gray-400">No subsidies available</p>
                </div>
              )}
            </div>
            </>
          )}

          {activeTab === "schedule" && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5">
              <h3 className="text-lg font-semibold text-white mb-6">My Schedule</h3>

              {/* Schedule sub-tabs */}
              <div className="mb-6">
                <div className="flex gap-1 bg-gray-800/50 rounded-lg p-1">
                  <button
                    onClick={() => setScheduleTab("upcoming")}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      scheduleTab === "upcoming"
                        ? "bg-[#ffb800] text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Upcoming ({filteredEvents.upcoming.length + filteredGames.upcoming.length + filteredPractices.upcoming.length})
                  </button>
                  <button
                    onClick={() => setScheduleTab("completed")}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      scheduleTab === "completed"
                        ? "bg-[#ffb800] text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Completed ({filteredEvents.completed.length + filteredGames.completed.length + filteredPractices.completed.length})
                  </button>
                </div>
              </div>

              {scheduleLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-700 rounded-xl"></div>
                  ))}
                </div>
              ) : scheduleError ? (
                <div className="flex items-center text-red-400 p-4 bg-red-900/10 rounded-lg border border-red-900/20">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{scheduleError}</span>
                </div>
              ) : (currentScheduleData.events.length > 0 || currentScheduleData.games.length > 0 || currentScheduleData.practices.length > 0) ? (
                <div className="space-y-6">
                  {/* Events */}
                  {currentScheduleData.events.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-[#ffb800]" />
                        <h4 className="text-sm font-medium text-gray-400">Events ({currentScheduleData.events.length})</h4>
                      </div>
                      <div className="space-y-3">
                        {currentScheduleData.events.map((event, index) => (
                          <div key={event.id || index} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                            <h5 className="font-medium text-white mb-2">{event.program?.name || "Event"}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <Clock className="h-4 w-4 text-[#ffb800]" />
                                <span>{formatDate(event.start_at)} • {formatTime(event.start_at)}</span>
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-2 text-gray-400">
                                  <MapPin className="h-4 w-4 text-[#ffb800]" />
                                  <span>{event.location.name}</span>
                                </div>
                              )}
                              {event.team && (
                                <div className="flex items-center gap-2 text-gray-400">
                                  <Users className="h-4 w-4 text-[#ffb800]" />
                                  <span>{event.team.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Games */}
                  {currentScheduleData.games.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-[#ffb800]" />
                        <h4 className="text-sm font-medium text-gray-400">Games ({currentScheduleData.games.length})</h4>
                      </div>
                      <div className="space-y-3">
                        {currentScheduleData.games.map((game, index) => (
                          <div key={game.id || index} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                            <h5 className="font-medium text-white mb-2">{game.home_team_name} vs {game.away_team_name}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <Clock className="h-4 w-4 text-[#ffb800]" />
                                <span>{formatDate(game.start_time)} • {formatTime(game.start_time)}</span>
                              </div>
                              {game.location_name && (
                                <div className="flex items-center gap-2 text-gray-400">
                                  <MapPin className="h-4 w-4 text-[#ffb800]" />
                                  <span>{game.location_name}</span>
                                </div>
                              )}
                              <div className="text-gray-400">
                                Score: {game.home_score || 0} - {game.away_score || 0}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practices */}
                  {currentScheduleData.practices.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-[#ffb800]" />
                        <h4 className="text-sm font-medium text-gray-400">Practices ({currentScheduleData.practices.length})</h4>
                      </div>
                      <div className="space-y-3">
                        {currentScheduleData.practices.map((practice, index) => (
                          <div key={practice.id || index} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                            <h5 className="font-medium text-white mb-2">{practice.team_name || "Team Practice"}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <Clock className="h-4 w-4 text-[#ffb800]" />
                                <span>{formatDate(practice.start_time)} • {formatTime(practice.start_time)}</span>
                              </div>
                              {practice.location_name && (
                                <div className="flex items-center gap-2 text-gray-400">
                                  <MapPin className="h-4 w-4 text-[#ffb800]" />
                                  <span>{practice.location_name}</span>
                                </div>
                              )}
                              {practice.booked_by_name && (
                                <div className="flex items-center gap-2 text-gray-400">
                                  <User className="h-4 w-4 text-[#ffb800]" />
                                  <span>Booked by: {practice.booked_by_name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">No Activities</h4>
                  <p className="text-gray-400">You don't have any {scheduleTab} activities.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "waivers" && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-xl border border-gray-800 p-5">
              <h3 className="text-lg font-semibold text-white mb-6">My Waivers</h3>

              {/* Info Banner */}
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl mb-6 border border-gray-700/50">
                <FileText className="h-5 w-5 text-[#ffb800] flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  View your uploaded waiver documents. To upload new waivers, please use the RISE mobile app.
                </p>
              </div>

              {waiversLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-700 rounded-xl"></div>
                  ))}
                </div>
              ) : waiversError ? (
                <div className="flex items-center text-red-400 p-4 bg-red-900/10 rounded-lg border border-red-900/20">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{waiversError}</span>
                </div>
              ) : waivers.length > 0 ? (
                <div className="space-y-3">
                  {waivers.map((waiver) => {
                    const uploadDate = waiver.uploaded_at?.Valid && waiver.uploaded_at?.Time
                      ? new Date(waiver.uploaded_at.Time).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : 'Unknown date';

                    return (
                      <div
                        key={waiver.id}
                        className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#ffb800]/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-6 w-6 text-[#ffb800]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {waiver.file_name || 'Waiver Document'}
                          </p>
                          <p className="text-sm text-gray-400">
                            Uploaded: {uploadDate}
                          </p>
                          {waiver.notes && (
                            <p className="text-sm text-gray-500 mt-1 truncate italic">
                              {waiver.notes}
                            </p>
                          )}
                        </div>
                        {waiver.file_url && (
                          <a
                            href={waiver.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-[#ffb800]/10 text-[#ffb800] rounded-lg hover:bg-[#ffb800]/20 transition-colors flex items-center gap-2"
                            title="View waiver"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-sm font-medium hidden sm:inline">View</span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">No Waivers</h4>
                  <p className="text-gray-400 mb-2">You haven't uploaded any waivers yet.</p>
                  <p className="text-sm text-gray-500">Use the RISE mobile app to upload waiver documents.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeEditModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl border border-gray-800 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#ffb800]" />
                  Edit Profile
                </h3>
                <button
                  onClick={closeEditModal}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {updateError && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm">{updateError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={editForm.first_name || ""}
                      onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editForm.last_name || ""}
                      onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone || ""}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeEditModal}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2.5 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2.5 bg-[#ffb800] text-black font-semibold rounded-xl hover:bg-[#e0a300] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
