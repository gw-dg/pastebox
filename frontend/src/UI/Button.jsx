import { Button } from "@material-tailwind/react";

export function ButtonVariants() {
  return (
    <div className="flex w-max gap-4">
      <Button variant="gradient" className="rounded-full" color="black">
        Create
      </Button>
    </div>
  );
}
