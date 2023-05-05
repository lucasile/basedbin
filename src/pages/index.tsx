import { trpc } from "../utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import { sanitizePaste, validatePaste } from "../utils/pasteutils";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const Home: NextPage = ({ }) => {
  const waiting = "Baste!";
  const working = "Basting...";

  const router = useRouter();

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [buttonText, setButtonText] = useState(waiting);
  const [isLink, setLink] = useState(false);
  const [uuid] = useState(uuidv4());
  const [url, setURL] = useState<string>("");

  const inputMutation = trpc.useMutation(["paste.createPaste"], {
    onSuccess: () => {
      setLink(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {

    if (!router.isReady) {
      return;
    }

    if (url === "") {
      return;
    }

    router.push(`/paste/${url}`);
    
  }, [router.isReady, url, router]);

  trpc.useQuery(["paste.getPaste", { id: uuid }], {
    enabled: isLink,

    onSuccess: (data) => {

      const urlID: string = data?.urlID as string;
      setURL(urlID);

    },
  });

  const handleInput = async (content: string) => {
    inputMutation.mutate({
      id: uuid,
      text: content,
    });
  };

  const handleClick = (): void => {
    if (isLink) {
      return;
    }

    if (buttonText === working) return;

    if (contentRef.current == null) return;

    setButtonText(working);

    const sanitizedContent: string = sanitizePaste(contentRef.current.value);

    if (!validatePaste(sanitizedContent)) {
      setButtonText(waiting);
      return;
    }

    handleInput(sanitizedContent);
  };

  return (
    <>
      <Head>
        <title>BasedBin</title>
        <meta name="description" content="It's Based" />
      </Head>

      <main className="container mx-auto flex flex-col items-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-500">
          <span className="text-orange-300">Based</span>Bin
        </h1>
        <p className="text-2xl text-gray-700 pb-8">Start basting!</p>

        <section className="flex flex-grow w-3/4 justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
          <textarea
            ref={contentRef}
            className="pastebox whitespace-pre-line border-none outline-none resize-y overflow-x-auto overflow-y-auto min-w-full min-h-full"
            placeholder="Begin basting here..."
          ></textarea>
        </section>

        <div className="pt-8 text-2xl text-white flex justify-center items-center w-full">
          <button
            className={
              "border-none p-4 rounded-lg transition ease-in-out delay-50 hover:scale-110 duration-300 hover:bg-orange-400 bg-orange-300"
            }
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>

      </main>
    </>
  );
};

export default Home;
