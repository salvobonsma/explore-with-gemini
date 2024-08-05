import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CircleAlert, LoaderCircle, SendIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import Gemini, {Message} from "@/lib/gemini";

export default function Chat({window, setWindow}: {
    window: { lat: number, lng: number, zoom: number, mapType: "roadmap" | "satellite" },
    setWindow: (window: { lat: number, lng: number, zoom: number, mapType: "roadmap" | "satellite" }) => void
}) {
    const [history, setHistory] = useState<{ role: "model" | "user", message: Message }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        setTriggered(false);
        if (triggered) {
            (async () => {
                if (input.length > 0 && !loading) {
                    setLoading(true);
                    setError(false);
                    setHistory(prevHistory => [...prevHistory, {role: "user", message: {...window, message: input}}]);
                    setInput("");
                    const res = await Gemini(history, {...window, message: input});
                    if (!res) {
                        setLoading(false);
                        setError(true);
                        return;
                    }
                    setHistory(prevHistory => [...prevHistory, {role: "model", message: res}]);
                    setWindow(res);
                    setLoading(false);
                }
            })();
        }
    }, [history, input, loading, setWindow, triggered, window]);

    if (history.length == 0) return (
          <div className={"blue-shadow border rounded-2xl m-4 mb-0 lg:ml-0 lg:mb-4 flex flex-col justify-center items-center aspect-square"}>
              <div className={"flex flex-col gap-4 m-8 items-center"}>
                  <h1 className={"text-center"}>Where would you like to visit?</h1>
                  <form action={() => setTriggered(true)} className={"w-full sm:w-80 flex gap-2"}>
                      <Input autoFocus value={input} onChange={event => setInput(event.target.value)}
                             placeholder={"Ask me anything..."}/>
                      <Button className={"w-10 aspect-square p-2.5"}><SendIcon /></Button>
                  </form>
              </div>
          </div>
    );

    function message(key: string, side: "left" | "right", message?: string) {
        return (
              <div key={key} className={cn(
                    side === "left" ? "self-start text-left" : "self-end",
                    message ? "w-4/5 sm:w-3/5" : "w-40 aspect-square flex justify-center items-center",
                    "rounded-2xl p-4 bg-muted transition-transform ease-in-out"
              )}>
                  {
                      message ? message : (
                            <LoaderCircle className={"animate-spin"}/>
                      )
                  }
              </div>
        );
    }

    return (
          <div className={"blue-shadow border rounded-2xl m-4 mb-0 lg:ml-0 lg:mb-4 aspect-square flex flex-col justify-end p-4 gap-4"}>
              <div className={"flex-1 overflow-y-scroll flex flex-col gap-4 justify-end"}>
                  {history.map((value, index) => message(
                        index.toString(),
                        value.role == "model" ? "left" : "right",
                        value.message.message
                  ))}
                  {loading && message(history.length.toString(), "left")}
                  {error && (
                        <div className={"self-start text-left w-40 aspect-square flex flex-col gap-4 justify-center items-center rounded-2xl p-4 bg-muted transition-transform ease-in-out"}>
                            <CircleAlert className={"stroke-destructive"}/>
                            <Button size={"sm"} variant={"destructive"} onClick={() => {
                                setInput(history[history.length - 1].message.message)
                                setTriggered(true);
                            }}>Try Again</Button>
                        </div>
                  )}
              </div>
              <form action={() => setTriggered(true)} className={"flex gap-2"}>
                  <Input autoFocus className={"focus:outline-none"} value={input}
                         onChange={event => setInput(event.target.value)} placeholder={"Ask me anything..."}/>
                  <Button disabled={loading} className={"w-10 aspect-square p-2.5"}>
                      {
                          loading ? (
                                <LoaderCircle className={"animate-spin"}/>
                          ) : (
                                <SendIcon/>
                          )
                      }
                  </Button>
              </form>
          </div>
    );
}