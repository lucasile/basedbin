import { trpc } from "../../utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Paste: NextPage = () => {
  const [canFetch, setCanFetch] = useState(false);
  const [error, setError] = useState(false); 
  const [urlID, setURLID] = useState<string>("");
  const [copied, setCopied]= useState(false);

  const router = useRouter();

  useEffect(() => {

    if (!router.isReady) return;

    setURLID(router.query.urlID as string);
    setCanFetch(true);
    
  }, [router.isReady, router.query.urlID]);

  const query = trpc.useQuery(["paste.getPasteContents", { urlID: urlID }], {
    enabled: canFetch,
    onSuccess: (data) => {
      if (data == null) {
        setError(true);
      } 
    }
  });
  
  if (error) {
    //juggling check
    return (
      <h1 className="absolute top-1/3 w-full h-full text-center">404</h1>
    );
  }

  if (query.data == null) {
    return <></>;
  }

  const handleClick = () => {
    navigator.clipboard.writeText(`https://basedbin.vercel.app/paste/${urlID}`);
    setCopied(true);
  };

  return (
    <>
      <main className="container mx-auto flex flex-col items-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-500">
          <span className="text-orange-300">Based</span>Bin
        </h1>

        <section className="flex flex-grow w-3/4 justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
          <textarea readOnly={true}
            className="pastebox whitespace-pre-line border-none outline-none resize-y overflow-x-auto overflow-y-auto min-w-full min-h-full"
          >{query.data.content}</textarea>
        </section>

        <div className="pt-8 text-2xl text-white flex justify-center items-center w-full">
          <button
            className={
              (copied ? "hover:bg-green-500 " : "hover:bg-orange-400 ") +
              (copied ? "bg-green-400 " : "bg-orange-300 ") +
              "border-none p-4 rounded-lg transition ease-in-out delay-50 hover:scale-110 duration-300"
            }
            onClick={handleClick}
          >
            {copied ? "Copied" : "Copy link to clipboard"}           
          </button>
        </div>

      </main>
    </>
  );


};

export default Paste;
