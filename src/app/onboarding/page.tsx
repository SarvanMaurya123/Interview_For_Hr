// "use client";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { OnBoardingAction } from "../actions";
// import { useForm } from "@conform-to/react";
// import { parseWithZod } from "@conform-to/zod";
// import { OnBoardingSchema } from "../lib/zodSchema";
// import { SubmitButton } from "../components/SubmitButtons";
// import { useActionState } from "react";

// export default function OnBoardingRoute() {

//     const [lastResult, action] = useActionState(OnBoardingAction, undefined)
//     const [form, fields] = useForm({
//         lastResult,
//         onValidate({ formData }) {
//             return parseWithZod(formData, {
//                 schema: OnBoardingSchema
//             });
//         },

//         shouldValidate: "onBlur",
//         shouldRevalidate: "onInput",
//     })
//     console.log(form)
//     return (
//         <div className="min-h-screen w-screen flex items-center justify-center">
//             <Card>
//                 <CardHeader>
//                     <CardTitle className="text-4xl">
//                         Welcome To <span className="text-pink-600">&#60;SM/&#62;</span>
//                     </CardTitle>
//                     <CardDescription>
//                         We need the following information to set up your profile!
//                     </CardDescription>
//                 </CardHeader>
//                 <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
//                     <CardContent className="grid flex-col gap-y-5">
//                         {/* Full Name Field */}
//                         <div className="grid gap-y-3">
//                             <Label>Full Name</Label>
//                             <Input
//                                 name={fields.fullName?.name}
//                                 defaultValue={fields.fullName?.initialValue}
//                                 key={fields.fullName?.key}
//                                 placeholder="Sarvan Maurya"
//                             />
//                             <p className="text-red-500 text-sm">
//                                 {fields.fullName.errors}
//                             </p>
//                         </div>

//                         {/* Username Field */}
//                         <div className="grid gap-y-3">
//                             <Label>Username</Label>
//                             <div className="flex rounded-md">
//                                 <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
//                                     sarvan.com/
//                                 </span>
//                                 <Input
//                                     name={fields.userName?.name}
//                                     defaultValue={fields.userName?.initialValue}
//                                     key={fields.userName?.key}
//                                     placeholder="example-user-1"
//                                     className="rounded-l-none"
//                                 />
//                             </div>
//                             <p className="text-red-500 text-sm mb-2">
//                                 {fields.userName.errors}
//                             </p>

//                         </div>
//                     </CardContent>

//                     <CardFooter>
//                         <SubmitButton text="Submit" className="w-full" />
//                     </CardFooter>
//                 </form>
//             </Card>
//         </div>
//     );
// }


"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnBoardingAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { OnBoardingSchema } from "../lib/zodSchema";
import { SubmitButton } from "../components/SubmitButtons";
import { useActionState } from "react";


export default function OnBoardingRoute() {
    const [lastResult, action] = useActionState(OnBoardingAction, undefined);

    // ✅ Improved form handling with better validation
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: OnBoardingSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl">
                        Welcome To <span className="text-pink-600">&#60;SM/&#62;</span>
                    </CardTitle>
                    <CardDescription>
                        We need the following information to set up your profile!
                    </CardDescription>
                </CardHeader>

                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className="grid flex-col gap-y-5">
                        {/* Full Name Field */}
                        <div className="grid gap-y-3">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name={fields.fullName?.name}
                                defaultValue={fields.fullName?.initialValue}
                                key={fields.fullName?.key}
                                // onChange={form.onChange} // ✅ Ensures validation updates
                                placeholder="Sarvan Maurya"
                            />
                            <p className="text-red-500 text-sm">
                                {fields.fullName.errors?.join(", ")}
                            </p>
                        </div>

                        {/* Username Field */}
                        <div className="grid gap-y-3">
                            <Label htmlFor="userName">Username</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                                    sarvan.com/
                                </span>
                                <Input
                                    id="userName"
                                    name={fields.userName?.name}
                                    defaultValue={fields.userName?.initialValue}
                                    key={fields.userName?.key}
                                    //onChange={form.onChange} // ✅ Ensures validation updates
                                    placeholder="example-user-1"
                                    className="rounded-l-none"
                                />
                            </div>
                            <p className="text-red-500 text-sm mb-2">
                                {fields.userName.errors?.join(", ")}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <SubmitButton text="Submit" className="w-full" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
