export interface BlogPostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const BLOG_POSTS: BlogPostProps[] = [
  {
    userId: 1,
    id: 1,
    title: "How We Designed Our Scariest Escape Room",
    body: `
Our goal was to create an unforgettable horror experience.

The process took over 6 months.

We tested more than 40 puzzle ideas.

In the end, we built a room only 18% of players manage to escape.
`,
  },

  {
    userId: 2,
    id: 2,
    title: "Top 5 Tips for Escape Room Beginners",
    body: `
Escape rooms can be challenging if you're new.

Here are our top tips:

1. Communicate with your team
2. Check everything carefully
3. Stay calm
4. Organize your clues
5. Have fun

Teamwork is the key to success.
`,
  },

  {
    userId: 1,
    id: 3,
    title: "Why Escape Rooms Are Perfect for Team Building",
    body: `
Escape rooms improve:

- communication
- teamwork
- problem-solving skills

Many companies use escape rooms to strengthen their teams.
`,
  },

  {
    userId: 3,
    id: 4,
    title: "How We Create Escape Room Puzzles",
    body: `
Every puzzle starts with an idea.

Then we prototype it.

After testing, we improve it.

Only the best puzzles make it into our rooms.
`,
  },

  {
    userId: 2,
    id: 5,
    title: "Most Common Escape Room Mistakes",
    body: `
The most common mistakes are:

- ignoring obvious clues
- poor communication
- overthinking simple solutions

Stay calm and work together.
`,
  },

  {
    userId: 3,
    id: 6,
    title: "Behind the Scenes: What Players Don't See",
    body: `
Our team works every day behind the scenes.

We fix props.

Test puzzles.

And create new surprises.

Everything to make your experience perfect.
`,
  },

  {
    userId: 1,
    id: 7,
    title: "Crazy Escape Stories From Our Players",
    body: `
One team escaped with 2 seconds left.

Another team screamed the entire time.

Every game creates a unique story.
`,
  },

  {
    userId: 2,
    id: 8,
    title: "The Future of Escape Rooms",
    body: `
The future is exciting.

We are working on:

- VR escape rooms
- AI-powered puzzles
- Interactive storytelling

Escape rooms will become even more immersive.
`,
  },
];