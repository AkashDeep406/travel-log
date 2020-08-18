import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./App.css";
import { listenLogs } from "./api";
import EntryForm from "./EntryForm";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 4,
    overflow: "hidden",
  });
  const [showAddMarker, setShowAddMarker] = useState(null);
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const entries = await listenLogs();
    setLogEntries(entries);
  };

  const onLocationSelected = (event) => {
    console.log("event", event);
    const [longitude, latitude] = event.lngLat;
    setShowAddMarker({
      latitude,
      longitude,
    });
  };
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={
        "pk.eyJ1IjoiamFrYXNoNDA2IiwiYSI6ImNrZHdkaTk1MDBua2cyeW84Z2ViZ3V0YWsifQ.FwqnRvb6FGGHr6Pmm1dbOw"
      }
      mapStyle={"mapbox://styles/jakash406/ckdxxmf143ubm19o3s54w0t02"}
      onDblClick={onLocationSelected}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() => {
                setShowPopup({
                  ...entry,
                  [entry._id]: true,
                });
              }}
            >
              <svg
                className="marker"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                   c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                   c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>

          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
              anchor="top"
              dynamicPosition={true}
            >
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  {new Date(entry.dateVisited).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      {showAddMarker ? (
        <div>
          <Marker
            latitude={showAddMarker.latitude}
            longitude={showAddMarker.longitude}
          >
            <div>
              <svg
                className="markeradd"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                   c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                   c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            className={"popup"}
            latitude={showAddMarker.latitude}
            longitude={showAddMarker.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowAddMarker(null)}
            anchor="top"
            dynamicPosition={true}
          >
            <div>
              <h3>Add your new log entry here!!!</h3>
              <EntryForm
                onClose={() => {
                  setShowAddMarker(null);
                  getEntries();
                }}
                location={showAddMarker}
              />
            </div>
          </Popup>
        </div>
      ) : null}
    </ReactMapGL>
  );
}

export default App;
