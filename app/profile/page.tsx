"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getUserMembership, getUserSchedule, updateUserProfile, getUserCreditBalance, getWeeklyUsage, UserProfile, UserMembership, UserScheduleResponse, UserCreditBalance, WeeklyUsage } from "@/services/userProfile";
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
  Save
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

      // Fetch credit data
      try {
        setCreditsLoading(true);

        // Fetch credit balance
        try {
          const credits = await getUserCreditBalance();
          setCreditBalance(credits);
        } catch (error: any) {
          console.error("Error fetching credit balance:", error);
          setCreditsError(error.message || "Failed to load credit balance");
        }

        // Fetch weekly usage separately (don't fail if this fails)
        try {
          const usage = await getWeeklyUsage();
          setWeeklyUsage(usage);
        } catch (error: any) {
          console.warn("Error fetching weekly usage (non-critical):", error);
          // Don't set creditsError here - weekly usage is optional
        }
      } finally {
        setCreditsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  // Profile tabs
  const profileTabs = [
    { id: "overview", label: "Overview" },
    { id: "membership", label: "Membership" },
    { id: "schedule", label: "My Schedule" },
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
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full border border-gray-600 overflow-hidden">
                {getProfilePicture() ? (
                  <img
                    src={getProfilePicture()!}
                    alt={getUserDisplayName()}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {getUserInitials()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-semibold text-white mb-1">
                    {getUserDisplayName()}
                  </h1>
                  <p className="text-gray-400 text-sm mb-2">{userProfile?.email || user?.email}</p>
                  {userProfile?.phone && (
                    <p className="text-gray-400 text-sm">{userProfile.phone}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={openEditModal}
                    className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors border border-gray-600"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-6">
            {profileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#ffb800] text-[#ffb800]'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
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
              {/* Personal Information Section */}
              <div className="bg-gray-900 rounded border border-gray-700 p-4">
                <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <p className="text-white mt-1">{getUserDisplayName()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white mt-1">{userProfile?.email || user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white mt-1">{userProfile?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Role</label>
                    <p className="text-white mt-1">{userProfile?.role?.toUpperCase() || "NOT SPECIFIED"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Account Status</label>
                    <p className="mt-1">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        isAuthenticated ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                      }`}>
                        {isAuthenticated ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Membership & Activity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Membership Summary */}
                <div className="bg-gray-900 rounded border border-gray-700 p-4">
                  <h3 className="text-lg font-medium text-white mb-4">Membership</h3>
                  {(userProfile?.membership_info || membership) ? (
                    <div className="space-y-2">
                      <p className="text-white font-medium">
                        {userProfile?.membership_info?.membership_name || membership?.membership_name}
                      </p>
                      {(userProfile?.membership_info?.plan_name || membership?.membership_plan_name) && (
                        <p className="text-gray-400 text-sm">
                          {userProfile?.membership_info?.plan_name || membership?.membership_plan_name}
                        </p>
                      )}
                      {(userProfile?.membership_info?.renewal_date || membership?.renewal_date) && (
                        <p className="text-gray-400 text-sm">
                          Renews: {formatDate(userProfile?.membership_info?.renewal_date || membership?.renewal_date)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-400 text-sm mb-3">No active membership</p>
                      <button
                        onClick={() => router.push('/allmemberships')}
                        className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors border border-gray-600"
                      >
                        Browse Plans
                      </button>
                    </div>
                  )}
                </div>

                {/* Credits Summary */}
                <div className="bg-gray-900 rounded border border-gray-700 p-4">
                  <h3 className="text-lg font-medium text-white mb-4">Credits</h3>
                  {creditsLoading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ) : creditsError ? (
                    <p className="text-gray-400 text-sm">Unable to load credits</p>
                  ) : creditBalance ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Total Credits</span>
                        <span className="text-white font-medium">{creditBalance.total_credits || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Remaining</span>
                        <span className="text-[#ffb800] font-medium">{creditBalance.remaining_credits || 0}</span>
                      </div>
                      {weeklyUsage && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Used This Week</span>
                            <span className="text-white">{weeklyUsage.credits_used || 0}</span>
                          </div>
                          {weeklyUsage.weekly_limit && (
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">Weekly Limit</span>
                              <span className="text-white">{weeklyUsage.weekly_limit}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-400 text-sm mb-3">No credits available</p>
                      <button
                        onClick={() => router.push('/allmemberships')}
                        className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors border border-gray-600"
                      >
                        Buy Credits
                      </button>
                    </div>
                  )}
                </div>

                {/* Activity Summary */}
                <div className="bg-gray-900 rounded border border-gray-700 p-4">
                  <h3 className="text-lg font-medium text-white mb-4">Activity</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Upcoming Events</span>
                      <span className="text-white">{filteredEvents.upcoming.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Upcoming Games</span>
                      <span className="text-white">{filteredGames.upcoming.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Upcoming Practices</span>
                      <span className="text-white">{filteredPractices.upcoming.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Calendar - Full Width Below */}
              <div className="bg-gray-900 rounded border border-gray-700 p-4">
                <h3 className="text-lg font-medium text-white mb-4">Calendar</h3>
                <div className="space-y-3">
                    {/* Current Month Header */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={goToPreviousMonth}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      <h4 className="text-sm font-medium text-white">
                        {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <button
                        onClick={goToNextMonth}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                    </div>

                    {/* Mini Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {/* Day headers */}
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-gray-400 font-medium py-1">
                          {day}
                        </div>
                      ))}

                      {/* Calendar days */}
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
                          const hasActivity = currentScheduleData.events.some(event =>
                            event.start_at && new Date(event.start_at).toDateString() === currentDate.toDateString()
                          ) || currentScheduleData.games.some(game =>
                            game.start_time && new Date(game.start_time).toDateString() === currentDate.toDateString()
                          ) || currentScheduleData.practices.some(practice =>
                            practice.start_time && new Date(practice.start_time).toDateString() === currentDate.toDateString()
                          );

                          days.push(
                            <div
                              key={i}
                              onClick={() => handleDateClick(currentDate)}
                              className={`text-center py-1 relative cursor-pointer ${
                                isCurrentMonth
                                  ? isToday
                                    ? 'bg-[#ffb800] text-black rounded font-bold'
                                    : hasActivity
                                      ? 'text-white hover:bg-gray-700 rounded'
                                      : 'text-white hover:bg-gray-800 rounded'
                                  : 'text-gray-600'
                              }`}
                            >
                              {currentDate.getDate()}
                              {hasActivity && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#ffb800] rounded-full"></div>
                              )}
                            </div>
                          );
                        }
                        return days;
                      })()}
                    </div>

                    {/* Next activities */}
                    <div className="pt-3 border-t border-gray-800">
                      <p className="text-xs text-gray-400 mb-2">Next activities:</p>
                      {currentScheduleData.events.length > 0 || currentScheduleData.games.length > 0 || currentScheduleData.practices.length > 0 ? (
                        <div className="space-y-1">
                          {[...currentScheduleData.events, ...currentScheduleData.games, ...currentScheduleData.practices]
                            .sort((a, b) => new Date(a.start_at || a.start_time || '').getTime() - new Date(b.start_time || b.start_at || '').getTime())
                            .slice(0, 2)
                            .map((activity, index) => {
                              const startTime = activity.start_at || activity.start_time;
                              return (
                                <div key={index} className="text-xs">
                                  <div className="text-white truncate">
                                    {'program' in activity ? activity.program?.name :
                                     'home_team_name' in activity ? `${activity.home_team_name} vs ${activity.away_team_name}` :
                                     'team_name' in activity ? `${activity.team_name} Practice` : 'Activity'}
                                  </div>
                                  <div className="text-gray-400">
                                    {startTime ? new Date(startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500">No upcoming activities</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          )}

          {activeTab === "membership" && (
            <div className="bg-gray-900 rounded border border-gray-700 p-4">
              <h3 className="text-lg font-medium text-white mb-4">Membership Details</h3>

              {membershipLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-16 bg-gray-700 rounded"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ) : membershipError ? (
                <div>
                  <div className="flex items-center text-red-400 mb-4">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{membershipError}</span>
                  </div>
                </div>
              ) : membership ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Membership Type</h4>
                      <p className="text-gray-300">{membership.membership_name || "Not available"}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Plan</h4>
                      <p className="text-gray-300">{membership.membership_plan_name || "Not available"}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Start Date</h4>
                      <p className="text-gray-300">{formatDate(membership.start_date)}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Renewal Date</h4>
                      <p className="text-gray-300">{formatDate(membership.renewal_date)}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Price</h4>
                      <p className="text-gray-300">{membership.price || "Not available"}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Status</h4>
                      <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                        membership.status === 'active'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-gray-900/30 text-gray-400'
                      }`}>
                        {membership.status?.toUpperCase() || 'UNKNOWN'}
                      </span>
                    </div>
                  </div>

                  {membership.membership_description && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                      <p className="text-gray-300">{membership.membership_description}</p>
                    </div>
                  )}

                  {membership.membership_benefits && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Benefits</h4>
                      <p className="text-gray-300">{membership.membership_benefits}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">No Active Membership</h4>
                  <p className="text-gray-400 mb-4">You don't have an active membership yet.</p>
                  <button
                    onClick={() => router.push('/allmemberships')}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors border border-gray-600"
                  >
                    Browse Memberships
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="bg-gray-900 rounded border border-gray-700 p-4">
              <h3 className="text-lg font-medium text-white mb-4">My Schedule</h3>

              {/* Schedule sub-tabs */}
              <div className="mb-4">
                <div className="flex space-x-1 bg-gray-800 rounded p-1">
                  <button
                    onClick={() => setScheduleTab("upcoming")}
                    className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                      scheduleTab === "upcoming"
                        ? "bg-[#ffb800] text-black"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    Upcoming ({filteredEvents.upcoming.length + filteredGames.upcoming.length + filteredPractices.upcoming.length})
                  </button>
                  <button
                    onClick={() => setScheduleTab("completed")}
                    className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                      scheduleTab === "completed"
                        ? "bg-[#ffb800] text-black"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    Completed ({filteredEvents.completed.length + filteredGames.completed.length + filteredPractices.completed.length})
                  </button>
                </div>
              </div>

              {scheduleLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-700 rounded"></div>
                  ))}
                </div>
              ) : scheduleError ? (
                <div>
                  <div className="flex items-center text-red-400 mb-4">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{scheduleError}</span>
                  </div>
                </div>
              ) : (currentScheduleData.events.length > 0 || currentScheduleData.games.length > 0 || currentScheduleData.practices.length > 0) ? (
                <div className="space-y-6">
                  {/* Events Section */}
                  {currentScheduleData.events.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-[#ffb800]" />
                        Events ({currentScheduleData.events.length})
                      </h4>
                      <div className="space-y-3">
                        {currentScheduleData.events.map((event, index) => (
                          <div key={event.id || index} className="p-3 bg-gray-800 border border-gray-700 rounded">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="text-md font-semibold text-white mb-2">
                                  {event.program?.name || "Event"}
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div className="flex items-center text-gray-300">
                                    <Clock className="h-4 w-4 mr-2 text-[#ffb800]" />
                                    <div>
                                      <p>{formatDate(event.start_at)}</p>
                                      <p>{formatTime(event.start_at)} - {formatTime(event.end_at)}</p>
                                    </div>
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center text-gray-300">
                                      <MapPin className="h-4 w-4 mr-2 text-[#ffb800]" />
                                      <div>
                                        <p>{event.location.name}</p>
                                        {event.location.address && (
                                          <p className="text-xs text-gray-400">{event.location.address}</p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {event.team && (
                                    <div className="flex items-center text-gray-300">
                                      <Users className="h-4 w-4 mr-2 text-[#ffb800]" />
                                      <p>{event.team.name}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Games Section */}
                  {currentScheduleData.games.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-[#ffb800]" />
                        Games ({currentScheduleData.games.length})
                      </h4>
                      <div className="space-y-3">
                        {currentScheduleData.games.map((game, index) => (
                          <div key={game.id || index} className="p-3 bg-gray-800 border border-gray-700 rounded">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="text-md font-semibold text-white mb-2">
                                  {game.home_team_name} vs {game.away_team_name}
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div className="flex items-center text-gray-300">
                                    <Clock className="h-4 w-4 mr-2 text-[#ffb800]" />
                                    <div>
                                      <p>{formatDate(game.start_time)}</p>
                                      <p>{formatTime(game.start_time)} - {formatTime(game.end_time)}</p>
                                    </div>
                                  </div>
                                  {game.location_name && (
                                    <div className="flex items-center text-gray-300">
                                      <MapPin className="h-4 w-4 mr-2 text-[#ffb800]" />
                                      <div>
                                        <p>{game.location_name}</p>
                                        {game.court_name && (
                                          <p className="text-xs text-gray-400">Court: {game.court_name}</p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex items-center text-gray-300">
                                    <span className="text-xs">Score: {game.home_score || 0} - {game.away_score || 0}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practices Section */}
                  {currentScheduleData.practices.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-[#ffb800]" />
                        Practices ({currentScheduleData.practices.length})
                      </h4>
                      <div className="space-y-3">
                        {currentScheduleData.practices.map((practice, index) => (
                          <div key={practice.id || index} className="p-3 bg-gray-800 border border-gray-700 rounded">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="text-md font-semibold text-white mb-2">
                                  {practice.team_name || "Team Practice"}
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div className="flex items-center text-gray-300">
                                    <Clock className="h-4 w-4 mr-2 text-[#ffb800]" />
                                    <div>
                                      <p>{formatDate(practice.start_time)}</p>
                                      <p>{formatTime(practice.start_time)} - {formatTime(practice.end_time)}</p>
                                    </div>
                                  </div>
                                  {practice.location_name && (
                                    <div className="flex items-center text-gray-300">
                                      <MapPin className="h-4 w-4 mr-2 text-[#ffb800]" />
                                      <div>
                                        <p>{practice.location_name}</p>
                                        {practice.court_name && (
                                          <p className="text-xs text-gray-400">Court: {practice.court_name}</p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {practice.booked_by_name && (
                                    <div className="flex items-center text-gray-300">
                                      <User className="h-4 w-4 mr-2 text-[#ffb800]" />
                                      <p>Booked by: {practice.booked_by_name}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">No Activities</h4>
                  <p className="text-gray-400 mb-4">You don't have any scheduled events, games, or practices yet.</p>
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
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
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
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent"
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
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent"
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
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeEditModal}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2 bg-[#ffb800] text-black font-medium rounded-lg hover:bg-[#e0a300] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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