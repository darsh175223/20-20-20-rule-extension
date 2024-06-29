auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('sessions').where('uid', '==', user.uid).get().then(querySnapshot => {
        let sessions = [];
        querySnapshot.forEach(doc => {
          sessions.push(doc.data().timestamp.toDate());
        });
        displayAnalytics(sessions);
      });
    } else {
      alert('Please sign in to view analytics.');
    }
  });
  
  function displayAnalytics(sessions) {
    // Generate and display charts (using a library like Chart.js or Google Charts)
    // Example: Daily activity chart
    let dailyData = sessions.reduce((acc, session) => {
      let date = session.toDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});
  
    // Generate chart for daily activity
    let dailyChart = document.getElementById('dailyChart');
    // Use a chart library to create a chart with dailyData
    // ...
  
    // Generate and display weekly and monthly charts similarly
    // ...
  }
  