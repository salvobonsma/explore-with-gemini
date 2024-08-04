import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoaderCircle, SendIcon} from "lucide-react";
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

    function message(side: "left" | "right", message?: string,) {
        if (!message) {
            return (
                  <div className={cn(side === "left" ? "self-start text-left" : "self-end text-right", "w-40 aspect-square rounded-2xl p-4 bg-muted flex justify-center items-center")}>
                      <LoaderCircle className={"animate-spin"}/>
                  </div>
            )
        }

        return (
              <div className={cn(side === "left" ? "self-start text-left" : "self-end text-right", "w-3/5 rounded-2xl p-4 bg-muted break-words")}>
                  {message}
              </div>
        );
    }

    return (
          <div className={"blue-shadow border rounded-2xl m-6 mb-0 lg:ml-0 lg:mb-6 aspect-square flex flex-col justify-end p-4 gap-4"}>
              <div className={"flex-1 overflow-y-scroll flex flex-col gap-4 justify-end"}>
                  {message("left")}
              </div>
              <div className={"flex gap-2"}>
                  <Input placeholder={"Ask me anything..."}/>
                  <Button className={"w-10 aspect-square p-2.5"}><SendIcon/></Button>
              </div>
          </div>
    );
}