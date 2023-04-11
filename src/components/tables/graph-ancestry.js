import {
  BarChart,
  Bar,
  YAxis
} from "recharts";

import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import { DistAncestry } from "./dist-ancestry";

export const GraphAncestry = () => {
  const { selectedObject, setSelectedObject } = useContext(myContext);
  const [focusData, setFocusData] = useState();
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await fetch(
      `https://anvil-fhir-vumc.uc.r.appspot.com/fhir/Observation?focus=ResearchStudy/${selectedObject?.resource?.id}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        setFocusData(d);
        setGraphData([]);
        d?.entry?.[1]?.resource?.component.map((c, index) => {
          if (c.valueInteger !== 0) {
            setGraphData((data) => [
              ...data,
              {
                name: c.code.coding[0].display,
                value: c.valueInteger,
                fill: COLORS[index % COLORS.length],
              },
            ]);
          }
        });
      });
  };

  const COLORS = [
    "#E7EBEE",
    "#ADB5BD",
    "#4DAA57",
    "#E63946",
    "#F95738",
    "#FFBA08",
    "#212529",
    "#2F6690",
    "#9113A4",
  ];
  const renderGraph = () => {
    return (
      <BarChart width={620} height={250} data={graphData}>
        <Bar dataKey="value" />
        <YAxis />
      </BarChart>
    );
  };

  return (
    <>
      <DistAncestry focusData={focusData} COLORS={COLORS} />

      {graphData.length > 0 ? renderGraph() : "No available data"}
    </>
  );
};
