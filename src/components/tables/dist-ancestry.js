export const DistAncestry = ({ focusData, COLORS }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "42vw",
          justifyContent: "space-evenly",
          padding: "5px",
          fontSize: ".8rem",
          margin: "9px 0 20px 0",
        }}
      >
        {focusData?.entry?.[1]?.resource?.component.map((c, index) => {
          if (c.valueInteger !== 0) {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="display"
                    style={{
                      display: "flex",
                      flexFlow: "column wrap",
                      width: "60px",
                    }}
                  >
                    {c.code?.coding[0]?.display}
                  </div>
                  <div className="value-integer">{c.valueInteger}</div>
                  <div
                    className="legend"
                    style={{
                      width: "12px",
                      height: "12px",
                      border: "1px solid darkgray",
                      background: COLORS[index % COLORS.length],
                    }}
                  ></div>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};
