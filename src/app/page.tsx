import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      home page
      <div>
        <Button variant={"outline"}>test me</Button>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur,
        molestiae? Facere repellat nulla tenetur illo cum voluptatibus, dolore
        nesciunt rem! Quae doloribus ab animi assumenda doloremque placeat
        exercitationem corrupti voluptate?
      </div>
    </div>
  );
}
