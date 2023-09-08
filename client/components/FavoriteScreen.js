import React from "react";
import { useState, useEffect } from "react";

import { DataTable } from "react-native-paper";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { GetFavTeam } from "../api/GetFavTeamApi";
import { getStandings } from "../api/StandingsApi";

export default function FavoriteScreen({ navigation, route }) {
  const email = route.params.email;

  const [favTeamList, setFavTeamList] = useState([]);
  const [teamProp, setTeamProp] = useState([]);
  // create another state of int
  const [refresh, SetRefresh] = useState(0);

  // get favorite team list
  useEffect(() => {
    (async () => {
      try {
        setFavTeamList(await GetFavTeam(email));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);
  // get all team standings data
  useEffect(() => {
    (async () => {
      try {
        setTeamProp(await getStandings());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  if (teamProp.length !== 0 && favTeamList !== null) {
    let allTeams = teamProp[0].league.standings[0];
    let filterTeam = allTeams.filter((team) =>
      favTeamList.includes(team.team.id)
    );
    if (filterTeam.length !== 0) {
      return (
        <View>
          <Button
            title="sync"
            color="#787DCA"
            onPress={() => {
              SetRefresh(refresh + 1);
            }}
          ></Button>
          <TeamTable props={filterTeam} navigation={navigation}></TeamTable>
        </View>
      );
    } else {
      return (
        <View>
          <Button
            title="sync"
            color="#787DCA"
            onPress={() => {
              SetRefresh(refresh + 1);
            }}
          ></Button>
          <Text>No data</Text>
        </View>
      );
    }
  } else {
    return (
      <View>
        <Button
          title="sync"
          color="#787DCA"
          onPress={() => {
            SetRefresh(refresh + 1);
          }}
        ></Button>
        <Text>No data</Text>
      </View>
    );
  }
}

function TeamTable({ props, navigation }) {
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title></DataTable.Title>
          <DataTable.Title></DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
        {props.map((standing) => {
          return (
            <TouchableOpacity
              key={standing.team.id}
              onPress={() => navigation.navigate("Team", standing.team.id)}
            >
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Image
                    source={{ uri: standing.team.logo }}
                    style={{ width: 15, height: 15 }}
                  ></Image>
                </DataTable.Cell>
                <DataTable.Cell>{standing.team.name}</DataTable.Cell>
                <DataTable.Cell># {standing.rank}</DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}
