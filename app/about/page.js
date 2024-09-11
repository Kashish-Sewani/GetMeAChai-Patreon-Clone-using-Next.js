import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="max-w-4xl text-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">
          About Get Me a Chai
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          "Get Me a Chai" is a platform that helps creators, developers, and artists receive support for their hard work in the form of small donations. The idea is simple: if you appreciate someone's work, you can buy them a virtual chai (or coffee) as a token of your support!
        </p>
        
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">Why Support Creators?</h2>
        <p className="text-lg text-gray-300 mb-8">
          Creators put in endless hours of effort to produce valuable content, whether it's code, artwork, videos, or educational materials. A simple contribution can motivate them to keep doing what they love.
        </p>

        <h2 className="text-3xl font-semibold text-blue-300 mb-4">How It Works</h2>
        <p className="text-lg text-gray-300 mb-8">
          Supporting a creator is easy. All you need to do is click on their profile, choose the amount you'd like to donate, and complete the payment. It's quick, secure, and a great way to show appreciation.
        </p>

        <h2 className="text-3xl font-semibold text-blue-300 mb-4">Join Our Community</h2>
        <p className="text-lg text-gray-300">
          Whether you're a creator looking to receive support or someone who wants to give back, "Get Me a Chai" is the perfect place to be. Join us today and help fuel the passion of creators one chai at a time!
        </p>
      </div>
    </div>
  )
}

export default About

export const metadata = {
  title: "About - Get Me A Chai",
}