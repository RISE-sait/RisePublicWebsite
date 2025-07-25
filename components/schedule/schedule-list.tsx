import React, { useMemo } from "react";
import { MapPin, Calendar, Clock, Users, Zap, Trophy, Target, ChevronRight } from 'lucide-react';
import { EmptyFeedback } from '@/components/ui/feedback';

interface EventItem {
  id: string;
  program_name: string;
  location_name: string;
  start_time: string;
  end_time?: string | null;
  description?: string;
  program_type?: string;
  is_recurring?: boolean;
  recurring_pattern?: string;
}

interface GroupedEvents {
  [date: string]: EventItem[];
}

export function ScheduleList({ events, selectedDate }: { events: EventItem[]; selectedDate?: Date }) {
  const processedEvents = useMemo(() => {
    if (!events.length) return {};

    // Group by date (no more filtering recurring events)
    const grouped: GroupedEvents = {};
    events.forEach(event => {
      const date = new Date(event.start_time).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });

    // Sort events within each day by time
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => 
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );
    });

    return grouped;
  }, [events]);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "TODAY";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "TOMORROW";
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      }).toUpperCase();
    }
  };

  const isToday = (dateString: string) => {
    return new Date(dateString).toDateString() === new Date().toDateString();
  };

  const sortedDates = Object.keys(processedEvents).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  // If selectedDate is provided and no events for that date, show empty feedback
  if (selectedDate) {
    const selectedDateString = selectedDate.toDateString();
    const hasEventsForDate = processedEvents[selectedDateString]?.length > 0;
    
    if (!hasEventsForDate) {
      return <EmptyFeedback selectedDate={selectedDate} type="no-events" />;
    }
    
    // Show only events for selected date
    const dayEvents = processedEvents[selectedDateString] || [];
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-[#ffb800] to-[#ff9500] rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">
              {formatDate(selectedDateString)}
            </h2>
          </div>
          <p className="text-gray-400 ml-7">{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''} scheduled</p>
        </div>
        
        <div className="space-y-4">
          {dayEvents.map((event, index) => (
            <EventCard key={`${event.id}-${index}`} event={event} index={index} />
          ))}
        </div>
      </div>
    );
  }

  // Show all events grouped by date
  if (!sortedDates.length) {
    return <EmptyFeedback selectedDate={new Date()} type="general" />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-[#ffb800] to-[#ff9500] rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">SCHEDULE</h2>
          </div>
          <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full border border-gray-700">
            <Calendar className="h-4 w-4 text-[#ffb800]" />
            <span className="text-sm font-semibold text-white">
              {Object.values(processedEvents).flat().length} EVENTS
            </span>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-[#ffb800] via-[#ff9500] to-transparent"></div>
      </div>

      {/* Events by day */}
      <div className="space-y-8">
        {sortedDates.map(date => {
          const dayEvents = processedEvents[date];
          const dateObj = new Date(date);
          
          return (
            <div key={date} className="relative">
              {/* Date header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border-2 ${
                  isToday(date) 
                    ? 'bg-gradient-to-r from-[#ffb800] to-[#ff9500] text-black border-[#ffb800]' 
                    : 'bg-gray-900 text-white border-gray-700'
                }`}>
                  <Calendar className="h-5 w-5" />
                  <span className="font-bold text-lg">{formatDate(date)}</span>
                </div>
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="text-sm text-gray-400 font-semibold">
                  {dayEvents.length} EVENT{dayEvents.length !== 1 ? 'S' : ''}
                </span>
              </div>

              {/* Events for this day */}
              <div className="space-y-4 ml-4">
                {dayEvents.map((event, index) => (
                  <EventCard key={`${event.id}-${index}`} event={event} index={index} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const getEventTypeIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'tournament':
        return <Trophy className="h-4 w-4" />;
      case 'tryouts':
      case 'assessment':
        return <Target className="h-4 w-4" />;
      case 'course':
      case 'training':
        return <Zap className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'tournament':
        return 'from-[#ffb800] to-[#ff9500]';
      case 'tryouts':
      case 'assessment':
        return 'from-[#ff9500] to-[#ff7700]';
      case 'course':
      case 'training':
        return 'from-[#ffd700] to-[#ffb800]';
      case 'game':
        return 'from-[#ffb800] to-[#ff9500]';
      default:
        return 'from-[#ffcc00] to-[#ffb800]';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative bg-black border border-gray-800 rounded-xl overflow-hidden">
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getEventTypeColor(event.program_type)}`}></div>

      {/* Recurring indicator */}
      {event.is_recurring && (
        <div className="absolute top-4 right-4 bg-gray-800 text-[#ffb800] px-2 py-1 rounded-full text-xs font-bold border border-gray-700">
          RECURRING
        </div>
      )}

      <div className="p-6 pl-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getEventTypeColor(event.program_type)}`}>
                {getEventTypeIcon(event.program_type)}
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">
                  {event.program_name}
                </h3>
                {event.program_type && (
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {event.program_type}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-3 text-gray-300">
            <div className="p-2 bg-gray-900 rounded-lg border border-gray-700">
              <Clock className="h-4 w-4 text-[#ffb800]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {formatTime(event.start_time)}
                {event.end_time && ` - ${formatTime(event.end_time)}`}
              </p>
              <p className="text-xs text-gray-400">Duration</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <div className="p-2 bg-gray-900 rounded-lg border border-gray-700">
              <MapPin className="h-4 w-4 text-[#ffb800]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{event.location_name}</p>
              <p className="text-xs text-gray-400">Location</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-300 leading-relaxed">{event.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
