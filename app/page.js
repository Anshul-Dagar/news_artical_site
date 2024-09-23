import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {

  const {data, error} = await supabase.from('articles').select();
  if (error) {
    console.error("Error fetching article :", error);
    return <p>Failed to load articles</p>;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold mb-4 ">News Article</h1>
        <ul clsssName="space-y-4">
          {data?.map((article)=> (
            <li key ={article.id}>
              <a href={article.Link} className="text-blue-500 hover:underline">
                {article.Title}
              </a>
            </li>
          )
          )}
        </ul>
      </main>
    </div>
  );
}
