import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white  md:h-[44vh] gap-4 min-w-screen p-11 md:p-0">
        <div className="font-bold text-2xl md:text-5xl flex md:gap-2 justify-center items-center  p-6 w-full">
          Buy Me a Chai  <span className="md:ml-2 mb-4">
            <Image src="/tea.gif" alt="Tea" width={50} height={50} />
          </span>
        </div>
        <p className="text-center md:text-left text-xl mb-7">A crowdfunding platform for creators . Get funded by your fans and followers.Start now!</p>

        <div>
          <Link href="/login">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>

          <Link href="/about">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>

        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto py-10 px-10">
        <h2 className="text-3xl font-bold text-center mb-20">Your Fans can buy you a Chai</h2>
        <div className="flex gap-10 md:gap-5 justify-around">
          <div className="space-y-3 flex flex-col items-center justify-center">
            <Image className="item bg-slate-700 rounded-full p-1" src="/girl.png" alt="" width={100} height={100} />
            <p className="font-bold text-center">Fund Yourself</p>
            <p className="font-bold  text-center">Your Fans are Here to Help You Succeed</p>
          </div>
          <div className="space-y-3 flex flex-col items-center justify-center mt-11 md:mt-2">
            <Image className="item rounded-full p-1" src="/coin.gif" alt="" width={120} height={120} />
            <p className="font-bold text-center">Turn Ideas into Reality</p>
            <p className="font-bold  text-center">Your Fans are Here to Lift You Up</p>
          </div>
          <div className="space-y-3 flex flex-col justify-center items-center">
            <Image className="item rounded-full p-1" src="/invest.jpg" alt="" width={100} height={100} />
            <p className="font-bold text-center">Unlock Your Potential</p>
            <p className="font-bold  text-center">Your Community is Ready to Support Your Journey</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 mt-8">
      </div>
      
      <div className="text-white container mx-auto py-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-10">Learn more about us</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
        <iframe className="w-full h-full" src="https://www.youtube.com/embed/8zHWKaiLo8U?si=9KAtEiNeWQNt9-N1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}
