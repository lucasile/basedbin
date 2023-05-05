import { trpc } from "../../utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Paste: NextPage = () => {
  const [canFetch, setCanFetch] = useState(false);
  const [urlID, setURLID] = useState<string>("");

  const router = useRouter();

  useEffect(() => {

    if (!router.isReady) return;

    setURLID(router.query.urlID as string);
    setCanFetch(true);
    
  }, [router.isReady]);

  const query = trpc.useQuery(["paste.getPasteContents", { urlID: urlID }], {
    enabled: canFetch,
  });
  
  if (query.data == null) {
    //juggling check
    return (
      <h1 className="absolute top-1/3 w-full h-full text-center">404</h1>
    );
  }

  return <pre>{query.data.content}</pre>;


};

export default Paste;
