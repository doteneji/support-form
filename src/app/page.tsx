"use client";

import { use, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const requestTypes = ["Bug", "Question", "Feature Request", "Configuration", "Other"];
const impactLevels = ["Blocking work", "Slowing work down", "Minor inconvenience", "General question"];

function AttachmentsField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (inputRef.current) inputRef.current.files = event.dataTransfer.files;
    setFiles(Array.from(event.dataTransfer.files));
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="attachments">Attachments</Label>
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-lg border border-dashed border-input p-6 text-center text-sm text-muted-foreground hover:bg-accent/50"
      >
        Drag files here, or click to browse
        <input
          ref={inputRef}
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept="image/*,.pdf"
          className="hidden"
          onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
        />
      </div>
      {files.length > 0 && (
        <ul className="text-sm text-muted-foreground">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
      <p className="text-sm text-muted-foreground">
        Screenshots or files that help explain the issue.
      </p>
    </div>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = use(searchParams);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: send this wherever support requests should go (Plain, email, etc.)
    const values = Object.fromEntries(new FormData(event.currentTarget));
    console.log(values);

    toast.success("Support request submitted");
    event.currentTarget.reset();
  }

  return (
    <div className="flex flex-1 justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Support Request</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Help us understand your issue so we can assist you faster.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  defaultValue={email}
                  required
                />
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="requestType">Request Type</Label>
                  <Select name="requestType" required>
                    <SelectTrigger id="requestType" className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <Input id="area" name="area" placeholder="e.g. Invoicing" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground">Tell us more</h2>
                <div className="space-y-2">
                  <Label htmlFor="goal">What were you trying to do?</Label>
                  <Textarea id="goal" name="goal" rows={3} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">What happened?</Label>
                  <Textarea id="details" name="details" rows={6} required />
                </div>
                <div className="space-y-2">
                  <Label>How is this affecting you?</Label>
                  <RadioGroup name="impact" defaultValue={impactLevels[0]} className="gap-3">
                    {impactLevels.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <RadioGroupItem value={option} id={`impact-${option}`} />
                        <Label htmlFor={`impact-${option}`} className="font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" name="notes" rows={3} placeholder="Anything else we should know?" />
                </div>
                <AttachmentsField />
              </div>

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
