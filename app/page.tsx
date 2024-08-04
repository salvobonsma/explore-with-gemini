'use client'

import {useState} from "react";
import Chat from "@/app/chat";
import Map from "@/app/map";

export default function Home() {
    const [window, setWindow] = useState<{ lat: number, lng: number, zoom: number }>({lat: 44, lng: -80, zoom: 4});

    return (
          <div className={"flex flex-col items-center justify-center lg:h-screen w-full"}>
              <h1 className={"text-8xl font-semibold m-12 mb-4 text-center"}>Explore with Gemini</h1>
              <div className={"flex items-center w-full"}>
                  <div className={"flex flex-col-reverse lg:flex-row gap-4 w-full"}>
                      <div className={"flex-1"}>
                          <div className={"blue-shadow border rounded-2xl m-6 mt-0 lg:mr-0 lg:mt-6 aspect-square overflow-clip flex justify-center items-center"}>
                              <Map window={window} setWindow={setWindow}/>
                          </div>
                      </div>
                      <div className={"flex-1"}>
                          <Chat window={window} setWindow={setWindow}/>
                      </div>
                  </div>
              </div>
              <div className={"mt"}/>
          </div>
    );
}
