export const DistSex = ({ focusData }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: "5px",
          fontSize: ".8rem",
          margin: "9px",
        }}
      >
        {focusData?.entry?.[0]?.resource?.component.map((c) => {
          if (c.valueInteger !== 0) {
            return (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="display">{c.code?.coding[0]?.display}</div>
                  <div className="value-integer">{c.valueInteger}</div>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};
