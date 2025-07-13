import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// --- Mock Data (replace with your actual data) ---
const accommodations = ['Cozy Cottage', 'Beachfront Villa', 'Mountain Lodge', 'Urban Apartment'];
const bookingStates = ['Confirmed', 'Pending', 'Cancelled'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays = [];

    // Days from the previous month to pad the grid
    for (let i = firstDayOfMonth; i > 0; i--) {
      calendarDays.push(
        <div key={`prev-${i}`} className="p-2 h-24 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          {daysInPrevMonth - i + 1}
        </div>
      );
    }

    // Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      calendarDays.push(
        <div key={day} className={`p-2 h-24 border border-gray-200 dark:border-gray-700 relative ${isToday ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`}>
          <span className={`absolute top-2 right-2 ${isToday ? 'text-blue-600 dark:text-blue-300 font-bold' : ''}`}>{day}</span>
          {/* Booking data would be mapped and rendered here */}
        </div>
      );
    }

    // Days from the next month to pad the grid
    const totalCells = calendarDays.length;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push(
        <div key={`next-${i}`} className="p-2 h-24 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="p-5 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col">
      {/* Header: Month Navigation and Booking Button */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold w-40 text-center">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FiChevronRight className="h-6 w-6" />
          </button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors">
          Book new reservation
        </button>
      </header>

      {/* Filters: Accommodations, State, and Guest Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
        <div>
          <label htmlFor="accommodations" className="block text-sm font-medium mb-1">Accommodations</label>
          <select id="accommodations" className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500">
            {accommodations.map(acc => <option key={acc}>{acc}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
          <select id="state" className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500">
            {bookingStates.map(state => <option key={state}>{state}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="guest-search" className="block text-sm font-medium mb-1">Search guests</label>
          <input type="search" id="guest-search" placeholder="Type a name..." className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="grid grid-cols-7 text-center font-semibold">
          {weekdays.map(day => <div key={day} className="py-2 border-b border-gray-200 dark:border-gray-700">{day}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {renderCalendarGrid()}
        </div>
      </div>
    </div>
  );
}
