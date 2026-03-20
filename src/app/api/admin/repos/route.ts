import { NextResponse } from "next/server";
import { GithubRepository } from "@/types/project";

const GITHUB_USERNAME = "autsav";
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not set. Add it to .env.local to load real repos." },
      { status: 503 }
    );
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        repositories(first: 50, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
          nodes {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            pushedAt
            repositoryTopics(first: 5) {
              nodes {
                topic { name }
              }
            }
            primaryLanguage {
              name
              color
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 1) {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub API request failed." }, { status: 500 });
  }

  const { data, errors } = await res.json();
  if (errors) {
    return NextResponse.json({ error: "GraphQL error", details: errors }, { status: 500 });
  }

  const nodes: GithubRepository[] = data.user.repositories.nodes;
  return NextResponse.json({ repos: nodes });
}
