import type { GitHubUser, GitHubRepo } from "@/types/github"

// Mock data for GitHub users
const mockUsers: GitHubUser[] = [
  {
    login: "octocat",
    id: 583231,
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    html_url: "https://github.com/octocat",
    name: "The Octocat",
    bio: "GitHub mascot & official spokes-cat 🐱",
    public_repos: 8,
    followers: 9621,
    following: 9,
  },
  {
    login: "gaearon",
    id: 810438,
    avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",
    html_url: "https://github.com/gaearon",
    name: "Dan Abramov",
    bio: "Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.",
    public_repos: 262,
    followers: 78300,
    following: 171,
  },
  {
    login: "kentcdodds",
    id: 1500684,
    avatar_url: "https://avatars.githubusercontent.com/u/1500684?v=4",
    html_url: "https://github.com/kentcdodds",
    name: "Kent C. Dodds",
    bio: "Improving the world with quality software · Husband, Father, Latter-day Saint, Teacher, OSS",
    public_repos: 593,
    followers: 54200,
    following: 131,
  },
  {
    login: "cassidoo",
    id: 1454517,
    avatar_url: "https://avatars.githubusercontent.com/u/1454517?v=4",
    html_url: "https://github.com/cassidoo",
    name: "Cassidy Williams",
    bio: "Director of Developer Experience at @remotion · she/her",
    public_repos: 137,
    followers: 12900,
    following: 182,
  },
  {
    login: "sindresorhus",
    id: 170270,
    avatar_url: "https://avatars.githubusercontent.com/u/170270?v=4",
    html_url: "https://github.com/sindresorhus",
    name: "Sindre Sorhus",
    bio: "Full-Time Open-Sourcerer · Maker · Into Swift and Node.js",
    public_repos: 1192,
    followers: 58200,
    following: 0,
  },
  {
    login: "tj",
    id: 25254,
    avatar_url: "https://avatars.githubusercontent.com/u/25254?v=4",
    html_url: "https://github.com/tj",
    name: "TJ Holowaychuk",
    bio: "Founder of Apex, Luna, and many open source JS/Go projects.",
    public_repos: 285,
    followers: 44800,
    following: 0,
  },
  {
    login: "wesbos",
    id: 176013,
    avatar_url: "https://avatars.githubusercontent.com/u/176013?v=4",
    html_url: "https://github.com/wesbos",
    name: "Wes Bos",
    bio: "Making really good web development courses!",
    public_repos: 237,
    followers: 26900,
    following: 0,
  },
  {
    login: "thepracticaldev",
    id: 13613037,
    avatar_url: "https://avatars.githubusercontent.com/u/13613037?v=4",
    html_url: "https://github.com/thepracticaldev",
    name: "DEV Community",
    bio: "Community of software developers. Formerly known as @ThePracticalDev.",
    public_repos: 14,
    followers: 1520,
    following: 0,
  },
  {
    login: "vercel",
    id: 14985020,
    avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4",
    html_url: "https://github.com/vercel",
    name: "Vercel",
    bio: "Develop. Preview. Ship.",
    public_repos: 248,
    followers: 9820,
    following: 0,
  },
  {
    login: "bradtraversy",
    id: 5550850,
    avatar_url: "https://avatars.githubusercontent.com/u/5550850?v=4",
    html_url: "https://github.com/bradtraversy",
    name: "Brad Traversy",
    bio: "Full stack web developer and online instructor",
    public_repos: 302,
    followers: 57100,
    following: 0,
  },
]

// Mock repositories for each user
const mockRepos: Record<string, GitHubRepo[]> = {
  octocat: [
    {
      id: 132935648,
      name: "boysenberry-repo-1",
      html_url: "https://github.com/octocat/boysenberry-repo-1",
      description: "Testing",
      stargazers_count: 156,
      language: "HTML",
    },
    {
      id: 18221276,
      name: "git-consortium",
      html_url: "https://github.com/octocat/git-consortium",
      description: "This repo is for demonstration purposes only",
      stargazers_count: 343,
      language: "JavaScript",
    },
    {
      id: 20978623,
      name: "hello-worId",
      html_url: "https://github.com/octocat/hello-worId",
      description: "My first repository on GitHub!",
      stargazers_count: 178,
      language: null,
    },
    {
      id: 1296269,
      name: "Hello-World",
      html_url: "https://github.com/octocat/Hello-World",
      description: "My first repository on GitHub!",
      stargazers_count: 2042,
      language: null,
    },
    {
      id: 64778136,
      name: "octocat.github.io",
      html_url: "https://github.com/octocat/octocat.github.io",
      description: null,
      stargazers_count: 1024,
      language: "HTML",
    },
    {
      id: 17881631,
      name: "Spoon-Knife",
      html_url: "https://github.com/octocat/Spoon-Knife",
      description: "This repo is for demonstration purposes only",
      stargazers_count: 11257,
      language: "HTML",
    },
  ],
  gaearon: [
    {
      id: 23083156,
      name: "redux",
      html_url: "https://github.com/reduxjs/redux",
      description: "Predictable state container for JavaScript apps",
      stargazers_count: 59800,
      language: "TypeScript",
    },
    {
      id: 63537249,
      name: "create-react-app",
      html_url: "https://github.com/facebook/create-react-app",
      description: "Set up a modern web app by running one command",
      stargazers_count: 98700,
      language: "JavaScript",
    },
    {
      id: 36632496,
      name: "react-hot-loader",
      html_url: "https://github.com/gaearon/react-hot-loader",
      description: "Tweak React components in real time",
      stargazers_count: 12200,
      language: "JavaScript",
    },
    {
      id: 75376963,
      name: "overreacted.io",
      html_url: "https://github.com/gaearon/overreacted.io",
      description: "Personal blog by Dan Abramov",
      stargazers_count: 6700,
      language: "JavaScript",
    },
  ],
  kentcdodds: [
    {
      id: 89271847,
      name: "react-testing-library",
      html_url: "https://github.com/testing-library/react-testing-library",
      description: "Simple and complete React DOM testing utilities",
      stargazers_count: 17800,
      language: "JavaScript",
    },
    {
      id: 62352812,
      name: "advanced-react-patterns",
      html_url: "https://github.com/kentcdodds/advanced-react-patterns",
      description: "Advanced React Component Patterns",
      stargazers_count: 4300,
      language: "JavaScript",
    },
    {
      id: 76273809,
      name: "react-hooks",
      html_url: "https://github.com/kentcdodds/react-hooks",
      description: "Learn React Hooks! 🎣 ⚛",
      stargazers_count: 3900,
      language: "JavaScript",
    },
    {
      id: 105784815,
      name: "epic-react-dev",
      html_url: "https://github.com/kentcdodds/epic-react-dev",
      description: "The Epic React Dev website",
      stargazers_count: 1200,
      language: "JavaScript",
    },
  ],
  cassidoo: [
    {
      id: 321980593,
      name: "talks",
      html_url: "https://github.com/cassidoo/talks",
      description: "Talks I've given at events and conferences!",
      stargazers_count: 378,
      language: null,
    },
    {
      id: 28663639,
      name: "getting-a-gig",
      html_url: "https://github.com/cassidoo/getting-a-gig",
      description: "Guide for getting a gig as a tech major",
      stargazers_count: 1100,
      language: null,
    },
    {
      id: 334906298,
      name: "next-netlify-starter",
      html_url: "https://github.com/cassidoo/next-netlify-starter",
      description: "A one-click starter project for Next and Netlify",
      stargazers_count: 342,
      language: "JavaScript",
    },
  ],
  sindresorhus: [
    {
      id: 10639316,
      name: "awesome",
      html_url: "https://github.com/sindresorhus/awesome",
      description: "😎 Awesome lists about all kinds of interesting topics",
      stargazers_count: 223000,
      language: null,
    },
    {
      id: 28239447,
      name: "refined-github",
      html_url: "https://github.com/sindresorhus/refined-github",
      description: "Browser extension that simplifies the GitHub interface and adds useful features",
      stargazers_count: 19700,
      language: "TypeScript",
    },
    {
      id: 32948223,
      name: "p-queue",
      html_url: "https://github.com/sindresorhus/p-queue",
      description: "Promise queue with concurrency control",
      stargazers_count: 3800,
      language: "TypeScript",
    },
    {
      id: 3617179,
      name: "chalk",
      html_url: "https://github.com/chalk/chalk",
      description: "🖍 Terminal string styling done right",
      stargazers_count: 19900,
      language: "JavaScript",
    },
  ],
  tj: [
    {
      id: 73669,
      name: "commander.js",
      html_url: "https://github.com/tj/commander.js",
      description: "node.js command-line interfaces made easy",
      stargazers_count: 24300,
      language: "JavaScript",
    },
    {
      id: 1510194,
      name: "node-progress",
      html_url: "https://github.com/tj/node-progress",
      description: "Flexible ascii progress bar for nodejs",
      stargazers_count: 2700,
      language: "JavaScript",
    },
    {
      id: 1355231,
      name: "co",
      html_url: "https://github.com/tj/co",
      description: "The ultimate generator based flow-control goodness for nodejs",
      stargazers_count: 11300,
      language: "JavaScript",
    },
  ],
  wesbos: [
    {
      id: 46851472,
      name: "JavaScript30",
      html_url: "https://github.com/wesbos/JavaScript30",
      description: "30 Day Vanilla JS Challenge",
      stargazers_count: 21900,
      language: "HTML",
    },
    {
      id: 161810052,
      name: "awesome-uses",
      html_url: "https://github.com/wesbos/awesome-uses",
      description: "A list of /uses pages detailing developer setups",
      stargazers_count: 4100,
      language: "JavaScript",
    },
    {
      id: 56655128,
      name: "Advanced-React",
      html_url: "https://github.com/wesbos/Advanced-React",
      description: "Starter Files and Solutions for Full Stack Advanced React and GraphQL",
      stargazers_count: 3800,
      language: "JavaScript",
    },
  ],
  thepracticaldev: [
    {
      id: 91985779,
      name: "dev.to",
      html_url: "https://github.com/forem/forem",
      description: "For empowering community 🌱",
      stargazers_count: 19700,
      language: "Ruby",
    },
    {
      id: 151348450,
      name: "DEV-ios",
      html_url: "https://github.com/thepracticaldev/DEV-ios",
      description: "DEV Community iOS App",
      stargazers_count: 456,
      language: "Swift",
    },
  ],
  vercel: [
    {
      id: 70107786,
      name: "next.js",
      html_url: "https://github.com/vercel/next.js",
      description: "The React Framework",
      stargazers_count: 98700,
      language: "JavaScript",
    },
    {
      id: 112468814,
      name: "vercel",
      html_url: "https://github.com/vercel/vercel",
      description: "Develop. Preview. Ship.",
      stargazers_count: 10800,
      language: "TypeScript",
    },
    {
      id: 135511454,
      name: "swr",
      html_url: "https://github.com/vercel/swr",
      description: "React Hooks for Data Fetching",
      stargazers_count: 25700,
      language: "TypeScript",
    },
    {
      id: 260287870,
      name: "commerce",
      html_url: "https://github.com/vercel/commerce",
      description: "Next.js Commerce",
      stargazers_count: 7800,
      language: "TypeScript",
    },
  ],
  bradtraversy: [
    {
      id: 202645186,
      name: "50projects50days",
      html_url: "https://github.com/bradtraversy/50projects50days",
      description: "50+ mini web projects using HTML, CSS & JS",
      stargazers_count: 25400,
      language: "CSS",
    },
    {
      id: 230308544,
      name: "design-resources-for-developers",
      html_url: "https://github.com/bradtraversy/design-resources-for-developers",
      description: "Curated list of design and UI resources",
      stargazers_count: 45800,
      language: null,
    },
    {
      id: 243796927,
      name: "vanillawebprojects",
      html_url: "https://github.com/bradtraversy/vanillawebprojects",
      description: "Mini projects built with HTML5, CSS & JavaScript",
      stargazers_count: 13900,
      language: "JavaScript",
    },
  ],
}

// Function to search for a user in our mock data
export async function fetchGitHubUser(username: string): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate different error scenarios
      if (username.toLowerCase() === "error") {
        reject(new Error("Network error: Unable to connect to server"))
        return
      }

      if (username.toLowerCase() === "timeout") {
        reject(new Error("Request timed out. Please check your connection and try again."))
        return
      }

      if (username.toLowerCase() === "ratelimit") {
        reject(new Error("API rate limit exceeded. Please try again later."))
        return
      }

      // Search for the user in our mock data (case insensitive)
      const user = mockUsers.find((user) => user.login.toLowerCase() === username.toLowerCase())

      if (!user) {
        reject(new Error("User not found. Please check the username and try again."))
        return
      }

      // Get the repositories for this user
      const repos = mockRepos[user.login] || []

      resolve({ user, repos })
    }, 800) // Simulate network delay
  })
}

// Function to search for users by partial username
export async function searchGitHubUsers(query: string): Promise<GitHubUser[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve([])
        return
      }

      // Filter users whose username or name contains the query (case insensitive)
      const matchedUsers = mockUsers.filter(
        (user) =>
          user.login.toLowerCase().includes(query.toLowerCase()) ||
          (user.name && user.name.toLowerCase().includes(query.toLowerCase())),
      )

      resolve(matchedUsers)
    }, 300) // Faster response for search suggestions
  })
}

