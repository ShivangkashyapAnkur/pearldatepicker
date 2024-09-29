import { useState } from 'react';
import { useStore } from '../store/useStore'; // Zustand store
import { Calendar } from './Calendar'; // Calendar component

const RecurringDatePicker = () => {
  const [recurrenceType, setRecurrenceType] = useState('daily');
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate } = useStore();

  const handleRecurrenceChange = (e) => setRecurrenceType(e.target.value);
  const handleIntervalChange = (e) => setInterval(e.target.value);
  
  const recurrenceOptions = ['daily', 'weekly', 'monthly', 'yearly'];

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <label className="block mb-2">Start Date</label>
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
        className="mb-4 p-2 border rounded-md w-full"
      />

      <label className="block mb-2">End Date (Optional)</label>
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
        className="mb-4 p-2 border rounded-md w-full"
      />

      <label className="block mb-2">Recurrence Pattern</label>
      <select 
        value={recurrenceType} 
        onChange={handleRecurrenceChange} 
        className="mb-4 p-2 border rounded-md w-full"
      >
        {recurrenceOptions.map(option => (
          <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
        ))}
      </select>

      <label className="block mb-2">Repeat Every</label>
      <input 
        type="number" 
        value={interval} 
        onChange={handleIntervalChange} 
        className="mb-4 p-2 border rounded-md w-full"
      />

      {recurrenceType === 'weekly' && (
        <div>
          <label className="block mb-2">Select Days of the Week</label>
          <div className="flex space-x-2">
            {/* Checkboxes for days */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day}>
                <input 
                  type="checkbox" 
                  checked={selectedDays.includes(day)} 
                  onChange={() => toggleDay(day)} 
                /> {day}
              </div>
            ))}
          </div>
        </div>
      )}

      <Calendar recurrenceType={recurrenceType} interval={interval} selectedDays={selectedDays} />
    </div>
  );
};

const toggleDay = (day) => {
  setSelectedDays((prev) => 
    prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
  );
}

export default RecurringDatePicker;
