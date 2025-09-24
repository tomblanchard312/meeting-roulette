import React, { useState, useRef } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import calendarImage from './assets/calendar.png';

const COLORS = [
  { primary: "#667eea", secondary: "#764ba2" },
  { primary: "#f093fb", secondary: "#f5576c" },
  { primary: "#4facfe", secondary: "#00f2fe" },
  { primary: "#43e97b", secondary: "#38f9d7" },
  { primary: "#fa709a", secondary: "#fee140" },
  { primary: "#a8edea", secondary: "#fed6e3" },
  { primary: "#ff9a9e", secondary: "#fecfef" },
  { primary: "#ffecd2", secondary: "#fcb69f" },
  { primary: "#a18cd1", secondary: "#fbc2eb" },
  { primary: "#fad0c4", secondary: "#ffd1ff" },
  { primary: "#ff8a80", secondary: "#ff80ab" },
  { primary: "#84fab0", secondary: "#8fd3f4" }
];

const MeetingRoulette = () => {
  const [meetings, setMeetings] = useState([
    { id: 1, name: "Team Standup" },
    { id: 2, name: "Project Review" },
    { id: 3, name: "Client Meeting" },
    { id: 4, name: "Planning Session" }
  ]);
  const [newMeeting, setNewMeeting] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const wheelRef = useRef(null);

  const getSegmentPath = (startAngle, endAngle, innerRadius = 20) => {
    const center = 100;
    const radius = 95;
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const innerStart = polarToCartesian(center, center, innerRadius, endAngle);
    const innerEnd = polarToCartesian(center, center, innerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const innerLargeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, innerLargeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const spinWheel = () => {
    if (meetings.length === 0) return;
    setSpinning(true);
    setResult(null);
    
    // More realistic spinning with variable speed
    const minSpins = 8;
    const extraSpins = Math.random() * 4;
    const totalSpins = minSpins + extraSpins;
    const finalAngle = Math.floor(Math.random() * 360);
    const spinAngle = totalSpins * 360 + finalAngle;
    
    const spinAnimation = [
      { 
        transform: `rotate(${wheelRotation}deg)`,
        filter: 'brightness(1)'
      },
      { 
        transform: `rotate(${wheelRotation + spinAngle * 0.3}deg)`,
        filter: 'brightness(1.1)'
      },
      { 
        transform: `rotate(${wheelRotation + spinAngle * 0.7}deg)`,
        filter: 'brightness(1.05)'
      },
      { 
        transform: `rotate(${wheelRotation + spinAngle}deg)`,
        filter: 'brightness(1)'
      }
    ];
    
    const spinTiming = {
      duration: 4000 + (extraSpins * 800),
      iterations: 1,
      easing: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)'
    };

    if (wheelRef.current) {
      wheelRef.current.animate(spinAnimation, spinTiming);
    }

    setTimeout(() => {
      setSpinning(false);
      const newRotation = (wheelRotation + spinAngle) % 360;
      setWheelRotation(newRotation);
      
      // Calculate which segment the pointer is pointing to
      const normalizedAngle = (360 - newRotation) % 360;
      const segmentAngle = 360 / meetings.length;
      const selectedIndex = Math.floor(normalizedAngle / segmentAngle) % meetings.length;
      setResult(meetings[selectedIndex]);
    }, spinTiming.duration);
  };

  const addMeeting = () => {
    if (newMeeting.trim() !== '') {
      setMeetings([...meetings, { id: Date.now(), name: newMeeting.trim() }]);
      setNewMeeting('');
    }
  };

  const removeMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Introduction Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🎯 Meeting Roulette
            </h1>
            <p className="text-xl text-slate-600 mb-8">The fun way to decide which meeting to attend!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <h2 className="text-2xl font-bold text-red-800 mb-3 flex items-center">
                  😵‍💫 Does your calendar look like this?
                </h2>
                <p className="text-red-700 mb-4">
                  Overlapping meetings, conflicting schedules, and the constant struggle to decide which meeting is most important...
                </p>
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <img 
                    src={calendarImage} 
                    alt="Overlapping calendar meetings" 
                    className="w-full rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h2 className="text-2xl font-bold text-blue-800 mb-3 flex items-center">
                  🤔 How do you choose?
                </h2>
                <p className="text-blue-700 mb-4">
                  When you have multiple meetings at the same time, how do you decide which one to attend? 
                  The pressure of making the "right" choice can be overwhelming.
                </p>
                <ul className="text-blue-700 space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Which meeting is more important?
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Who will be more upset if you miss it?
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    What if you make the wrong choice?
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h2 className="text-2xl font-bold text-green-800 mb-3 flex items-center">
                  🎉 Great news! This tool can help!
                </h2>
                <p className="text-green-700">
                  Meeting Roulette takes the stress out of decision-making by randomly selecting which meeting to attend. 
                  It's fair, unbiased, and surprisingly effective at resolving scheduling conflicts!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application */}
      <div className="max-w-6xl mx-auto">
        <Card className="w-full bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🎲 Ready to Spin?
            </CardTitle>
            <p className="text-slate-600 mt-2">Add your meetings below and let fate decide!</p>
          </CardHeader>
        <CardContent className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-80 h-80 mb-6">
              {/* Wheel Container with Shadow */}
              <div className="absolute inset-0 rounded-full shadow-2xl bg-gradient-to-br from-slate-200 to-slate-300 transform rotate-3"></div>
              
              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
                {/* Gradient Definitions */}
                <defs>
                  {meetings.map((_, index) => {
                    const color = COLORS[index % COLORS.length];
                    return (
                      <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color.primary} />
                        <stop offset="100%" stopColor={color.secondary} />
                      </linearGradient>
                    );
                  })}
                  <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f1f5f9" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Wheel Segments */}
                <g ref={wheelRef} style={{ transformOrigin: 'center', transform: `rotate(${wheelRotation}deg)` }}>
                  {meetings.map((meeting, index) => {
                    const startAngle = (index / meetings.length) * 360;
                    const endAngle = ((index + 1) / meetings.length) * 360;
                    const midAngle = (startAngle + endAngle) / 2;
                    const textRadius = 60;
                    const textPos = polarToCartesian(100, 100, textRadius, midAngle);
                    
                    return (
                      <g key={meeting.id}>
                        <path
                          d={getSegmentPath(startAngle, endAngle)}
                          fill={`url(#gradient-${index})`}
                          stroke="white"
                          strokeWidth="2"
                          filter="url(#glow)"
                        />
                        <text
                          x={textPos.x}
                          y={textPos.y}
                          fontSize="10"
                          fontWeight="600"
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle}, ${textPos.x}, ${textPos.y})`}
                          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                        >
                          {meeting.name}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Outer Ring */}
                <circle cx="100" cy="100" r="95" fill="none" stroke="white" strokeWidth="4" />
                <circle cx="100" cy="100" r="95" fill="none" stroke="url(#centerGradient)" strokeWidth="2" />

                {/* Center Hub */}
                <circle cx="100" cy="100" r="20" fill="url(#centerGradient)" stroke="white" strokeWidth="3" />
                <circle cx="100" cy="100" r="15" fill="none" stroke="#e2e8f0" strokeWidth="1" />

                {/* Pointer */}
                <g>
                  <path d="M100,5 L110,25 L90,25 Z" fill="#1e293b" stroke="white" strokeWidth="2" />
                  <circle cx="100" cy="100" r="8" fill="#1e293b" stroke="white" strokeWidth="2" />
                  <circle cx="100" cy="100" r="4" fill="white" />
                </g>
              </svg>
            </div>
            
            <Button 
              onClick={spinWheel} 
              disabled={spinning || meetings.length === 0} 
              className="mb-6 px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {spinning ? "🎯 Spinning..." : "🎯 Spin the Wheel"}
            </Button>
            
            {result && (
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <p className="text-xl font-bold text-green-800 mb-1">🎉 Selected Meeting:</p>
                <p className="text-2xl font-extrabold text-green-900">{result.name}</p>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                📝 Manage Meetings
              </h3>
              
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newMeeting}
                    onChange={(e) => setNewMeeting(e.target.value)}
                    placeholder="Enter meeting name..."
                    className="flex-1 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === 'Enter' && addMeeting()}
                  />
                  <Button 
                    onClick={addMeeting} 
                    className="px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    ➕ Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  Current Meetings ({meetings.length})
                </h4>
                {meetings.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <p className="text-lg">🎯 No meetings yet!</p>
                    <p className="text-sm">Add some meetings to get started.</p>
                  </div>
                ) : (
                  meetings.map((meeting, index) => {
                    const color = COLORS[index % COLORS.length];
                    return (
                      <div 
                        key={meeting.id} 
                        className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})` }}
                          ></div>
                          <span className="text-slate-800 font-medium">{meeting.name}</span>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeMeeting(meeting.id)}
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          🗑️
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default MeetingRoulette;