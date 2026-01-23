import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from "@/config";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FieldDescription } from "../ui/field";

export function CreateWorkflow() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState({
    name: "",
    isNameValid: true,
  });

  //Func to create workflow.
  const createWorkflow = async () => {
    if (name === "") {
      return setError((prevError) => ({
        ...prevError,
        name: "Field is required",
        isNameValid: false,
      }));
    }
    try {
      const res = await axios.post(
        `${config.serverApiUrl}/workflow`,
        {
          workflowName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        },
      );

      if (res.status === 200) {
        const workflowId = res.data.workflowId;
        toast.success(`Created workflow: ${workflowId}`);
        navigate(`/workflow/${workflowId}`, { replace: true });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ error: string }>;
        toast.error(err.response?.data?.error || "Workflow creation failed.");
        console.error(error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className=" hover:bg-slate-300">
          Create Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create workflow</DialogTitle>
          <DialogDescription>
            Name your workflow and click "Create" to open the editor..
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!error.isNameValid}
            />
            {!error.isNameValid && (
              <FieldDescription>{error.name}</FieldDescription>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={createWorkflow}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
