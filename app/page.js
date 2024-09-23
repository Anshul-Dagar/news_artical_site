import Link from 'next/link'
import { supabase } from "@/lib/supabaseClient";
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default async function Home() {

  const {data, error} = await supabase.from('articles').select();
  if (error) {
    console.error("Error fetching article :", error);
    return <p>Failed to load articles</p>;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] item-center justify-items-center min-h-screen p-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="bg-[#b09f79] shadow-lg p-4 w-full text-zinc-800 text-left rounded-lg font-happy-monkey text-3xl md:text-3xl font-bold leading-tight tracking-wide">News Articles</h1>

        <ul clsssName="space-y-4">
          {data?.map((article)=> (
            <li key ={article.id} className="my-4">
              <Card className="bg-[#b09f79]">
            <CardHeader>
              <CardTitle>
                    <Link href={article.Link} target="_blank" className="hover:underline text-justify">
                    {article.Title}
                    </Link>
              </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <p className="border-solid border-2 border-[#476074] rounded-2xl p-2">{article.tag_1}</p>
                <Separator orientation="vertical"/>
                <p className="border-solid border-2 border-[#476074] rounded-2xl p-2">{article.tag_2}</p>
                <Separator orientation="vertical" />
                <p className="border-solid border-2 border-[#476074] rounded-2xl p-2">{article.tag_3}</p>
              </CardContent>
          </Card>
            </li>
          )
          )}
        </ul>
      </main>
    </div>
  );
}
