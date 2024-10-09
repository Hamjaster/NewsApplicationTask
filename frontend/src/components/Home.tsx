import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

// Sample news data
const sampleNews = [
  {
    id: 1,
    title: "SpaceX Successfully Launches New Satellite",
    date: "2023-10-08",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Landmark Agreement",
    date: "2023-10-07",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Tech Giants Announce Collaboration on AI Ethics",
    date: "2023-10-06",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "New Study Reveals Promising Cancer Treatment",
    date: "2023-10-05",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Record-Breaking Heatwave Sweeps Across Europe",
    date: "2023-10-04",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Major Breakthrough in Quantum Computing Announced",
    date: "2023-10-03",
    image: "/placeholder.svg?height=200&width=300",
  },
];

type NewsType = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export default function Home() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/api/news");
      // Filtering the removed news articles
      const filteredNews = data.filter(
        (article: NewsType) => article.source.id
      );
      setNews(filteredNews);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <header className="w-full bg-white shadow">
        <div className=" mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Latest News
          </h1>
        </div>
      </header>
      <main>
        {!loading && error && (
          <div className=" h-[70vh] text-center w-full flex justify-center items-center">
            <div className="text-5xl text-red-600 font-medium">{error}</div>
          </div>
        )}
        {loading ? (
          <div className=" h-[70vh] text-center w-full flex justify-center items-center">
            <div className="animate-spin text-2xl w-min ">
              <ImSpinner8 />
            </div>
          </div>
        ) : (
          <div className="w-full mx-auto py-6 sm:px-6 lg:px-16">
            <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <a className="cursor-pointer" target="_" href={article.url}>
                  <div
                    key={article.source.id}
                    className="bg-white hover:shadow-xl cursor-pointer  overflow-hidden shadow-sm rounded-lg"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${article.urlToImage})`,
                      }}
                      className="relative  overflow-hidden transition-all bg-cover bg-center  h-48"
                    ></div>
                    <div className="p-4">
                      <h2 className="text-lg leading-snug font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h2>
                      <p className="text-sm mt-2 text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
