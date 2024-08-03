'use client'

import {useState} from "react";
import Chat from "@/app/chat";

export default function Home() {
    const [location, setLocation] = useState<string | undefined>(undefined);

    return (
          <div className={"flex flex-col items-center justify-center lg:h-screen w-full"}>
              <h1 className={"text-8xl font-semibold m-12 mb-4 text-center"}>Explore with Gemini</h1>
              <div className={"flex items-center w-full"}>
                  <div className={"flex flex-col-reverse lg:flex-row gap-4 w-full"}>
                      <div className={"flex-1"}>
                          <div className={"blue-shadow border rounded-2xl m-6 mt-0 lg:mr-0 lg:mt-6 aspect-square"}></div>
                      </div>
                      <div className={"flex-1"}>
                          <Chat location={location} setLocation={setLocation}/>
                      </div>
                  </div>
              </div>
              <div className={"mt"}/>
          </div>
    );
}
