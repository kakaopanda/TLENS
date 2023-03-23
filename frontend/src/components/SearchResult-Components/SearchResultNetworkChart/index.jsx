import React from "react";
import { Graph } from "react-d3-graph";

const SearchResultNetworkChart = () => {
  const data = {
    nodes: [
      { id: "Node 1" },
      { id: "Node 2" },
      { id: "Node 3" },
      { id: "Node 4" },
    ],
    links: [
      { source: "Node 1", target: "Node 2" },
      { source: "Node 2", target: "Node 3" },
      { source: "Node 3", target: "Node 4" },
      { source: "Node 4", target: "Node 1" },
    ],
  };

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  return (
    <Graph // id는 고유한 값이어야 합니다.
      data={data}
      config={myConfig}
    />
  );
};

export default SearchResultNetworkChart;
