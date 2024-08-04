import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SendIcon} from "lucide-react";
import {cn} from "@/lib/utils";

export default function Chat({window, setWindow}: {
    window?: { lat: number, lng: number, zoom: number },
    setWindow: (window: { lat: number, lng: number, zoom: number }) => void
}) {
    if (!location) return (
          <div className={"blue-shadow border rounded-2xl m-6 mb-0 lg:ml-0 lg:mb-6 flex flex-col justify-center items-center aspect-square"}>
              <div className={"flex flex-col gap-4 m-8 items-center"}>
                  <h1 className={"text-center"}>Where would you like to visit?</h1>
                  <div className={"w-full sm:w-80 flex gap-2"}>
                      <Input placeholder={"Seattle, WA"}/>
                      <Button className={"w-10 aspect-square p-2.5"}><SendIcon /></Button>
                  </div>
              </div>
          </div>
    );

    function message(message: string, side: "left" | "right") {
        return (
              <div className={cn(side == "left" ? "self-start text-left" : "self-end text-right", "w-1/2 w- rounded-2xl p-4 bg-muted text-wrap")}>{message}</div>
        )
    }

    return (
          <div className={"blue-shadow border rounded-2xl m-6 mb-0 lg:ml-0 lg:mb-6 aspect-square flex flex-col justify-end p-4 gap-4"}>
              <div className={"flex-1 overflow-y-scroll flex flex-col gap-4 justify-end"}>
                  {message("testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest", "right")}
                  {message("test", "left")}
                  {message("test", "right")}
              </div>
              <div className={"flex gap-2"}>
                  <Input placeholder={"Ask me anything..."}/>
                  <Button className={"w-10 aspect-square p-2.5"}><SendIcon/></Button>
              </div>
          </div>
    );
}