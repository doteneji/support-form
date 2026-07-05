"use client";

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
const areas = ["Jobs", "Scheduling", "Timesheets", "Invoicing", "Reports", "Administration", "Other"];
const impactLevels = ["Blocking work", "Slowing work down", "Minor inconvenience", "General question"];

export default function Home() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
              <div className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Contact Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@company.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Acme Inc." />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground">
                  About your request
                </h2>
                <div className="space-y-2">
                  <Label>Product</Label>
                  <RadioGroup name="product" defaultValue="Compass" className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Compass" id="product-compass" />
                      <Label htmlFor="product-compass" className="font-normal">Compass</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Other" id="product-other" />
                      <Label htmlFor="product-other" className="font-normal">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

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
                    <Select name="area" required>
                      <SelectTrigger id="area" className="w-full">
                        <SelectValue placeholder="Select an area" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                  <Label htmlFor="attachments">Attachments</Label>
                  <Input id="attachments" name="attachments" type="file" multiple accept="image/*,.pdf" />
                  <p className="text-sm text-muted-foreground">
                    Screenshots or files that help explain the issue.
                  </p>
                </div>
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
