import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface ScheduleItem {
  id: string;
  courseCode: string;
  courseName: string;
  lecturer: string;
  room: string;
  startTime: string;
  endTime: string;
  day: number; // 0 = Sunday, 1 = Monday, etc.
  color: string;
}

export function Schedule() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week');

  // Mock schedule data
  const scheduleData: ScheduleItem[] = [
    {
      id: '1',
      courseCode: 'AGR301',
      courseName: 'Teknologi Pengolahan Pangan',
      lecturer: 'Prof. Ahmad Rahman',
      room: 'Lab Teknologi',
      startTime: '08:00',
      endTime: '10:30',
      day: 1, // Monday
      color: 'bg-blue-500'
    },
    {
      id: '2',
      courseCode: 'AGR302',
      courseName: 'Fisiologi Tumbuhan Lanjut',
      lecturer: 'Dr. Siti Aminah',
      room: 'Ruang 201',
      startTime: '10:30',
      endTime: '12:00',
      day: 1, // Monday
      color: 'bg-green-500'
    },
    {
      id: '3',
      courseCode: 'AGR303',
      courseName: 'Genetika Molekuler',
      lecturer: 'Dr. Budi Santoso',
      room: 'Lab Biologi',
      startTime: '13:00',
      endTime: '15:30',
      day: 2, // Tuesday
      color: 'bg-purple-500'
    },
    {
      id: '4',
      courseCode: 'AGR304',
      courseName: 'Bioteknologi Pertanian',
      lecturer: 'Prof. Maria Dewi',
      room: 'Lab Biotek',
      startTime: '08:00',
      endTime: '10:30',
      day: 3, // Wednesday
      color: 'bg-orange-500'
    },
    {
      id: '5',
      courseCode: 'AGR305',
      courseName: 'Manajemen Agribisnis',
      lecturer: 'Dr. Eko Prasetyo',
      room: 'Ruang 301',
      startTime: '13:00',
      endTime: '15:30',
      day: 4, // Thursday
      color: 'bg-red-500'
    },
    {
      id: '6',
      courseCode: 'AGR306',
      courseName: 'Praktikum Teknologi Pangan',
      lecturer: 'Prof. Ahmad Rahman',
      room: 'Lab Teknologi',
      startTime: '08:00',
      endTime: '11:00',
      day: 5, // Friday
      color: 'bg-indigo-500'
    }
  ];

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(diff + i);
      week.push(weekDate);
    }
    
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const getScheduleForDay = (dayIndex: number) => {
    return scheduleData.filter(item => item.day === dayIndex);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-responsive animate-fade-in">
      {/* Header */}
      <div className="flex-responsive justify-between items-start md:items-center">
        <div>
          <h1 className="text-responsive-lg font-bold text-gray-900">Jadwal Kuliah</h1>
          <p className="text-gray-600 mt-1">Jadwal perkuliahan semester berjalan</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                viewMode === 'week' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Daftar
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'week' ? (
        <>
          {/* Week Navigation */}
          <div className="card">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  {weekDates[0].toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} - {' '}
                  {weekDates[6].toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
              </div>
              
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Weekly Schedule Grid - Desktop */}
          <div className="card overflow-x-auto desktop-table">
            <div className="min-w-full">
              <div className="grid grid-cols-8 gap-px bg-gray-200">
                {/* Time column header */}
                <div className="bg-gray-50 p-4 font-semibold text-gray-900 text-center">
                  Waktu
                </div>
                
                {/* Day headers */}
                {weekDates.map((date, index) => (
                  <div
                    key={index}
                    className={`bg-gray-50 p-4 text-center ${
                      isToday(date) ? 'bg-primary-50 border-primary-200' : ''
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{days[index]}</div>
                    <div className={`text-sm ${isToday(date) ? 'text-primary-600 font-semibold' : 'text-gray-600'}`}>
                      {date.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule grid */}
              <div className="grid grid-cols-8 gap-px bg-gray-200">
                {timeSlots.map((time, timeIndex) => (
                  <React.Fragment key={timeIndex}>
                    {/* Time slot */}
                    <div className="bg-white p-2 text-center text-sm text-gray-600 border-r">
                      {time}
                    </div>
                    
                    {/* Day columns */}
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                      const daySchedule = getScheduleForDay(dayIndex);
                      const currentTimeSlot = daySchedule.find(item => 
                        item.startTime <= time && item.endTime > time
                      );
                      
                      return (
                        <div
                          key={`${timeIndex}-${dayIndex}`}
                          className={`bg-white p-2 min-h-16 ${
                            isToday(weekDates[dayIndex]) ? 'bg-primary-25' : ''
                          }`}
                        >
                          {currentTimeSlot && currentTimeSlot.startTime === time && (
                            <div className={`${currentTimeSlot.color} text-white p-2 rounded-lg text-xs`}>
                              <div className="font-semibold">{currentTimeSlot.courseCode}</div>
                              <div className="truncate">{currentTimeSlot.courseName}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                <span>{currentTimeSlot.room}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Schedule - Mobile Cards */}
          <div className="mobile-card space-y-4">
            {days.slice(1, 6).map((day, dayIndex) => {
              const daySchedule = getScheduleForDay(dayIndex + 1);
              const currentDate = weekDates[dayIndex + 1];
              
              return (
                <div key={dayIndex} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-500" />
                      {day}
                    </h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      isToday(currentDate) ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {currentDate.getDate()}
                    </span>
                  </div>
                  
                  {daySchedule.length > 0 ? (
                    <div className="space-y-3">
                      {daySchedule.map((item) => (
                        <div key={item.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-12 ${item.color} rounded-l-lg mr-3 flex-shrink-0`}></div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{item.courseName}</h4>
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                                {item.courseCode}
                              </span>
                            </div>
                            
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTime(item.startTime)} - {formatTime(item.endTime)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{item.room}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{item.lecturer}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Tidak ada jadwal kuliah</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* List View */
        <div className="space-y-4">
          {days.slice(1, 6).map((day, dayIndex) => {
            const daySchedule = getScheduleForDay(dayIndex + 1);
            
            return (
              <div key={dayIndex} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  {day}
                </h3>
                
                {daySchedule.length > 0 ? (
                  <div className="space-y-3">
                    {daySchedule.map((item) => (
                      <div key={item.id} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className={`w-3 sm:w-4 h-12 sm:h-16 ${item.color} rounded-l-lg mr-3 sm:mr-4`}></div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{item.courseName}</h4>
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full w-fit">
                              {item.courseCode}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(item.startTime)} - {formatTime(item.endTime)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{item.room}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{item.lecturer}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Tidak ada jadwal kuliah pada hari {day.toLowerCase()}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Summary */}
      <div className="grid-responsive-2">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Jadwal</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Mata Kuliah</span>
              <span className="font-semibold text-gray-900">{scheduleData.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hari Kuliah</span>
              <span className="font-semibold text-gray-900">5 hari</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jam Kuliah/Minggu</span>
              <span className="font-semibold text-gray-900">
                {scheduleData.reduce((total, item) => {
                  const start = parseInt(item.startTime.split(':')[0]);
                  const end = parseInt(item.endTime.split(':')[0]);
                  return total + (end - start);
                }, 0)} jam
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dosen Pengampu</h3>
          
          <div className="space-y-2">
            {Array.from(new Set(scheduleData.map(item => item.lecturer))).map((lecturer, index) => (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-gray-900 text-sm sm:text-base">{lecturer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}