'use client'
import { CreateEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { eventTypeSchema } from "@/app/lib/zodSchema";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useActionState, useState } from "react";

type ViderCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventType() {
    const [activePlatform, setActiovePlatform] = useState<ViderCallProvider>("Google Meet")

    const [lastResult, action] = useActionState(
        CreateEventTypeAction, undefined
    )

    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: eventTypeSchema
            })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    return (<>
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl text-center">
                        Add New Appointment Type
                    </CardTitle>
                    <CardDescription className="text-center">Ceate a new appointment type</CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className="grid gap-y-5">
                        <div className="flex flex-col space-y-3">
                            <Label>Title</Label>
                            <Input
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                                placeholder="30 min meeting" />
                        </div>
                        <p className="text-red-600">{fields.title.errors}</p>
                        <div className="flex flex-col space-y-3">
                            <Label>Url Slug</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">https://example.com/
                                </span>
                                <Input
                                    name={fields.url.name}
                                    key={fields.url.key}
                                    defaultValue={fields.url.initialValue}
                                    className="rounded-l-none"
                                    placeholder="sarvanmaurya.com/appointment-type" />
                            </div>

                        </div>
                        <p className="text-red-600">{fields.url.errors}</p>

                        <div className="flex flex-col space-y-3">
                            <Label>Description</Label>
                            <Textarea
                                name={fields.description.name}
                                key={fields.description.key}
                                defaultValue={fields.description.initialValue}
                                placeholder="description here"></Textarea>
                        </div>
                        <p className="text-red-600">{fields.description.errors}</p>
                        <div className="flex flex-col space-y-3">
                            <Label>Duration</Label>
                            <Select
                                name={fields.duration.name}
                                key={fields.duration.key}
                                defaultValue={fields.duration.initialValue}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder="Select Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value="15">
                                            15 min
                                        </SelectItem>
                                        <SelectItem value="30">30 min</SelectItem>
                                        <SelectItem value="45">45 min</SelectItem>
                                        <SelectItem value="60">60 min</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <p className="text-red-600">{fields.duration.errors}</p>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <Label>Video Call provider</Label>
                            <input type="hidden" name={fields.videoCallSofterer.name} value={activePlatform} />
                            <ButtonGroup >
                                <Button
                                    className="w-[140px]"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActiovePlatform("Zoom Meeting")
                                    }}
                                    variant={
                                        activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                                    }
                                >Zoom</Button>
                                <Button
                                    className="w-[140px]"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        setActiovePlatform("Google Meet")
                                    }}
                                    variant={activePlatform === "Google Meet" ? "secondary" : "outline"}
                                >Google Meet</Button>
                                <Button
                                    className="w-[140px]"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        setActiovePlatform("Microsoft Teams")
                                    }}
                                    variant={activePlatform === "Microsoft Teams" ? "secondary" : "outline"}

                                >Microsoft Teams</Button>
                            </ButtonGroup>
                            <p className="text-red-600">{fields.videoCallSofterer.errors}</p>
                        </div>

                    </CardContent>
                    <CardFooter className="flex mt-4 justify-between">
                        <Button variant={`secondary`} asChild>
                            <Link
                                className="w-[150px]"
                                href={`/dashboard`}>Cancel</Link>
                        </Button>
                        <SubmitButton text="Create EventType" className="w-[150px]" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    </>)
}