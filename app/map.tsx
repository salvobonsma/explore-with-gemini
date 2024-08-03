import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {LoaderCircle} from "lucide-react";

export default function Map({location}: {
    location?: { lat: number, lng: number }
}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY ?? "",
    });

    if (!isLoaded) return (
          <LoaderCircle className={"animate-spin"}/>
    );
    return <GoogleMap zoom={3} center={location} mapContainerClassName={"w-full h-full gm-no-border"}></GoogleMap>;
}