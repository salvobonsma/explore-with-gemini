import {Input} from "@/components/ui/input";

export default function Chat({location, setLocation}: {
    location?: string,
    setLocation: (location: string | undefined) => void
}) {
    if (!location) return (
          <div className={"blue-shadow border rounded-2xl m-6 mb-0 lg:ml-0 lg:mb-6 flex flex-col justify-center items-center aspect-square"}>
              <div className={"flex flex-col gap-4 m-8 items-center"}>
                  <h1 className={"text-center"}>Where would you like to visit?</h1>
                  <Input className={"w-80"} placeholder={"Seattle, WA"}/>
              </div>
          </div>
    );

    return (
          <></>
    );
}