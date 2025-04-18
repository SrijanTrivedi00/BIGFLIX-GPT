import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="fixed w-full px-4 py-2 bg-black bg-opacity-30 z-10 flex flex-col md:flex-row justify-between items-center backdrop-blur-sm">
      <div className="text-[2rem] md:text-[2.5rem] font-extrabold text-red-600 tracking-widest mx-auto md:mx-0">
        BIGFLIX <span className="text-white">GPT</span>
      </div>
  
      {user && (
        <div className="flex items-center space-x-2 md:space-x-4">
          {showGptSearch && (
            <select
              className="p-1 md:p-2 bg-black bg-opacity-40 text-white rounded-md text-sm md:text-base border border-gray-500 border-opacity-50 hover:bg-opacity-60 transition-all"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-1 px-3 md:py-2 md:px-4 bg-purple-700 hover:bg-purple-600 text-white rounded-md text-sm md:text-base bg-opacity-80 hover:bg-opacity-100 transition-all"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <div className="flex items-center space-x-2">
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 border-opacity-30"
              alt="usericon"
              src={user?.photoURL}
            />
            <button 
              onClick={handleSignOut} 
              className="text-white text-sm md:text-base hover:underline bg-black bg-opacity-30 px-2 py-1 rounded hover:bg-opacity-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;