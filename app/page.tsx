import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 min-h-screen items-center justify-start bg-stone-500 font-sans px-24 py-24">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Conway's Game of Life
      </h1>
      <p className="mt-24">
        The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can be used to simulate a universal constructor or any other Turing machine.
      </p>
      <Link href="/game">
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Play Game
        </button>
      </Link>
    </main>
  );
}
