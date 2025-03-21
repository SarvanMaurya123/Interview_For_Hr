import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { signIn } from "../lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons";

export function AuthModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-pink-500 px-11 py-6  font-bold hover:bg-pink-600">Try for Free</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader>
                    <h2 className="text-3xl font-bold p-7 text-center text-pink-500 hover:text-pink-600">{"<SM/>"}</h2>
                </DialogHeader>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                    className="w-full">
                    <GoogleAuthButton />
                </form>
                <form
                    action={async () => {
                        "use server"
                        await signIn("github")
                    }}
                    className="w-full">
                    <GithubAuthButton />
                </form>
            </DialogContent>
        </Dialog>
    );
}
