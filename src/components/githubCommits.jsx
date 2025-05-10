import React, { useState, useEffect } from 'react';

const GitHubCommitCalendar = ({ username, repo }) => {
  const [commitData, setCommitData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo}/commits?per_page=100`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch commits');
        }

        const commits = await response.json();
        const commitGroupedByDate = groupCommitsByDate(commits);
        setCommitData(commitGroupedByDate);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCommits();
  }, [username, repo]);

  const groupCommitsByDate = (commits) => {
    const grouped = {};

    commits.forEach((commit) => {
      const date = commit.commit.committer.date.split('T')[0]; // Extract the date (YYYY-MM-DD)
      if (!grouped[date]) {
        grouped[date] = 1;
      } else {
        grouped[date] += 1;
      }
    });

    return grouped;
  };

  const renderCalendar = () => {
    //console.log(commitData);
    //get currentDate
    const nowDate = new Date();
    // start date is a year before
    const startDate = new Date();
    startDate.setFullYear(nowDate.getFullYear() - 1);
    //console.log(startDate.toLocaleDateString());
    const year = startDate.getFullYear(); // Get the full last year
    // fix to 365 days
    const totalDays = 365;

    const calendarDays = [];

    for (let i = 1; i <= totalDays; i++) {
      const currentDate = getDateOfYear(year, i);
      //console.log(currentDate);

    }

    for (let d = new Date(startDate); d <= nowDate; d.setDate(d.getDate() + 1)){
        const currentDate= d.toISOString().split('T')[0];
        console.log(currentDate);
        const commitCount = commitData[currentDate] || 0;
        calendarDays.push(commitCount);
    }

    return calendarDays.map((commitCount, index) => (
      <div
        key={index}
        className="calendar-day"
        style={{
          backgroundColor: getColorByCommitCount(commitCount),
          width: '20px',
          height: '20px',
          margin: '2px',
        }}
      >
        <span>{commitCount > 0 ? commitCount : ''}</span>
      </div>
    ));
  };

  const getDateOfYear = (year, dayOfYear) => {
    const date = new Date(year, 0); // January 1st of the given year
    date.setDate(dayOfYear);
    return date.toISOString().split('T')[0]; // Return date as YYYY-MM-DD
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getColorByCommitCount = (count) => {
    if (count === 0) return '#E0E0E0'; // Light gray for no commits
    if (count === 1) return '#C6E48B'; // Light green for 1 commit
    if (count === 2) return '#7BC96F'; // Medium green for 2 commits
    if (count === 3) return '#239A3B'; // Dark green for 3 commits
    return '#196127'; // Darkest green for more than 3 commits
  };

  return (
    <div>
      <h3>GitHub Commit Calendar for {new Date().getFullYear()}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: '5px' }}>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default GitHubCommitCalendar;
