"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { SubmitButton } from "./SubmitButtons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "../lib/zodSchema";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

interface EventDataProps {
    id: string;
    title: string;
    description: string;
    url: string;
    duration: number;
    videoCallSoftwere: VideoCallProvider; // ✅ Fix: Use correct field name
}

export default function EditEventForm({ eventData }: { eventData?: EventDataProps }) {
    if (!eventData) {
        return <p className="text-center text-red-500">Loading event data...</p>;
    }

    const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(eventData.videoCallSoftwere);

    const [form, fields] = useForm({
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: eventTypeSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    });

    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl text-center">
                        Edit Appointment Type
                    </CardTitle>
                    <CardDescription className="text-center">Modify your existing appointment type</CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} noValidate>
                    <CardContent className="grid gap-y-5">
                        <div className="flex flex-col space-y-3">
                            <Label>Title</Label>
                            <Input
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={eventData.title} // Pre-filled data
                                placeholder="30 min meeting"
                            />
                        </div>
                        <p className="text-red-600">{fields.title.errors}</p>

                        <div className="flex flex-col space-y-3">
                            <Label>Url Slug</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                                    https://example.com/
                                </span>
                                <Input
                                    name={fields.url.name}
                                    key={fields.url.key}
                                    defaultValue={eventData.url} // Pre-filled data
                                    className="rounded-l-none"
                                    placeholder="your-url"
                                />
                            </div>
                        </div>
                        <p className="text-red-600">{fields.url.errors}</p>

                        <div className="flex flex-col space-y-3">
                            <Label>Description</Label>
                            <Textarea
                                name={fields.description.name}
                                key={fields.description.key}
                                defaultValue={eventData.description} // Pre-filled data
                                placeholder="Description here"
                            />
                        </div>
                        <p className="text-red-600">{fields.description.errors}</p>

                        <div className="flex flex-col space-y-3">
                            <Label>Duration</Label>
                            <Select name={fields.duration.name} key={fields.duration.key} defaultValue={String(eventData.duration)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value="15">15 min</SelectItem>
                                        <SelectItem value="30">30 min</SelectItem>
                                        <SelectItem value="45">45 min</SelectItem>
                                        <SelectItem value="60">60 min</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <p className="text-red-600">{fields.duration.errors}</p>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <Label>Video Call Provider</Label>
                            <input type="hidden" name={fields.videoCallSofterer.name} value={activePlatform} />
                            <ButtonGroup>
                                {["Zoom Meeting", "Google Meet", "Microsoft Teams"].map((provider) => (
                                    <Button
                                        key={provider}
                                        className="w-[140px]"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setActivePlatform(provider as VideoCallProvider);
                                        }}
                                        variant={activePlatform === provider ? "secondary" : "outline"}
                                    >
                                        {provider}
                                    </Button>
                                ))}
                            </ButtonGroup>
                            <p className="text-red-600">{fields.videoCallSofterer.errors}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex mt-4 justify-between">
                        <Button variant="secondary" asChild>
                            <Link className="w-[150px]" href={`/dashboard`}>Cancel</Link>
                        </Button>
                        <SubmitButton text="Update Event" className="w-[150px]" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
