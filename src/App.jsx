import React, { useState, useRef } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';

const COLORS = [
  "#3f297e", "#175fa9", "#169ed8", "#239b63",
  "#64b031", "#efe61f", "#f7a416", "#e6471d",
  "#dc0936", "#e5177b", "#be1180", "#871f7f"
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

  const getSegmentPath = (startAngle, endAngle) => {
    const center = 100;
    const radius = 95;
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", center, center,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
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
    const minSpins = 5;
    const extraSpins = Math.random() * 3;
    const totalSpins = minSpins + extraSpins;
    const spinAngle = totalSpins * 360 + Math.floor(Math.random() * 360);
    
    const spinAnimation = [
      { transform: `rotate(${wheelRotation}deg)` },
      { transform: `rotate(${wheelRotation + spinAngle}deg)` }
    ];
    
    const spinTiming = {
      duration: 5000 + (extraSpins * 1000),
      iterations: 1,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    };

    wheelRef.current.animate(spinAnimation, spinTiming);

    setTimeout(() => {
      setSpinning(false);
      const newRotation = (wheelRotation + spinAngle) % 360;
      setWheelRotation(newRotation);
      const normalizedAngle = 360 - newRotation;
      const segmentAngle = 360 / meetings.length;
      const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
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

  const outerPoints = Array.from({ length: 72 }, (_, i) => {
    const angle = (i / 72) * 360;
    const { x, y } = polarToCartesian(100, 100, 98, angle);
    return <circle key={`point-${i}`} cx={x} cy={y} r="1" fill="black" />;
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">Meeting Roulette</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-64 h-64 mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <g ref={wheelRef} style={{ transformOrigin: 'center', transform: `rotate(${wheelRotation}deg)` }}>
                  {meetings.map((meeting, index) => {
                    const startAngle = (index / meetings.length) * 360;
                    const endAngle = ((index + 1) / meetings.length) * 360;
                    return (
                      <g key={meeting.id}>
                        <path
                          d={getSegmentPath(startAngle, endAngle)}
                          fill={COLORS[index % COLORS.length]}
                        />
                        <text
                          x="100"
                          y="100"
                          fontSize="8"
                          fill="white"
                          textAnchor="middle"
                          transform={`rotate(${(startAngle + endAngle) / 2}, 100, 100) translate(0, -75)`}
                        >
                          {meeting.name}
                        </text>
                      </g>
                    );
                  })}
                  {outerPoints}
                </g>
                <circle cx="100" cy="100" r="99" fill="none" stroke="black" strokeWidth="2" />
                <path d="M100,1 L105,20 L95,20 Z" fill="black" />
                <circle cx="100" cy="100" r="5" fill="black" />
              </svg>
            </div>
            <Button onClick={spinWheel} disabled={spinning || meetings.length === 0} className="mb-4">
              {spinning ? "Spinning..." : "Spin the Wheel"}
            </Button>
            {result && (
              <p className="text-lg font-semibold text-gray-800">
                Selected meeting: {result.name}
              </p>
            )}
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <Input
                type="text"
                value={newMeeting}
                onChange={(e) => setNewMeeting(e.target.value)}
                placeholder="Enter meeting name"
                className="mb-2"
              />
              <Button onClick={addMeeting} className="w-full">Add Meeting</Button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {meetings.map((meeting) => (
                <li key={meeting.id} className="flex justify-between items-center">
                  <span className="text-gray-800">{meeting.name}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeMeeting(meeting.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingRoulette;