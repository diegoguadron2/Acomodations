import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GetAcc } from '../auth/GetAcc';
import { GetBook } from '../auth/GetBook';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [accommodations, setAccommodations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const bookingStates = ['CONFIRMED', 'PENDING', 'CANCELLED'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch data from endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Llamar a los endpoints importados
        const [accData, bookData] = await Promise.all([
          GetAcc(),
          GetBook()
        ]);
        
        setAccommodations(accData);
        setBookings(bookData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Filter bookings based on selected filters
  const filteredBookings = bookings.filter(booking => {
    const matchesAccommodation = selectedAccommodation === 'all' || 
      booking.id === selectedAccommodation;
    const matchesState = selectedState === 'all' || 
      booking.status === selectedState;
    const matchesSearch = searchTerm === '' || 
      booking.user?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAccommodation && matchesState && matchesSearch;
  });

  const renderBookingItems = (day, month, year) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const dayBookings = filteredBookings.filter(booking => {
      const bookingDate = booking.check_in_date?.split('T')[0];
      return bookingDate === dateStr;
    });

    return (
      <div className="overflow-y-auto max-h-16">
        {dayBookings.map(booking => (
          <div 
            key={booking.id}
            className={`text-xs p-1 mb-1 rounded truncate ${
              booking.status === 'CONFIRMED' ? 'bg-green-100 dark:bg-green-900' :
              booking.status === 'PENDING' ? 'bg-yellow-100 dark:bg-yellow-900' :
              'bg-red-100 dark:bg-red-900'
            }`}
            title={`${booking.user} - ${booking.status}`}
          >
            {booking.user}
          </div>
        ))}
      </div>
    );
  };

  const renderCalendarGrid = () => {
    if (loading) return <div className="col-span-7 p-4 text-center">Loading calendar...</div>;
    if (error) return <div className="col-span-7 p-4 text-center text-red-500">Error: {error.message || error}</div>;

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
          {renderBookingItems(day, month, year)}
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
      {/* Header: Month Navigation*/}
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
  
      </header>

      {/* Filters: Accommodations, State, and Guest Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
        <div>
          <label htmlFor="accommodations" className="block text-sm font-medium mb-1">Accommodations</label>
          <select 
            id="accommodations" 
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            value={selectedAccommodation}
            onChange={(e) => setSelectedAccommodation(e.target.value)}
          >
            <option value="all">All Accommodations</option>
            {accommodations.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
          <select 
            id="state" 
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="all">All States</option>
            {bookingStates.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="guest-search" className="block text-sm font-medium mb-1">Search guests</label>
          <input 
            type="search" 
            id="guest-search" 
            placeholder="Type a name..." 
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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