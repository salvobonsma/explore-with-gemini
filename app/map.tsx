import {APIProvider, Map as GoogleMap, MapControl} from "@vis.gl/react-google-maps";

export default function Map({window, setWindow}: {
    window: { lat: number, lng: number, zoom: number },
    setWindow: (window: { lat: number, lng: number, zoom: number }) => void
}) {
    return (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_KEY ?? ""}>
              <GoogleMap
                    className={"w-full h-full gm-no-border"}
                    center={window}
                    zoom={window.zoom}
                    onZoomChanged={ev => setWindow({...ev.detail, ...ev.detail.center})}
                    onCenterChanged={ev => setWindow({...ev.detail, ...ev.detail.center})}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
              />
              <MapControl position={3}>
                  <div
                        style={{
                            margin: '10px',
                            padding: '1em',
                            background: 'rgba(255,255,255,0.4)',
                            display: 'flex',
                            flexFlow: 'column nowrap'
                        }}>
                      <label htmlFor={'zoom'}>This is a custom zoom control!</label>
                      <input
                            id={'zoom'}
                            type={'range'}
                            min={1}
                            max={18}
                            step={'any'}
                            value={window.zoom}
                            onChange={ev => setWindow({...window, zoom: ev.target.valueAsNumber})}
                      />
                  </div>
              </MapControl>
          </APIProvider>
    );
}