import {APIProvider, Map as GoogleMap, MapControl} from "@vis.gl/react-google-maps";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useState} from "react";

export default function Map({window, setWindow}: {
    window: { lat: number, lng: number, zoom: number },
    setWindow: (window: { lat: number, lng: number, zoom: number }) => void
}) {
    const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");

    return (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_KEY ?? ""}>
              <GoogleMap
                    className={"w-full h-full gm-no-border"}
                    center={window}
                    zoom={window.zoom}
                    onZoomChanged={ev => setWindow({...ev.detail, ...ev.detail.center})}
                    onCenterChanged={ev => setWindow({...ev.detail, ...ev.detail.center})}
                    gestureHandling={"greedy"}
                    backgroundColor={"bg-background"}
                    mapTypeId={mapType}
                    disableDefaultUI={true}
              >
                  <MapControl position={1}>
                      <div className={"rounded-lg bg-background m-4 p-1 outline outline-1 outline-accent"}>
                          <Tabs defaultValue={mapType}>
                              <TabsList>
                                  <TabsTrigger value="roadmap"
                                               onClick={() => setMapType("roadmap")}>Roadmap</TabsTrigger>
                                  <TabsTrigger value="satellite"
                                               onClick={() => setMapType("satellite")}>Satellite</TabsTrigger>
                              </TabsList>
                          </Tabs>
                      </div>
                  </MapControl>
                  <MapControl position={3}>
                      <div className={"rounded-lg bg-background m-4 p-1 flex gap-2 outline outline-1 outline-accent"}>
                          <Button variant={"ghost"} className={"w-10 p-2.5"}
                                  onClick={() => setWindow({...window, zoom: window.zoom - 1})}><Minus/></Button>
                          <Button variant={"ghost"} className={"w-10  p-2.5"}
                                  onClick={() => setWindow({...window, zoom: window.zoom + 1})}><Plus/></Button>
                      </div>
                  </MapControl>
              </GoogleMap>
          </APIProvider>
    );
}