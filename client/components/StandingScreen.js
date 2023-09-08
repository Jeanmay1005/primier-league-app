import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { getStandings } from "../api/StandingsApi";
import { StandingTable } from "./StandingTable";
import { SearchBar } from "./SearchBar";
import { GetFavTeam } from "../api/GetFavTeamApi";

export default function Standings({ navigation, route }) {
  const [favTeamList, setFavTeamList] = useState([]);
  const [standingsArray, setStandingsArray] = useState([]);
  const [search, setSearch] = useState("");

  const email = route.params.email;

  useEffect(() => {
    (async () => {
      try {
        setStandingsArray(await getStandings());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setFavTeamList(await GetFavTeam(email));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (standingsArray.length !== 0) {
    // function that filters standings team with search
    let standingResult;
    let standings = standingsArray[0].league.standings[0];
    let filteredStandings = standings.filter((standing) =>
      standing.team.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredStandings.length == 0 && search == "") {
      standingResult = standings;
    } else {
      standingResult = filteredStandings;
    }
    standingResult.map((standing) => {
      if (favTeamList !== null && favTeamList.includes(standing.team.id)) {
        standing.team["favorite"] = true;
      } else {
        standing.team["favorite"] = false;
      }
    });
    return (
      <View>
        <View className="tableContainer">
          <SearchBar onSubmit={setSearch} />
          <StandingTable
            props={standingResult}
            email={email}
            navigation={navigation}
          />
        </View>
      </View>
    );
  }
}
