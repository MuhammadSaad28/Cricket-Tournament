let teamsData3 = [
    { name: "Titans", matchesPlayed: 0, matchesWon: 0, matchesTied: 0, matchesLost: 0, points: 0, totalRunsScored: 0, totalOversFaced: 0, totalWicketsLost: 0, totalRunsConceded: 0, totalOversBowled: 0, totalOpponentWickets: 0 },
    { name: "Falcons", matchesPlayed: 0, matchesWon: 0, matchesTied: 0, matchesLost: 0, points: 0, totalRunsScored: 0, totalOversFaced: 0, totalWicketsLost: 0, totalRunsConceded: 0, totalOversBowled: 0, totalOpponentWickets: 0 },
    { name: "Panthers", matchesPlayed: 0, matchesWon: 0, matchesTied: 0, matchesLost: 0, points: 0, totalRunsScored: 0, totalOversFaced: 0, totalWicketsLost: 0, totalRunsConceded: 0, totalOversBowled: 0, totalOpponentWickets: 0 },
    
    // Add other teams' data here
];

let matchSchedule3 = [
    { match: 1, team1: "Titans", team2: "Panthers", result: "", team1Score: 0, team2Score: 0, team1Overs: 0, team2Overs: 0, team1Wickets: 0, team2Wickets: 0, submitted: false },
    { match: 2, team1: "Panthers", team2: "Falcons", result: "", team1Score: 0, team2Score: 0, team1Overs: 0, team2Overs: 0, team1Wickets: 0, team2Wickets: 0, submitted: false },
    { match: 3, team1: "Falcons", team2: "Titans", result: "", team1Score: 0, team2Score: 0, team1Overs: 0, team2Overs: 0, team1Wickets: 0, team2Wickets: 0, submitted: false },
    
    // Add other match data here
];




function calculateNetRunRate(runsScored, oversFaced, runsConceded, oversBowled) {
    return (runsScored / oversFaced) - (runsConceded / oversBowled);
}

function updatePointsTable() {
    const pointsTableBody = document.getElementById("points-table-body");
    pointsTableBody.innerHTML = "";

    // Sort teams based on points (highest to lowest) and net run rate (highest to lowest)
    teamsData3.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points; // Sort by points (highest to lowest)
        } else {
            const netRunRateA = calculateNetRunRate(a.totalRunsScored, a.totalOversFaced, a.totalRunsConceded, a.totalOversBowled);
            const netRunRateB = calculateNetRunRate(b.totalRunsScored, b.totalOversFaced, b.totalRunsConceded, b.totalOversBowled);
            return netRunRateB - netRunRateA; // Sort by net run rate (highest to lowest)
        }
    });

    teamsData3.forEach(team => {
        const { name, matchesPlayed, matchesWon, matchesTied, matchesLost, points, totalRunsScored, totalOversFaced, totalRunsConceded, totalOversBowled } = team;
        const netRunRate = calculateNetRunRate(totalRunsScored, totalOversFaced, totalRunsConceded, totalOversBowled).toFixed(2);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${matchesPlayed}</td>
            <td>${matchesWon}</td>
            <td>${matchesTied}</td>
            <td>${matchesLost}</td>
            <td>${points}</td>
            <td>${netRunRate}</td>
        `;

        pointsTableBody.appendChild(row);
    });
}




function updateMatchSchedule3() {
    const matchSchedule3Body = document.getElementById("match-schedule-body");
  
    matchSchedule3Body.innerHTML = "";
  
    matchSchedule3.forEach(match => {
      const { match: matchNumber, team1, team2, result, team1Score, team2Score, team1Overs, team2Overs, team1Wickets, team2Wickets, submitted } = match;
  
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>Match ${matchNumber}</td>
      <td>${team1}</td>
      <td data-value="${team1Score}">${team1Score}</td>
      <td data-value="${team1Overs}">${team1Overs}</td>
      <td data-value="${team1Wickets}">${team1Wickets}</td>
      <td>${team2}</td>
      <td data-value="${team2Score}">${team2Score}</td>
      <td data-value="${team2Overs}">${team2Overs}</td>
      <td data-value="${team2Wickets}">${team2Wickets}</td>
      <td>${result}</td>
      <td>
        <button class="edit-button" data-match="${matchNumber}">&#9998; Edit</button>
      </td>
      <td>
        ${!submitted ? `<button class="submit-button" data-match="${matchNumber}">Submit</button>` : "Submitted"}
      </td>
    `;
  
      matchSchedule3Body.appendChild(row);
    });
  
    // Add event listeners to the edit and submit buttons
    addEditEventListeners();
    addSubmitEventListeners();
  }



function addEditEventListeners() {
    const editButtons = document.querySelectorAll(".edit-button");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            const matchNumber = parseInt(this.dataset.match);
            const row = this.parentNode.parentNode;
            const tds = row.querySelectorAll("td[data-value]");

            tds.forEach(td => {
                const input = document.createElement("input");
                input.type = "number";
                input.value = td.dataset.value;

                const oldValue = td.dataset.value;

                input.addEventListener("blur", function () {
                    const newValue = parseInt(this.value);

                    if (!isNaN(newValue) && newValue >= 0) {
                        td.textContent = newValue;
                        td.dataset.value = newValue;
                    } else {
                        this.value = oldValue;
                    }
                });

                td.textContent = "";
                td.appendChild(input);
            });
        });
    });
}

function addSubmitEventListeners() {
    const submitButtons = document.querySelectorAll(".submit-button");

    submitButtons.forEach(button => {
        button.addEventListener("click", function () {
            const matchNumber = parseInt(this.dataset.match);
            const row = this.parentNode.parentNode;
            const tds = row.querySelectorAll("td[data-value]");

            const [team1Score, team1Overs, team1Wickets, team2Score, team2Overs, team2Wickets] = tds;

            const team1ScoreValue = parseInt(team1Score.textContent);
            const team1OversValue = parseFloat(team1Overs.textContent);
            const team1WicketsValue = parseInt(team1Wickets.textContent);
            const team2ScoreValue = parseInt(team2Score.textContent);
            const team2OversValue = parseFloat(team2Overs.textContent);
            const team2WicketsValue = parseInt(team2Wickets.textContent);

            // Check if the match has already been submitted
            const match = matchSchedule3.find(match => match.match === matchNumber);
            if (match && !match.submitted) {
                // Update match result in the match schedule
                match.team1Score = team1ScoreValue;
                match.team1Overs = team1OversValue;
                match.team1Wickets = team1WicketsValue;
                match.team2Score = team2ScoreValue;
                match.team2Overs = team2OversValue;
                match.team2Wickets = team2WicketsValue;
                match.result = `${team1ScoreValue}/${team1WicketsValue} (${team1OversValue}) vs ${team2ScoreValue}/${team2WicketsValue} (${team2OversValue})`;
                match.submitted = true;

                // Update team data based on the match result
                teamsData3.forEach(team => {
                    if (team.name === match.team1) {
                        team.matchesPlayed += 1;
                        team.totalRunsScored += team1ScoreValue;
                        team.totalOversFaced += team1OversValue;
                        team.totalWicketsLost += team1WicketsValue;
                        team.totalRunsConceded += team2ScoreValue;
                        team.totalOversBowled += team2OversValue;
                        team.totalOpponentWickets += team2WicketsValue;
                        if (team1ScoreValue > team2ScoreValue) {
                            team.matchesWon += 1;
                            team.points += 2;
                        } else if (team1ScoreValue === team2ScoreValue) {
                            team.matchesTied += 1;
                            team.points += 1;
                        } else {
                            team.matchesLost += 1;
                        }
                    } else if (team.name === match.team2) {
                        team.matchesPlayed += 1;
                        team.totalRunsScored += team2ScoreValue;
                        team.totalOversFaced += team2OversValue;
                        team.totalWicketsLost += team2WicketsValue;
                        team.totalRunsConceded += team1ScoreValue;
                        team.totalOversBowled += team1OversValue;
                        team.totalOpponentWickets += team1WicketsValue;
                        if (team2ScoreValue > team1ScoreValue) {
                            team.matchesWon += 1;
                            team.points += 2;
                        } else if (team2ScoreValue === team1ScoreValue) {
                            team.matchesTied += 1;
                            team.points += 1;
                        } else {
                            team.matchesLost += 1;
                        }
                    }
                });

                updatePointsTable();
                updateMatchSchedule3();

                // Remove the submit button and disable the edit button after recording match result
                const editButton = row.querySelector(".edit-button");
                const submitButton = row.querySelector(".submit-button");
                submitButton.parentNode.removeChild(submitButton);
                editButton.disabled = true;
            }

            saveDataToLocalStorage();
        });
    })
}


// Function to save data to local storage
function saveDataToLocalStorage() {
    localStorage.setItem("teamsData3", JSON.stringify(teamsData3));
    localStorage.setItem("matchSchedule3", JSON.stringify(matchSchedule3));
  }
  
  // Function to load data from local storage
  function loadDataFromLocalStorage() {
    const savedTeamsData3 = localStorage.getItem("teamsData3");
    const savedMatchSchedule3 = localStorage.getItem("matchSchedule3");
  
    if (savedTeamsData3) {
      teamsData3 = JSON.parse(savedTeamsData3);
    }
  
    if (savedMatchSchedule3) {
      matchSchedule3 = JSON.parse(savedMatchSchedule3);
    }
  }
  
  // Call initial function to load data from local storage
  loadDataFromLocalStorage();

// Call initial functions to display points table and match schedule
updatePointsTable();
updateMatchSchedule3();