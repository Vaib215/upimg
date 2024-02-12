"use client";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion } from "framer-motion";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, TrashIcon } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  if (isLoading) {
    return (
      <BackgroundGradientAnimation>
        <div className="absolute z-50 gap-4 inset-0 flex flex-col items-center justify-center text-white font-bold px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="drop-shadow-xl text-3xl text-center md:text-4xl lg:text-7xl"
          >
            upimg
          </motion.h1>
        </div>
      </BackgroundGradientAnimation>
    );
  }

  if (!user) {
    return (
      <main>
        <section className="relative h-screen overflow-hidden">
          <BackgroundGradientAnimation>
            <div className="absolute z-50 gap-4 inset-0 flex flex-col items-center justify-center text-white font-bold px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="drop-shadow-xl"
              >
                <Image
                  className="bg-black/10 backdrop-blur-lg rounded p-2 w-64 aspect-square"
                  src={Logo}
                  alt="upimg"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="drop-shadow-xl text-3xl text-center md:text-4xl lg:text-7xl"
              >
                upimg
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="drop-shadow-xl text-lg md:text-xl lg:text-2xl text-center"
              >
                Uploads made easy
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="drop-shadow-xl"
              >
                <Button
                  asChild
                  variant={"secondary"}
                  size={"lg"}
                  className="cursor-pointer backdrop-opacity-50 bg-black/50 text-lg"
                >
                  <Link href={"/api/auth/login"}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </BackgroundGradientAnimation>
        </section>
        <section className="relative h-screen grid lg:grid-cols-2">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Upload Image
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Drag and drop your image or click to browse
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={Logo}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs flex items-center font-normal dark:text-white"
                >
                  <TrashIcon className="w-3 h-3 mr-1 mb-1" />
                  Discard
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Upload
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="flex max-w-3xl flex-col justify-center items-start  p-4"
          >
            <h1 className="text-3xl font-bold text-neutral-600 dark:text-white">
              We make it easy to upload your images
            </h1>
            <p className="text-neutral-500 dark:text-neutral-300 mt-2">
              Uploading images has never been easier. But not with upimg.
            </p>
            <ul>
              <li className="flex items-center mt-4">
                <ArrowRight className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-300" />
                <p className="text-neutral-500 dark:text-neutral-300">
                  Drag and drop your image or click to browse
                </p>
              </li>
              <li className="flex items-center mt-4">
                <ArrowRight className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-300" />
                <p className="text-neutral-500 dark:text-neutral-300">
                  Upload your image and get a link to share
                </p>
              </li>
              <li className="flex items-center mt-4">
                <ArrowRight className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-300" />
                <p className="text-neutral-500 dark:text-neutral-300">
                  Share your link with anyone
                </p>
              </li>
            </ul>
          </motion.div>
        </section>
        <footer className="flex flex-row justify-between items-center px-4">
          <div className="flex justify-center items-center h-20 bg-black text-white">
            <p className="text-sm">
              &copy; 2024 upimg. All rights reserved. Made with ❤️ by Vaib215
            </p>
          </div>
          <Link className="hover:underline" href={"/"}>
            <Github className="inline w-6 h-6" />
            {" / "} upimg
          </Link>
        </footer>
      </main>
    );
  }

  if(error) {
    return (
      <div>
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }
  
  return <></>
}
