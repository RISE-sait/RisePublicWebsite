import { Calendar, Clock, Plus, Search } from 'lucide-react'

interface EmptyFeedbackProps {
  selectedDate: Date;
  type?: "no-events" | "no-games" | "no-results" | "general";
  title?: string;
  message?: string;
  showActions?: boolean;
  compact?: boolean; // 👈 Add this
}


export function EmptyFeedback({ 
  selectedDate, 
  type = "no-events",
  title,
  message,
  showActions = true,
  compact = false // ✅ default to false
}: EmptyFeedbackProps)
 {
  const fallbackDate = selectedDate ? selectedDate.toDateString() : "this date";
  
  const getContent = () => {
    switch (type) {
      case "no-games":
        return {
          icon: <Calendar className="h-12 w-12 text-[#ffb800]" />,
          title: title || "No Games Scheduled",
          message: message || `No games are scheduled for ${fallbackDate}. Check back later or browse other dates.`,
          suggestions: ["Browse upcoming games", "Check tournament schedule"]
        }
      case "no-results":
        return {
          icon: <Search className="h-12 w-12 text-[#ffb800]" />,
          title: title || "No Results Found",
          message: message || "No events match your current filter. Try selecting a different date or filter option.",
          suggestions: ["Clear filters", "Try different dates"]
        }
      case "general":
        return {
          icon: <Clock className="h-12 w-12 text-[#ffb800]" />,
          title: title || "Nothing Scheduled",
          message: message || "This date is currently free of scheduled activities.",
          suggestions: ["View upcoming events", "Check other dates"]
        }
      default:
        return {
          icon: <Calendar className="h-12 w-12 text-[#ffb800]" />,
          title: title || "No Events Today",
          message: message || `No events are scheduled for ${fallbackDate}. This could be a perfect day to plan something new!`,
          suggestions: ["Browse upcoming events", "Check course schedules", "View tournament dates"]
        }
    }
  }

  const content = getContent()

  return (
    <div className={compact 
    ? "flex flex-col items-center justify-center py-6 px-4 text-center text-sm" 
    : "flex flex-col items-center justify-center py-12 px-6 text-center"
    }>
      {/* Icon with glow effect */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#ffb800]/20 rounded-full blur-xl"></div>
        <div className="relative bg-gray-900 p-6 rounded-full border border-gray-700">
          {content.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className={compact 
        ? "text-base font-semibold text-white mb-2" 
        : "text-xl font-bold text-white mb-3"
        }>
        {content.title}
        </h3>

        <p className={compact 
        ? "text-gray-300 mb-4 max-w-sm leading-snug" 
        : "text-gray-300 mb-6 max-w-md leading-relaxed"
        }>
        {content.message}
        </p>

        {selectedDate && (
        <div className={compact 
            ? "bg-gray-800 border border-gray-700 rounded px-3 py-1.5 mb-4 text-xs"
            : "bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-6"
        }>
            <span className="text-[#ffb800] font-semibold">
            Selected Date: {selectedDate.toDateString()}
            </span>
        </div>
        
        )}




    {!compact && (
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1"></div>
          <div className="w-2 h-2 bg-[#ffb800] rounded-full"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1"></div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ffb800] to-[#ff9500] rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-black" />
            </div>
            <span className="text-white font-semibold">Schedule Overview</span>
          </div>
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            Scroll to the calendar below to browse other dates or check back later for new events and programs.
          </p>
        </div>
      </div>
    )}

  </div> // 
); 
}        


