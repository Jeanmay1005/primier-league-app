import React from "react";
import { Chart } from "react-google-charts";

export function StatChart(props) {
  const data = [
    ["Result", "Games"],
    ["Wins", props.props.wins.total],
    ["Loses", props.props.loses.total],
    ["Draws", props.props.draws.total],
  ];

  const options = {
    width: 800,
    title: "2022 Season Statistics",
    pieHole: 0.4,
    colors: ["#60B65B", "#E54949", "#F6B51E"],
    is3D: false,
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
