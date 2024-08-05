import {APIProvider, Map as GoogleMap, MapControl} from "@vis.gl/react-google-maps";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function Map({window, setWindow}: {
    window: { lat: number, lng: number, zoom: number, mapType: "roadmap" | "satellite" },
    setWindow: (window: { lat: number, lng: number, zoom: number, mapType: "roadmap" | "satellite" }) => void
}) {
    return (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_KEY ?? ""}>
              <GoogleMap
                    className={"w-full h-full gm-no-border"}
                    center={window}
                    defaultCenter={window}
                    zoom={window.zoom}
                    defaultZoom={window.zoom}
                    onCameraChanged={ev => setWindow({...window, ...ev.detail, ...ev.detail.center})}
                    gestureHandling={"greedy"}
                    backgroundColor={"bg-background"}
                    mapTypeId={window.mapType}
                    disableDefaultUI={true}
              >
                  <MapControl position={1}>
                      <div className={"rounded-lg bg-background m-4 p-1 outline outline-1 outline-accent"}>
                          <Tabs value={window.mapType}>
                              <TabsList>
                                  <TabsTrigger value="roadmap" onClick={() => setWindow({
                                      ...window,
                                      mapType: "roadmap"
                                  })}>Roadmap</TabsTrigger>
                                  <TabsTrigger value="satellite"
                                               onClick={() => setWindow({
                                                   ...window,
                                                   mapType: "satellite"
                                               })}>Satellite</TabsTrigger>
                              </TabsList>
                          </Tabs>
                      </div>
                  </MapControl>
                  <MapControl position={3}>
                      <div className={"rounded-lg bg-background m-4 p-1 flex gap-2 outline outline-1 outline-accent"}>
                          <Button variant={"ghost"} className={"w-10 p-2.5"}
                                  onClick={() => {
                                      if (window.zoom > 0) setWindow({...window, zoom: window.zoom - 1});
                                  }}><Minus/></Button>
                          <Button variant={"ghost"} className={"w-10  p-2.5"}
                                  onClick={() => {
                                      if (window.zoom < 20) setWindow({...window, zoom: window.zoom + 1});
                                  }}><Plus/></Button>
                      </div>
                  </MapControl>
              </GoogleMap>
          </APIProvider>
    );
}