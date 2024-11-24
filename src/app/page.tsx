'use client'

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Facebook, Instagram, Twitter, Heart } from "lucide-react"
import icons8 from "../../public/download.jpg"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-400">
                  Fund the Next Big Idea
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Join our community of innovators and backers. Bring creative projects to life.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">Start a Project</Button>
                <Button onClick={() => {router.push("/d/donate")}} variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-900">
                  Explore Projects
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-400">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <Image
                      src={icons8}
                      alt="Project thumbnail"
                      className="w-full h-48 object-cover rounded-t-lg"
                      width={400}
                      height={200}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-blue-400">Innovative Project {i}</CardTitle>
                    <CardDescription className="text-gray-400">A groundbreaking idea that needs your support.</CardDescription>
                    <div className="mt-4 bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                      <span>$45,000 raised</span>
                      <span>45% funded</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-900">
                      Learn More
                    </Button>
                    <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                      <Heart className="h-4 w-4" /> Back This Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-400">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Start Your Project", description: "Share your creative idea with the world." },
                { title: "Get Funded", description: "Receive support from backers who believe in your vision." },
                { title: "Make It Happen", description: "Bring your project to life and reward your backers." },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-400">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join our community and start bringing your ideas to life today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-gray-800 text-white border-gray-700" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-blue-400" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2024 Crowdfund. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-blue-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-blue-400" href="#">
            Privacy
          </Link>
        </nav>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="#" className="text-gray-400 hover:text-blue-400">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-blue-400">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-blue-400">
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}