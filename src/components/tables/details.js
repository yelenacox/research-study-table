import React, { useContext, useEffect } from "react";
import { myContext } from "../../App";
import "./details.css";
import { useNavigate } from "react-router";
import HTMLReactParser from "html-react-parser";
import { GraphSex } from "./graph-sex";
import { GraphAncestry } from "./graph-ancestry";

function DetailsView() {
  const { selectedObject, setSelectedObject } = useContext(myContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedObject === null) {
      navigate("/");
    }
  });

  return (
    <>
      <div
        className="details-container"
        style={{ display: "flex", flexFlow: "row wrap" }}
      >
        <div className="details-card-wrapper">
          <div className="DetailsCard">
            <div className="details-properties">
              <div className="title-div">Title:</div>
              <div className="title-property">
                {selectedObject?.resource?.title}
              </div>
            </div>
            <div className="details-properties">
              {selectedObject?.resource?.partOf ? (
                <>
                  <div className="title-div">Part of:</div>
                  <div>
                    <a
                      href={selectedObject?.resource?.identifier[0]?.system}
                      target="_blank"
                    >
                      {
                        selectedObject?.resource?.partOf[0]?.reference.split(
                          "/"
                        )[1]
                      }
                    </a>
                  </div>{" "}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="details-properties">
              {selectedObject?.resource?.relatedArtifact ? (
                <>
                  <div className="title-div">Related Artifact:</div>
                  <div>
                    {
                      <a
                        href={selectedObject?.resource?.relatedArtifact[0].url}
                        target="_blank"
                      >
                        {selectedObject?.resource?.relatedArtifact[0].label}
                      </a>
                    }
                  </div>{" "}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="details-properties">
              {selectedObject?.resource?.description === "TBD" ? (
                ""
              ) : !!selectedObject?.resource?.description ? (
                <>
                  <div className="title-div">Description:</div>
                  <div>
                    {" "}
                    {HTMLReactParser(selectedObject?.resource?.description)}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className="graph-sex"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px 10px 0 0",
            height: "400px",
            border: "1px solid darkgray",
            width: "27vw",
            textAlign: "center",
            fontSize: ".8rem",
            paddingTop: "12px",
          }}
        >
          <b>Sex Distribution</b>
          {<GraphSex />}
        </div>
        <div
          className="graph-ancestry"
          style={{
            marginTop: "10px",
            height: "400px",
            width: "42vw",
            border: "1px solid darkgray",
            textAlign: "center",
            fontSize: ".8rem",
            paddingTop: "12px",
          }}
        >
          <b>Ancestry Distribution</b>

          {<GraphAncestry />}
        </div>
      </div>
      <button
        style={{ margin: "10px 16px", float: "right" }}
        onClick={() => {
          setSelectedObject(null);
          navigate("/");
        }}
      >
        Back
      </button>
    </>
  );
}

export default DetailsView;
