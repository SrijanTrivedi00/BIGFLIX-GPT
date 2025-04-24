import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen overflow-hidden z-2">
      {/* Retro Background Image - Fixed */}
      <div className="fixed inset-0 -z-10 mt-3">
        <img 
          className="w-full h-full object-cover brightness-50" 
          src={BG_URL} 
          alt="retro cinema background" 
        />
        {/* Retro overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-violet-900/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDQiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Main Content with Retro Styling */}
      <div className="relative pt-12 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Retro Title */}
       

        {/* Search Components with Retro Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg shadow-white/10 ring-1 ring-white/10">


         <h1 className="text-center my-5 z-10" >
          <span className="inline-block text-4xl sm:text-6xl font-bold text-amber-400 font-serif tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-600">
            LETS GO!!!
          </span>
          <span className="block mt-2 text-lg text-amber-200 font-mono tracking-widest">
            Let AI Recommend you movies based on your thoughts
          </span>
        </h1>
          <GptSearchBar />
          <div className="mt-8">
            <GptMovieSuggestions />
          </div>
        </div>

        {/* Retro Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-30"></div>
      </div>

      {/* Retro Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSIxLDMiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
    </div>
  );
};

export default GPTSearch;