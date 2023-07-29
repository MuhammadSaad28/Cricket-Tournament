let teamsData2 = [
    { name: "Vipers", matchesPlayed: 0, matchesWon: 0, matchesTied: 0, matchesLost: 0, points: 0, totalRunsScored: 0, totalOversFaced: 0, totalWicketsLost: 0, totalRunsConceded: 0, totalOversBowled: 0, totalOpponentWickets: 0 },
    { name: "Jaguars", matchesPlayed: 0, matchesWon: 0, matchesTied: 0, matchesLost: 0, points: 0, totalRunsScored: 0, totalOversFaced: 0, totalWicketsLost: 0, totalRunsConceded: 0, totalOversBowled: 0, totalOpponentWickets: 0 },
    { name: "Phoenix", matchesPlayed: 0, matchesWon: 0, matchesTied: 0, matchesLost: 0, points: 0, totalRunsScored: 0, totalOversFaced: 0, totalWicketsLost: 0, totalRunsConceded: 0, totalOversBowled: 0, totalOpponentWickets: 0 },
    
    // Add other teams' data here
];

let matchSchedule2 = [
    { match: 1, team1: "Vipers", team2: "Phoenix", result: "", team1Score: 0, team2Score: 0, team1Overs: 0, team2Overs: 0, team1Wickets: 0, team2Wickets: 0, submitted: false },
    { match: 2, team1: "Phoenix", team2: "Jaguars", result: "", team1Score: 0, team2Score: 0, team1Overs: 0, team2Overs: 0, team1Wickets: 0, team2Wickets: 0, submitted: false },
    { match: 3, team1: "Jaguars", team2: "Vipers", result: "", team1Score: 0, team2Score: 0, team1Overs: 0, team2Overs: 0, team1Wickets: 0, team2Wickets: 0, submitted: false },
    
    // Add other match data here
];



// Function to calculate the net run rate for a team
function calculateNetRunRateForTeam(runsScored, oversFaced, runsConceded, oversBowled) {
    const netRunRate = (runsScored / oversFaced) - (runsConceded / oversBowled);
    return netRunRate.toFixed(2);
}

// Updated function to display points table with net run rate
function updatePointsTable() {
    const pointsTableBody = document.getElementById("points-table-body");

    // Sort teams based on points (highest to lowest) and net run rate (highest to lowest)
    teamsData2.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points; // Sort by points (highest to lowest)
        } else {
            const netRunRateA = calculateNetRunRateForTeam(a.totalRunsScored, a.totalOversFaced, a.totalRunsConceded, a.totalOversBowled);
            const netRunRateB = calculateNetRunRateForTeam(b.totalRunsScored, b.totalOversFaced, b.totalRunsConceded, b.totalOversBowled);
            return netRunRateB - netRunRateA; // Sort by net run rate (highest to lowest)
        }
    });

    pointsTableBody.innerHTML = "";

    teamsData2.forEach(team => {
        const { name, matchesPlayed, matchesWon, matchesTied, matchesLost, points, totalRunsScored, totalOversFaced, totalRunsConceded, totalOversBowled } = team;
        const netRunRate = calculateNetRunRateForTeam(totalRunsScored, totalOversFaced, totalRunsConceded, totalOversBowled);

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



function updateMatchSchedule() {
    const matchScheduleBody = document.getElementById("match-schedule-body");

    matchScheduleBody.innerHTML = "";

    matchSchedule2.forEach(match => {
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

        matchScheduleBody.appendChild(row);
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
            const match = matchSchedule2.find(match => match.match === matchNumber);
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
                teamsData2.forEach(team => {
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
                updateMatchSchedule();

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
    localStorage.setItem("teamsData2", JSON.stringify(teamsData2));
    localStorage.setItem("matchSchedule2", JSON.stringify(matchSchedule2));
}

// Function to load data from local storage
function loadDataFromLocalStorage() {
    const savedTeamsData2 = localStorage.getItem("teamsData2");
    const savedMatchSchedule = localStorage.getItem("matchSchedule2");

    if (savedTeamsData2) {
        teamsData2 = JSON.parse(savedTeamsData2);
    }

    if (savedMatchSchedule) {
        matchSchedule2 = JSON.parse(savedMatchSchedule);
    }
}

// Call initial function to load data from local storage
loadDataFromLocalStorage();

// Call initial functions to display points table and match schedule
updatePointsTable();
updateMatchSchedule();