import { Button } from "../components/ui/button";
  import Prism from '@/src/components/Prism.tsx';
import FadeContent from "@/src/components/FadeContent.tsx";
import {Bento} from "@/src/components/Bento.tsx";
import TextType from "@/src/components/TextType.tsx";

function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Bun + React + Tailwind + shadcn</h1>
      <p className="text-muted-foreground">
        This is a starter template. Edit src/client/App.tsx and src/components to get started.
      </p>
      <div className="flex gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  );
}

function About() {
  return <p className="text-muted-foreground">About route via React Router.</p>;
}

export default function App() {
  return (
    <FadeContent>

<div className={ "w-screen min-h-screen bg-black z-0 p-0 m-0 font-mono"}>
  <Prism
    animationType="hover"
    timeScale={0.5}
    height={3.6}
    baseWidth={5.5}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    noise={0}
    glow={1}
  />
<div className="relative top-0 left-0 w-full min-h-screen flex justify-center items-start sm:items-center antialiased overflow-y-auto">
<div className="w-3/4 px-4 py-16 mx-auto sm:px-6 lg:px-8 text-center text-3xl text-white ">
    <TextType
  text={["Hi, I’m Sehnya — Full-Stack Developer.", "I build clean, modern apps with code & creativity.", "Turning ideas into full-stack interactive web experiences."]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
    <Bento/>
</div>
</div>
</div></FadeContent>
  );
}

function ApiTester() {
  async function callApi() {
    const res = await fetch("/api/hello");
    const data = await res.json();
    alert(data.message);
  }
  return (
    <Button variant="outline" onClick={callApi}>Call API</Button>
  );
}
