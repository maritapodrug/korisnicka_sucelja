// lib/roomsData.ts
export interface Room {
  id: string
  title: string
  description: string
  img: string
  details: string
}

export const rooms: Room[] = [
  {
    id: "time-machine",
    title: "CHRONOCRASH: THE TIME RIFT",
    description: "Trapped in a broken time machine, you're jumping through timelines. Fix the machine — or be erased from history.",
    img: "/rooms/room11.jpg",
    details: `
Welcome to CHRONOCRASH: THE TIME RIFT.  

In this room you will:

- Solve complex time-travel puzzles.
- Repair broken timelines.
- Avoid paradoxes that could erase your existence.
- Work together to escape before history is rewritten.

Ideal for 2–5 players. Difficulty: Hard.
`
  },
  {
    id: "the-heist",
    title: "THE MASTERPIECE HEIST",
    description: "Infiltrate the city's most secure museum and steal a priceless painting. The plan was perfect — until the alarms went off. The clock is ticking.",
    img: "/rooms/room22.jpg",
    details: `
THE MASTERPIECE HEIST:  

Your mission:

- Break into a highly secured museum.
- Bypass laser security grids.
- Solve logical codes and alarms.
- Grab the priceless painting and escape without triggering security.

Perfect for 3–6 players. Difficulty: Medium-Hard.
`
  },
  {
    id: "pharaohs-curse",
    title: "CURSE OF THE PHARAOH",
    description: "You've entered a long-lost pharaoh's tomb, but the door has sealed behind you. Solve ancient puzzles and escape the curse — or be buried forever.",
    img: "/rooms/room3.jpg",
    details: `
CURSE OF THE PHARAOH:  

Challenges you will face:

- Decode hieroglyphs to find hidden paths.
- Unlock ancient mechanisms and traps.
- Solve riddles left by the Pharaoh.
- Escape the tomb before the curse seals you forever.

Best for 2–4 players. Difficulty: Hard.
`
  }
]
