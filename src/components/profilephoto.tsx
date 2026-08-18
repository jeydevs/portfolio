import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfilePhoto() {
    return (
        <div className="flex flex-col items-center py-2">
            <Avatar className="size-36 sm:size-40 lg:size-48">
                <AvatarImage src="/profile.jpg" alt="Jefferson Olvera" />
                <AvatarFallback className="text-3xl lg:text-4xl">JO</AvatarFallback>
            </Avatar>
        </div>
    );
}
