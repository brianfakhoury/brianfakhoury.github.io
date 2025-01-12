import { getPost } from "@/lib/get-posts";
import getLinks from "@/lib/get-links";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FadeInImage from "@/components/fade-in-image";
import cover from "./opengraph-image.jpg";
import { ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function Home() {
  const links = getLinks();
  const post = await getPost();

  return (
    <div className="max-w-screen-sm mx-auto space-y-8">
      {post && (
        <Card className="bg-muted/50 hover:bg-muted">
          <CardContent className="px-5 py-3">
            <Link
              href={post.slug}
              className="group flex items-center justify-between text-pretty"
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-stone-500 dark:bg-stone-300 rounded-full"></span>
                <span>
                  New writing:{" "}
                  <span className="text-stone-500 dark:text-stone-300">
                    <span className="font-greatVibes">{post.title.charAt(0)}</span>
                    {post.title.slice(1)}
                  </span>
                </span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          </CardContent>
        </Card>
      )}

      <Card className="relative p-0 overflow-hidden bg-transparent border-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/95 to-background" />
        <FadeInImage
          src={cover}
          alt="Cover image"
          className="absolute inset-0 w-full h-full object-cover object-center"
          priority
        />

        <CardContent className={cn(
          "relative z-10 prose dark:prose-invert text-pretty",
          "backdrop-blur-sm bg-background/50 rounded-lg",
          "sm:mx-8 sm:my-8 px-6 py-10 sm:p-10"
        )}>
          <p>
            Dearest web surfer, you&apos;ve come knocking on my digital door.
            Welcome. I built this website for you to enjoy, if you will, and for
            myself to play with the latest web technologies. You can continue
            down to my links or see my <Link href="/writing">writing archive</Link>.
          </p>
          <p>
            These days, my time is spent contributing to the growth of Mach
            Industries, a defense tech company. However, I deeply appreciate
            time taken to think, create, and invite serendipity. It&apos;s why I
            built this site by hand and painstakingly optimized it. So, spend as
            long as you wish here, and if I may, I suggest you view my thoughts
            through a few lenses:
          </p>
          <ol>
            <li>
              My primary motivation is to work on things that are uncomfortably
              hard for my skill-level.
            </li>
            <li>
              I view the world through rationality.
            </li>
            <li>
              Technology is engraved in who I am, I appreciate beautiful
              technology for its existence.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Accordion
        type="single"
        collapsible
        defaultValue="list"
      >
        {links.map((category) => (
          <AccordionItem
            key={category.title}
            value={category.title}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex">
                <span className="first-letter:font-greatVibes text-lg">{category.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2">
              <div className="space-y-2">
                {category.items.map((item, j) => (
                  <Link
                    key={j}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    <span className="text-pretty">{item.content}</span>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
