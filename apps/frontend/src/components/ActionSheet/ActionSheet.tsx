import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  SUPPORTED_ACTIONS,
  type ActionProp,
  type NodeProp,
} from "common/types";
import { Input } from "../ui/input";

export const ActionSheet = ({
  onSelect,
  toggleSheet,
  setToggleSheet,
}: {
  onSelect: (item: NodeProp) => void;
  toggleSheet: boolean;
  setToggleSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedAction, setSelectedAction] = useState<ActionProp>();

  const [metaData, setMetaData] = useState({
    email: "",
    message: "",
  });

  function handleClose() {
    setToggleSheet((prev: boolean) => !prev);
  }

  function handleSelect(value: string) {
    const data = SUPPORTED_ACTIONS.find((item) => item.title === value);
    if (!data) return null;
    setSelectedAction({
      id: data.id,
      metadata: {
        email: metaData.email,
        message: metaData.message,
        kind: data.title,
        type: "target",
      },
    });
  }

  function handleSubmit() {
    onSelect(selectedAction!);
    handleClose();
  }
  return (
    <Sheet open={toggleSheet}>
      <SheetContent className="p-1">
        <SheetHeader>
          <SheetTitle>What Actions are?</SheetTitle>
          <SheetDescription>
            A Action are the process you want to automate.
          </SheetDescription>
        </SheetHeader>
        <div>
          <Select value={selectedAction?.kind} onValueChange={handleSelect}>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select a Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Triggers</SelectLabel>
                {SUPPORTED_ACTIONS.map(
                  (item: { id: string; title: string }) => (
                    <SelectItem id={item.id} value={item.title} key={item.id}>
                      {item.title}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {selectedAction?.kind === "Email" && (
          <>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setMetaData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
            />

            <Input
              type="text"
              placeholder="Message"
              onChange={(e) =>
                setMetaData((prevData) => ({
                  ...prevData,
                  message: e.target.value,
                }))
              }
            />
          </>
        )}

        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
