import { getPosts, getPost } from "@/lib/get-posts";
import Link from "next/link";
import Image from "next/image";
import FadeInImage from "@/app/components/fade-in-image";
import { formatDateForBlogPost } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Code } from "bright";
import React from "react";
import { notFound } from "next/navigation";
import sizeOf from "image-size";
import remarkUnwrapImages from "remark-unwrap-images";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  const { tags, date, modified, origin, image, title, body } = post;
  const image_cover_size = image
    ? sizeOf(`content/posts/${image}`)
    : { width: 500, height: 500 };

  return (
    <>
      <article className="prose prose-stone dark:prose-invert text-pretty break-words mx-auto">
        <header>
          <time dateTime={date.toISOString()} className="block mb-5 text-sm">
            {formatDateForBlogPost(date)}
          </time>
          {modified && (
            <time
              dateTime={modified.toISOString()}
              className="block mb-5 text-sm"
            >
              Updated on {formatDateForBlogPost(modified)}
            </time>
          )}
          <h1 className="first-letter:font-greatVibes">{title}</h1>
          {origin && (
            <aside className="text-xs">
              Originally published at{" "}
              <Link
                href={origin.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {origin.hostname}
              </Link>
            </aside>
          )}
          {image && (
            <div className="rounded-lg absolute inset-0 max-w-screen-xl h-[550px] z-[-3] mx-auto overflow-hidden	">
              <FadeInImage
                src={image.startsWith("/") ? image : `/${image}`}
                alt={`${title} cover image`}
                height={image_cover_size.height}
                width={image_cover_size.width}
                className="absolute inset-x-0 bottom-0 w-full h-3/4 object-cover z-[-2] m-0"
                priority
              />
              <div
                className={`absolute inset-0 z-10 bg-gradient-to-b from-background from-30%`}
              />
            </div>
          )}
        </header>

        <section className={`relative ${image && "mt-10"}`}>
          {image && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-screen max-w-3xl h-96 rounded-lg bg-gradient-to-b from-background/40 to-background to-40% z-[-2]" />
          )}
          <ReactMarkdown
            className="first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left pt-3"
            remarkPlugins={[remarkUnwrapImages]}
            components={{
              code: ({ ...props }) => (
                <Code
                  lang={props.className?.split("-")[1]}
                  title={props.className?.split("-")[1]}
                  lineNumbers
                  {...props}
                />
              ),
              img: ({ ...props }) => {
                const image_size = sizeOf(`content/posts/${props.src}`);
                const image_src = props.src?.startsWith("/")
                  ? props.src
                  : `/${props.src}`;

                return (
                  <figure>
                    <Image
                      src={image_src}
                      alt={props.alt || "blog image"}
                      height={image_size.height || 450}
                      width={image_size.width || 500}
                      className="rounded-lg"
                    />
                    {props.alt && (
                      <figcaption className="text-center">
                        {props.alt}
                      </figcaption>
                    )}
                  </figure>
                );
              },
              a: ({ ...props }) => {
                if (!props.href) return <>{props.children}</>;
                return (
                  <Link
                    href={props.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.children}
                  </Link>
                );
              },
            }}
          >
            {body}
          </ReactMarkdown>
        </section>

        <footer className="not-prose flex flex-col space-y-4 mt-12">
          <hr className="border-t border-stone-300" />
          <div className="flex flex-wrap gap-3">
            {tags.map((tag: string, i: number) => (
              <Link href={`/writing/${tag}`} key={i}>
                #{tag}
              </Link>
            ))}
          </div>
          <Link href="/writing">← All writing</Link>
        </footer>
      </article>
    </>
  );
}
