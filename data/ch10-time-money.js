/* Chapter 10 — Time & Money · exam bank */
window.CH10_BANK = [
  { type: 'fill', q: '1 hour = ? minutes', answer: ['60'], explain: '1 hour = 60 minutes.' },
  { type: 'fill', q: '1 minute = ? seconds', answer: ['60'], explain: '1 minute = 60 seconds.' },
  { type: 'fill', q: '1 day = ? hours', answer: ['24'], explain: '24 hours in a day.' },
  { type: 'fill', q: '1 week = ? days', answer: ['7'], explain: '7 days in a week.' },
  { type: 'fill', q: '1 year = ? months', answer: ['12'], explain: '12 months in a year.' },
  { type: 'fill', q: '15:00 in 12-hour format = ? PM (just the number)', answer: ['3', '3 pm', '3pm', '3 p.m.'], explain: '15 − 12 = 3 → 3 PM.' },
  { type: 'fill', q: '20:30 in 12-hour format = ? PM', answer: ['8:30', '8:30 pm', '8:30pm'], explain: '20 − 12 = 8, so 8:30 PM.' },
  { type: 'fill', q: '9:00 AM in 24-hour format?', answer: ['9:00', '09:00'], explain: 'AM hours stay the same.' },
  { type: 'fill', q: '6:00 PM in 24-hour format?', answer: ['18:00'], explain: '6 + 12 = 18 → 18:00.' },
  { type: 'fill', q: 'How many hours from 9 AM to 5 PM?', answer: ['8', '8 hours'], explain: '5 PM = 17:00. 17 − 9 = 8 hours.' },
  { type: 'fill', q: 'How many minutes between 2:15 and 2:50?', answer: ['35', '35 minutes'], explain: '50 − 15 = 35 min.' },
  { type: 'fill', q: '1 h 45 min in minutes?', answer: ['105'], explain: '60 + 45 = 105 min.' },
  { type: 'fill', q: '90 minutes in hours and minutes?', answer: ['1 h 30 min', '1h 30min', '1 hour 30 minutes', '1:30'], explain: '90 = 60 + 30 → 1 h 30 min.' },
  { type: 'fill', q: 'A movie starts at 4:30 PM and lasts 2 h. End time?', answer: ['6:30 pm', '6:30pm', '6:30', '18:30'], explain: '4:30 + 2:00 = 6:30 PM.' },
  { type: 'mcq', q: 'How many days in February (non-leap year)?', options: ['28', '29', '30', '31'], answer: 0, explain: 'Feb has 28 days, 29 in a leap year.' },
  { type: 'mcq', q: 'Which months have 31 days? (most accurate)', options: ['Only Jan, Mar, May', 'Jan, Mar, May, Jul, Aug, Oct, Dec', 'All months', 'Only summer'], answer: 1, explain: '7 months have 31 days.' },
  // Money
  { type: 'fill', q: '1 BHD = ? fils', answer: ['1000', '1,000'], explain: 'In Bahrain, 1 BHD = 1,000 fils.' },
  { type: 'fill', q: '1 rupee = ? paise', answer: ['100'], explain: '1 ₹ = 100 paise.' },
  { type: 'fill', q: '500 fils = ? BHD (decimal)', answer: ['0.5', '.5', '0.500'], explain: '500 ÷ 1000 = 0.5 BHD.' },
  { type: 'fill', q: 'Crispin has BHD 2.500 + BHD 1.250 = ?', answer: ['3.75', '3.750', 'bhd 3.75'], explain: '2.500 + 1.250 = 3.750 BHD.' },
  { type: 'fill', q: 'A toy costs BHD 5.250. Crispin pays BHD 10. Change?', answer: ['4.75', '4.750', 'bhd 4.75'], explain: '10 − 5.250 = 4.750 BHD.' },
  { type: 'fill', q: 'A juice = ₹15. 4 juices = ?', answer: ['60', '₹60', 'rs 60'], explain: '15 × 4 = 60.' },
  { type: 'fill', q: 'Pen ₹8, book ₹25. Total?', answer: ['33', '₹33', 'rs 33'], explain: '8 + 25 = 33.' },
  { type: 'tf', q: '1 hour and 60 minutes are the same.', answer: 0, explain: 'True!' },
  { type: 'tf', q: '13:00 is the same as 3:00 PM.', answer: 1, explain: 'False — 13:00 = 1 PM, not 3 PM.' }
];
