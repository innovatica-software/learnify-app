import React from "react";
import feOne from "../../assets/fea-1.png";
import feTwo from "../../assets/fea-2.png";
import feThree from "../../assets/fea-3.png";
import feFour from "../../assets/fea-4.png";
import gifOne from "../../assets/0d2e32177296223.64d3b53a74553.gif";
import gifTwo from "../../assets/ani-3.gif";
import gifThree from "../../assets/c95581177296223.64d3b71f9d857.gif";
import gifFour from "../../assets/ani-4.gif";
import videoImg from "../../assets/video.jpg";
import podcastImg from "../../assets/podcast.jpg";
import { theme } from "../../Theme/AppTheme";
const Achievements = () => {
  return (
    <div className=" pt-24 " style={{ backgroundColor: `${theme.countryColor}` }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-3/4 mx-auto">
        <div className="flex">
          <div>
            <img src={feOne} alt="" className="border rounded-full" />
          </div>
          <div>
            <p className="mt-6 ml-2  text-xs md:text-xl" >Online Tutoring</p>
          </div>
        </div>
        <div className="flex">
          <div>
            <img src={feTwo} alt="" className="border rounded-full" />
          </div>
          <div>
            <p className="mt-6 ml-2  text-xs md:text-xl">50+ Courses</p>
          </div>
        </div>

        <div className="flex">
          <div>
            <img src={feThree} alt="" className="border rounded-full" />
          </div>
          <div>
            <p className="mt-6 ml-2  text-xs md:text-xl">Lifetime Access</p>
          </div>
        </div>

        <div className="flex">
          <div>
            <img src={feFour} alt="" className="border rounded-full" />
          </div>
          <div>
            <p className="mt-6 ml-2  text-xs md:text-xl ">Activate Learning</p>
          </div>
        </div>
      </div>

      {/* find section */}
      <div>
        <div>
          <h2 className=" text-center text-xl md:text-4xl font-bold  mt-20" style={{ color: `${theme.textColor}` }}>
            Find Out Why You Should Learn With Learnify
          </h2>
        </div>
        <div className=" md:flex w-3/4 md:w-2/4 gap-8 mx-auto ">
          <div className="img-1">
            <img src={gifOne} alt="" className="h-96 w-[96]  mt-16  " />
          </div>
          <div className=" pt-28  text-left">
            <p className="  text-xl font-bold" style={{ color: `${theme.textColor}` }}>
              AN INTERACTIVE COMMUNITY
            </p>
            <p className="text-start mt-8">
              <b className="text-white ">Learn more together</b>
            </p>
            <p className="text-start text-white">
              Explore Beyond the Textbook: Refine Your Pronunciation,Embrace
              Cultural Insights,
              <br className=" text-white" /> and Connect with Learners
              Worldwide. Join Our Global Community and Share Local <br />{" "}
              Language Tips for an Enriching Journey.
            </p>
          </div>
        </div>

        <div>
          <div className="md:flex w-3/4 md:w-2/4 gap-8 mx-auto ">
            <div className=" pt-28 ">
              <p className=" text-xl font-bold" style={{ color: `${theme.textColor}` }}>
                VARITY OF LANGUAGES
              </p>
              <p className="text-start  mt-4">
                <b className="text-white ">Learn your way</b>
              </p>
              <p className="text-start text-white">
                You can choose from a wide range of languages to learn,
                including popular <br className="text-white " /> ones and those
                that might be rare or specific to certain regions.
              </p>
            </div>

            <div>
              <img src={gifTwo} alt="" className="h-96 w-[96] mx-auto" />
            </div>
          </div>
        </div>

        <div>
          <div className="md:flex w-3/4 md:w-2/4 gap-8 mx-auto ">
            <div>
              <img src={gifThree} alt="" className="h-96 w-[96]  mt-16" />
            </div>
            <div className=" pt-28  text-left ">
              <p className=" text-center  text-xl font-bold" style={{ color: `${theme.textColor}` }}>
                ACCESSIBLE RESOURCES
              </p>
              <p className="text-start  mt-4">
                <b className="text-white ">Learn with confidence</b>
              </p>
              <p className="text-start text-white">
                These platforms offer a wealth of resources including
                interactive lessons,
                <br className=" text-white" /> videos, quizzes, and more,
                ensuring a comprehensive learning experience.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="md:flex w-3/4 md:w-2/4 gap-8 mx-auto ">
            <div className="pt-28 ">
              <p className=" text-xl font-bold" style={{ color: `${theme.textColor}` }}>
                PRACTICE AND REPETITION
              </p>
              <p className="text-start mt-4">
                <b className="text-white ">Learn Wisely</b>
              </p>
              <p className="text-start text-white">
                These websites encourage consistent practice, which is essential
                for language <br className="text-white " />
                acquisition. Regular exercises and quizzes help reinforce what
                you've learned.
              </p>
            </div>

            <div>
              <img src={gifFour} alt="" className="h-96 w-[96] mt-4 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
      {/* videos section */}

      <div className="md:flex justify-between w-full md:w-3/4 lg:w-2/4 gap-4 mx-auto  mt-16">
        <div className="bg-teal-600 border-2 border-teal-400 box-border shadow-teal-300 ">
          <div>
            <div>
              <img src={videoImg} alt="" className="w-[517px] h-[250px]" />
            </div>
          </div>
          <div>
            <p className="text-2xl m-5 " style={{ color: `${theme.textColor}` }}>
              {" "}
              <b>Learnify Videos</b>
            </p>
            <p className="text-start p-text-2xl m-5 text-white">
              Discover the unique and fascinating elements that make languages
              truly intriguing and enchanting
            </p>
          </div>
          <button className="mb-9 mt-9 ml-4 border-2 border-white rounded-md pl-8 pr-8 pb-4  pt-4 hover:bg-white hover:text-teal-500" style={{ color: `${theme.textColor}` }}>
            <b>WATCH</b>
          </button>
        </div>

        <div className="bg-teal-600 border-2 border-teal-400 box-border ">
          <div>
            <div>
              <img src={podcastImg} alt="" className="w-[510px] h-[250px]" />
            </div>
          </div>
          <div>
            {" "}
            <p className="text-2xl m-5 " style={{ color: `${theme.textColor}` }}>
              {" "}
              <b >Learnify Magazine</b>{" "}
            </p>
            <p className="text-start p-text-2xl m-5 text-white">
              Tune in to Learnify experts sharing language secrets and providing
              a sneak peek into local cultures.
            </p>
          </div>
          <button className="mb-9 mt-9 ml-4 border-2 border-white rounded-md pl-8 pr-8 pb-4  pt-4 hover:bg-white hover:text-teal-500" style={{ color: `${theme.textColor}` }}>
            {" "}
            <b>LISTEN</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
