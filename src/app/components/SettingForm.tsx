"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "./SubmitButtons"
import { useActionState } from "react"
import { useState } from "react"
import { SettingsAction } from "../actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { settingSchema } from "../lib/zodSchema"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { UploadDropzone } from "../lib/uploadthings"
import { toast } from "sonner"

interface iAppProps {
    fullName: string;
    email: string;
    profileImage: string;
}

export function SeetingsForm({ email, fullName, profileImage }: iAppProps) {
    const [lastResult, action] = useActionState(SettingsAction, undefined);

    const [currentProfileImage, setCurrentProfileImage] = useState(profileImage)


    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: settingSchema,
            });
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: "onInput"

    });

    const handleDeleteImage = () => {
        setCurrentProfileImage("")
    }

    return (<>
        <Card>
            <CardHeader>
                <CardTitle className="text-4xl">Settings</CardTitle>
                <CardDescription>Manage Your Account Settings!</CardDescription>

            </CardHeader>
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
                <CardContent className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-4">
                        <Label>Full Name</Label>
                        <Input placeholder="Sarvan Maurya"
                            defaultValue={fullName}
                            name={fields.fullName.name}
                            key={fields.fullName.key}
                        />
                        <p>{fields.fullName.errors}</p>
                    </div>
                    <div className="flex flex-col gap-y-4 ">
                        <Label>Email</Label>
                        <Input placeholder="test@test.com"
                            defaultValue={email}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col gap-y-5 ">
                        <Label>Profile Image</Label>
                        <input type="hidden"
                            name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage}
                        />
                        {currentProfileImage ? (

                            <div className="relative size-20">
                                <img src={currentProfileImage} alt="Profile Image" width={100} height={100} />

                                <Button
                                    onClick={handleDeleteImage}
                                    type="button"
                                    className="absolute -top-3 -right-3 "
                                    size={`icon`}
                                    variant="destructive">
                                    <X className="size-4" />
                                </Button>
                            </div>
                        ) : (
                            <UploadDropzone
                                onClientUploadComplete={(res) => {
                                    if (res && res.length > 0) {
                                        setCurrentProfileImage(res[0].url);
                                        toast.success("Profile Image uploaded successfully");
                                    } else {
                                        toast.error("Failed to upload profile image");
                                    }
                                }}
                                endpoint="imageUploader"
                                className="w-96 h-60 mb-4"
                            />

                        )}
                        <p className="text-red-500">{fields.profileImage.errors}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Save Changes" />
                </CardFooter>
            </form>
        </Card>
    </>)
}