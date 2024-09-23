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
        <h1 className="text-2xl font-bold mb-4 ">News Articles</h1>

        <ul clsssName="space-y-4">
          {data?.map((article)=> (
            <li key ={article.id} className="my-4">
              <Card>
            <CardHeader>
              <CardTitle>
                    <Link href={article.Link} target="_blank" className="hover:underline text-justify">
                    {article.Title}
                    </Link>
              </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <p>{article.tag_1}</p>
                <Separator orientation="vertical"/>
                <p>{article.tag_2}</p>
                <Separator orientation="vertical" />
                <p>{article.tag_3}</p>
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
