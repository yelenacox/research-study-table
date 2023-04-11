import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { myContext } from "../../App";
import { DistSex } from "./dist-sex";

export const GraphSex = () => {
  const { selectedObject, setSelectedObject } = useContext(myContext);
  const [focusData, setFocusData] = useState();
  const [data, setData] = useState([]);

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
        setData([]);
        d?.entry?.[0]?.resource?.component.map((c) => {
          if (c.valueInteger !== 0) {
            setData((data) => [
              ...data,
              { name: c.code.coding[0].display, value: c.valueInteger },
            ]);
          }
        });
      });
  };

  const COLORS = ["#FF8F8F", "#3895D3", "#FFBB28", "#8DCC688"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    return name + " " + (percent * 100).toFixed(0) + "%";
  };
  const renderPie = () => {
    return (
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  };

  return (
    <>
      <DistSex focusData={focusData} />

      {data.length > 0 ? renderPie() : "No available data"}
    </>
  );
};
