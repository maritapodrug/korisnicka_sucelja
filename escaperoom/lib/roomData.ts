// lib/roomsData.ts
export interface Room {
  id: string
  title: string
  description: string
  img: string
  minPlayers:number
  maxPlayers:number
  details: string
  blurDataURL?: string
}

export const rooms: Room[] = [
  {
    id: "time-machine",
    title: "CHRONOCRASH: THE TIME RIFT",
    description: "Trapped in a broken time machine, you're jumping through timelines. Fix the machine — or be erased from history.",
    img: "/rooms/room11.webp",
    blurDataURL: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAQBQCdASoUABwAPu1mqU2ppaOiMAgBMB2JZAC2yCHhehnke8mKkk3Vs+ArpkjaAXMAAP70KP8OyegP4VH+ItBBSzn43BoN8zkeNM1MdrsLE9gzqZJXa4cx4wjZfi06zMBQADj32OvfmSrBy5e3yuoeIHnYv0/4MoyoMPFsFkNEQUY0UnSYokPZ+amwAA==",
    minPlayers:2,
    maxPlayers:5,
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
    img: "/rooms/room22.webp",
    blurDataURL: "data:image/webp;base64,UklGRqIAAABXRUJQVlA4IJYAAACwBACdASoUABsAPu1qq1EppaOiqAqpMB2JQBadAb6FPHQEX+2dUfvFTWQAQiiAAP7Oz72UZ5d3S9Pdec8H08BpvBBcX8W9FYyDLrUjPYIw0aVFD+Kc1CIa8ymcixuCxXC/ko/uybMRtDEB7BXTPuYvRSK17HUzVd8htdmm3RNA1tE0VqagPIRi3x/De1FGHaVbABHsAAA=",
    minPlayers:3,
    maxPlayers:6,
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
    img: "/rooms/room3.webp",
    blurDataURL: "data:image/webp;base64,UklGRhgBAABXRUJQVlA4IAwBAAAwBwCdASoUACQAPu1opk+ppiMiKqwBMB2JQBUk/XG3H1OKkbABmwZKz0BDxF2xjsiSFp99C1OOZfoqLgkVJYLxdwAA/s3JfNZNYW+Ki1CA6s1OztjILc5xtzvNLMXhHzyRS0/l4ngne0i6dYKW/QDKflooEi3z6QDUIIiNULNmJ4uES0BGjgKGA29r55NGmUSIDTeBErJJcVg1PUAJffg17XGiCoIBDngFZ3yrlOK8sceNidWkSo9xb5bigctDy1QI3JFZ3VU6sWhC0MrCgg94OTXD8oBqAGEYthe+dnOoiaksnUw1Eoh/LJ9OkWVl4ViW8GNKuGBi9cjNwvx9eA9vpmRESFcsDgqQAAAA",
    minPlayers:2,
    maxPlayers:4,
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
