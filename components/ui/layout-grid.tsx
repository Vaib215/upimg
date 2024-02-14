"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Button } from "./button";
import { Download, Link } from "lucide-react";
import { DeleteImageBtn } from "../delete-image";
import axios from "axios";
import { toast } from "sonner";

type Card = {
  id: string;
  name: string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] | undefined }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 ">
      {cards?.map((card, i) => (
          <div key={i} className={cn(card.className, "")}>
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                card.className,
                "relative",
                selected?.id === card.id
                  ? "cursor-pointer lg:absolute inset-0 bg-foreground rounded-xl w-[80%] aspect-video m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                  : lastSelected?.id === card.id
                  ? "z-40 bg-white rounded-xl h-full w-full"
                  : "bg-white rounded-xl h-full w-full"
              )}
              layout
            >
              {selected?.id === card.id && <SelectedCard selected={selected} />}
              <BlurImage card={card} />
              {selected?.id === card.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: selected?.id === card.id ? 1 : 0,
                    y: selected?.id === card.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="absolute flex items-start justify-between -top-12 w-full h-full"
                >
                  <h1 className="text-xl text-white">{card.name.slice(0, 50)}</h1>
                  <section className="flex items-start gap-2">
                    <DeleteImageBtn id={card.id} setSelected={setSelected} />
                    <Button onClick={()=>{
                      navigator.clipboard.writeText(card.thumbnail);
                      toast.success("URL copied to clipboard");
                    }} variant={"outline"} size={"sm"}>
                      <Link size={16} className="mr-2" />
                      Copy URL
                    </Button>
                    <Button onClick={()=>{
                      axios.get(card.thumbnail, {
                        responseType: 'blob'
                      }).then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', card.name);
                        document.body.appendChild(link);
                        link.click();
                        toast.success("Image downloaded successfully");
                      })
                    }} variant={"default"} size={"sm"}>
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </section>
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
      <div
        onClick={(e) => setSelected(null)}
        className={cn(
          selected && "absolute inset-0 bg-background/20 backdrop-blur-sm z-40"
        )}
      />
    </div>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={card.thumbnail}
      height="500"
      width="500"
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover rounded-xl object-top absolute inset-0 h-full w-auto mx-auto transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full z-10"
      />
    </div>
  );
};
