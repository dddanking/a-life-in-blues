document.getElementById("getStats").addEventListener("click", function () {
    const birthdate = document.getElementById("birthdate").value;
    const team = document.getElementById("team").value;

    if (!birthdate || !team) {
        alert("Please enter your birthdate and select a team!");
        return;
    }

    const birthYear = new Date(birthdate).getFullYear();
    fetchStats(birthYear, team);
});

function fetchStats(birthYear, team) {
    const apiKey = "YOUR_API_KEY"; // Replace with your API key
    const leagueId = 39; // Premier League
    const season = new Date().getFullYear(); // Current year

    // Fetch team stats from the birth year to the current year
    fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${birthYear}`, {
        method: "GET",
        headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "v3.football.api-sports.io"
        }
    })
    .then(response => response.json())
    .then(data => {
        const standings = data.response[0].league.standings[0];
        displayStats(standings, team, birthYear);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById("output").innerText = "Failed to load data!";
    });
}

function displayStats(standings, team, birthYear) {
    const output = document.getElementById("output");
    output.innerHTML = `<h2>Stats for ${team.charAt(0).toUpperCase() + team.slice(1)} Since ${birthYear}</h2>`;

    const teamStats = standings.find(t => t.team.name.toLowerCase() === team);
    if (teamStats) {
        const stats = `
            <p>Games Played: ${teamStats.all.played}</p>
            <p>Wins: ${teamStats.all.win}</p>
            <p>Losses: ${teamStats.all.lose}</p>
            <p>Draws: ${teamStats.all.draw}</p>
            <p>Goals Scored: ${teamStats.all.goals.for}</p>
            <p>Goals Conceded: ${teamStats.all.goals.against}</p>
            <p>League Rank: ${teamStats.rank}</p>
        `;
        output.innerHTML += stats;
    } else {
        output.innerHTML += "<p>Team not found or data unavailable.</p>";
    }
}
