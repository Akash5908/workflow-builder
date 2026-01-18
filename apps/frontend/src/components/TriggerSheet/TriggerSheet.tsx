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
  SUPPORTED_TRIGGERS,
  type NodeProp,
  type TriggerProp,
} from "common/types";
import type { triggerProp } from "@/pages/workflow/component/createWorkflow";

export const TriggerSheet = ({
  onSelect,
  toggleSheet,
  setToggleSheet,
}: {
  onSelect: (item: NodeProp) => void;
  toggleSheet: boolean;
  setToggleSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedTrigger, setSelectedTrigger] = useState<NodeProp>();
  const [metaData, setMetaData] = useState({
    id: "",
    title: "",
  });

  function handleClose() {
    setToggleSheet((prev: boolean) => !prev);
  }

  function handleSelect(value: string) {
    const data = SUPPORTED_TRIGGERS.find((item) => item.title === value);
    if (!data) return null;
    setSelectedTrigger({
      id: data.id,
      metadata: {
        kind: data.title,
      },
    });
  }

  function handleSubmit() {
    onSelect(selectedTrigger!);
    handleClose();
  }
  return (
    <Sheet open={toggleSheet}>
      <SheetContent className="p-1">
        <SheetHeader>
          <SheetTitle>What triggers this Workfolow?</SheetTitle>
          <SheetDescription>
            A trigger is a step that starts your workflow
          </SheetDescription>
        </SheetHeader>
        <div>
          <Select
            value={selectedTrigger?.metadata.title}
            onValueChange={handleSelect}
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select a Trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Triggers</SelectLabel>
                {SUPPORTED_TRIGGERS.map(
                  (item: { id: string; title: string }) => (
                    <SelectItem id={item.id} value={item.title} key={item.id}>
                      {item.title}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
