import "server-only";
import { cv } from "../../../cv/cv-data.mjs";
import es from "../../../messages/es.json";
import en from "../../../messages/en.json";
import { site } from "@/config/site";
import { projectCode, projects } from "@/data/projects";
import { stack } from "@/data/stack";
import type { AskRequest } from "./schema";

// Todo lo que el asistente sabe sale de lo que el sitio ya publica
// (textos de messages/, datos de proyectos, stack y CV): no hay una copia
// escrita a mano que se pueda desactualizar. El texto tiene que ser
// determinista (sin fechas ni ids) para que el prompt caching funcione.

type Lang = AskRequest["lang"];

const messages = { es, en } as const;

type CaseStudy = { title: string; summary: string; problem: string; decisions: string; result: string };

function section(id: string, title: string, body: string[]) {
  return [`<source id="${id}" title="${title}">`, ...body, "</source>"].join("\n");
}

export function buildKnowledge(lang: Lang): string {
  const m = messages[lang];
  const data = cv[lang];
  const items = m.projects.items as Record<string, CaseStudy>;
  const status = m.projects.status as Record<string, string>;

  const blocks: string[] = [];

  blocks.push(
    section("about", m.about.title, [
      `Name: ${site.name}`,
      `Role: ${data.role}`,
      `Profile: ${data.profile}`,
      m.about.paragraphs.intro,
      m.about.paragraphs.industry,
      m.about.paragraphs.ai,
      `Experience: ${data.experience
        .map((e) => `${e.role}, ${e.org} (${e.meta}): ${e.bullets.join(" ")}`)
        .join(" | ")}`,
      `Education: ${data.education
        .map((e) => [e.title, e.org, e.meta].filter(Boolean).join(", "))
        .join(" | ")}`,
      `Languages: ${data.languages.map((l) => `${l.label}: ${l.value}`).join("; ")}`,
    ]),
  );

  for (const project of projects) {
    const item = items[project.slug];
    blocks.push(
      section(project.slug, `${projectCode(project.slug)} ${item.title}`, [
        `Status: ${status[project.status]}`,
        `Stack: ${project.stack.join(", ")}`,
        project.demoUrl ? `Demo: ${project.demoUrl}` : "",
        project.repoUrl ? `Code: ${project.repoUrl}` : "",
        `Summary: ${item.summary}`,
        `Problem: ${item.problem}`,
        `Decisions: ${item.decisions}`,
        `Result: ${item.result}`,
      ].filter(Boolean)),
    );
  }

  blocks.push(
    section("stack", m.about.stackTitle, [
      `Technologies: ${stack.join(", ")}`,
      ...data.skills.map((s) => `${s.label}: ${s.value}`),
    ]),
  );

  blocks.push(
    section("availability", m.contact.title, [
      `Status: ${m.about.facts.status}. Work mode: ${m.about.facts.mode}. Location: ${data.location}.`,
      m.about.paragraphs.looking,
      `Freelance services: ${Object.values(m.services.items).join("; ")}.`,
      `Contact: contact form on this site, email ${site.email}, LinkedIn ${site.linkedin}, GitHub ${site.github}.`,
    ]),
  );

  return blocks.join("\n\n");
}
