import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { UpdateApi } from "../api/UpdateApi";
import { DeleteApi } from "../api/DeleteApi";
import { Image, ScrollView, TouchableOpacity, Text } from "react-native";

export function StandingTable({ props, email }) {
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Team</DataTable.Title>
          <DataTable.Title>Rank</DataTable.Title>
          <DataTable.Title>Win</DataTable.Title>
          <DataTable.Title>Lose</DataTable.Title>
          <DataTable.Title>Draw</DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
        {props.map((standing) => {
          return (
            <TableRow
              standing={standing}
              email={email}
              key={standing.team.name}
            />
          );
        })}
      </DataTable>
    </ScrollView>
  );
}

function TableRow({ standing, email }) {
  const [favorite, setFavorite] = useState(standing.team.favorite);
  return (
    <DataTable.Row>
      <DataTable.Cell style={{ flex: 1 }}>
        <Image
          source={{ uri: standing.team.logo }}
          style={{ width: 15, height: 15 }}
        ></Image>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{standing.rank}</Text>
      </DataTable.Cell>
      <DataTable.Cell>{standing.all.win}</DataTable.Cell>
      <DataTable.Cell>{standing.all.lose}</DataTable.Cell>
      <DataTable.Cell>{standing.all.draw}</DataTable.Cell>
      <DataTable.Cell>{standing.all.played}</DataTable.Cell>
      <DataTable.Cell style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            setFavorite((standing.team.favorite = !standing.team.favorite));
            if (standing.team.favorite) {
              UpdateApi(email, standing.team.id);
            } else {
              DeleteApi(email, standing.team.id);
            }
            // standing.team.favorite = !standing.team.favorite;
          }}
        >
          <Icon
            name="heart"
            style={{ color: favorite ? "red" : "grey" }}
          ></Icon>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );
}
