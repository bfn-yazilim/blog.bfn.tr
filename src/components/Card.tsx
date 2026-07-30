import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "font-display text-xl font-normal tracking-tight sm:text-2xl",
  };

  return (
    <li className="border-t border-skin-line py-7 first:border-t-0">
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        className="mb-2"
      />
      <a
        href={href}
        className="inline-block text-skin-base hover:text-skin-accent"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <p className="mt-2 max-w-xl text-skin-base/70">{description}</p>
    </li>
  );
}
